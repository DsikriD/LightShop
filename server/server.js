require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const xssClean = require('xss-clean');
const cors = require('cors');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

const port = process.env.PORT;
const SECRET_KEY = process.env.JWT_SECRET;

app.use(xssClean());
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

const csrfProtection = csurf({ cookie: true });

// Проверка авторизации по JWT в httpOnly cookie
function requireAuth(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

// Проверка роли ADMIN
function requireAdmin(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    const role = String(decoded.role || '').toUpperCase();
    if (role !== 'ADMIN') {
      return res.status(403).json({ message: 'Forbidden: admin only' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

/** Авторизация */
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.users.findUnique({ where: { username } });

    if (!user || password !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Преобразуем BigInt в строку перед передачей в JWT и добавляем роль
    const token = jwt.sign(
      { username: user.username, id: user.id.toString(), role: user.role },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000,
    });

    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.post('/api/protected', csrfProtection, (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ message: 'Protected data received', user: decoded });
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout successful' });
});

/** Публичный GET для товаров (для обычных пользователей) */
app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.products.findMany();

    // Преобразуем все id из BigInt в String
    const formattedProducts = products.map(product => ({
      ...product,
      id: product.id.toString(),
    }));

    res.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

/** Админские CRUD для товаров - доступны только ADMIN */
app.get('/api/admin/products', requireAdmin, async (req, res) => {
  try {
    const products = await prisma.products.findMany();
    const formattedProducts = products.map(product => ({
      ...product,
      id: product.id.toString(),
    }));
    res.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching products (admin):', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

app.post('/api/admin/products', requireAdmin, async (req, res) => {
  try {
    const {
      name,
      description,
      manufacturer,
      type,
      power,
      illuminated_area,
      quantity,
      collection,
      height,
      diameter,
      style,
      material,
      image,
    } = req.body;

    const product = await prisma.products.create({
      data: {
        name,
        description,
        manufacturer,
        type,
        power,
        illuminated_area,
        quantity,
        collection,
        height,
        diameter,
        style,
        material,
        image,
      },
    });

    const formattedProduct = {
      ...product,
      id: product.id.toString(),
    };

    res.status(201).json(formattedProduct);
  } catch (error) {
    console.error("Ошибка при добавлении продукта:", error);
    res.status(500).json({ message: "Ошибка при добавлении продукта" });
  }
});

app.put('/api/admin/products/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.products.update({
      where: { id: BigInt(id) },
      data: req.body,
    });

    const formattedProduct = {
      ...product,
      id: product.id.toString(),
    };

    res.json(formattedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
});

app.delete('/api/admin/products/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.products.delete({
      where: { id: BigInt(id) },
    });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
});

app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ message: 'Invalid CSRF token' });
  }
  next(err);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

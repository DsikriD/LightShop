import { motion, useScroll, useTransform, useInView, Variants } from "framer-motion"
import React, { useRef, useState } from "react"
import styles from "./CatalogPage.module.scss"

interface Product {
  id: string
  name: string
  image: string
  category: string
  price: number
  originalPrice?: number
  inStock: boolean
  description: string
}

export const CatalogPage = () => {
  const { scrollY } = useScroll()
  const headerRef = useRef(null)
  const productsRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })
  const productsInView = useInView(productsRef, { once: true })

  const headerY = useTransform(scrollY, [0, 300], [0, -50])

  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("name")

  const categories = ["All", "Chandeliers", "Pendant Lights", "Wall Sconces", "Table Lamps", "Floor Lamps"]

  const products: Product[] = [
    {
      id: "1",
      name: "Crystal Elegance Chandelier",
      image: "/placeholder.svg?height=400&width=400&text=Crystal+Chandelier",
      category: "Chandeliers",
      price: 2499,
      originalPrice: 2999,
      inStock: true,
      description: "Luxurious crystal chandelier with LED technology",
    },
    {
      id: "2",
      name: "Modern Minimalist Pendant",
      image: "/placeholder.svg?height=400&width=400&text=Modern+Pendant",
      category: "Pendant Lights",
      price: 399,
      inStock: true,
      description: "Clean lines meet contemporary design",
    },
    {
      id: "3",
      name: "Brass Wall Sconce",
      image: "/placeholder.svg?height=400&width=400&text=Brass+Sconce",
      category: "Wall Sconces",
      price: 299,
      inStock: false,
      description: "Handcrafted brass with warm ambient lighting",
    },
    {
      id: "4",
      name: "Designer Table Lamp",
      image: "/placeholder.svg?height=400&width=400&text=Table+Lamp",
      category: "Table Lamps",
      price: 599,
      originalPrice: 699,
      inStock: true,
      description: "Award-winning design for modern spaces",
    },
    {
      id: "5",
      name: "Sculptural Floor Lamp",
      image: "/placeholder.svg?height=400&width=400&text=Floor+Lamp",
      category: "Floor Lamps",
      price: 899,
      inStock: true,
      description: "Artistic form meets functional lighting",
    },
    {
      id: "6",
      name: "Industrial Pendant Light",
      image: "/placeholder.svg?height=400&width=400&text=Industrial+Light",
      category: "Pendant Lights",
      price: 449,
      inStock: true,
      description: "Raw materials with refined aesthetics",
    },
  ]

  const filteredProducts = products.filter(
    (product) => selectedCategory === "All" || product.category === selectedCategory,
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name":
      default:
        return a.name.localeCompare(b.name)
    }
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  }

  return (
    <div className={styles.catalogPage}>
      {/* Header Section */}
      <motion.section
        ref={headerRef}
        className={styles.heroSection}
        style={{ y: headerY, paddingTop: 'var(--navbar-height, 80px)', marginTop: 'var(--navbar-height, 80px)' }}
      >
        <div className={styles.heroContainer}>
          <motion.div
            className={styles.heroContent}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.h1
              className={styles.heroTitle}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              Современное освещение
              <br className={styles.heroBreak} /> для вашего дома
              <br className={styles.heroBreak} /> и бизнеса
            </motion.h1>
            <motion.p className={styles.heroDescription} variants={itemVariants}>
              Стильные и энергоэффективные светильники подчеркивают уникальность вашего пространства и создают идеальную атмосферу
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Filters */}
      <motion.section
        className={styles.filters}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className={styles.container}>
          <div className={styles.filterBar}>
            <div className={styles.categories}>
              {categories.map((category) => (
                <motion.button
                  key={category}
                  className={`${styles.categoryBtn} ${selectedCategory === category ? styles.active : ""}`}
                  onClick={() => setSelectedCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
            <select className={styles.sortSelect} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </motion.section>

      {/* Products Grid */}
      <motion.section
        ref={productsRef}
        className={styles.products}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={styles.container}>
          <motion.div
            className={styles.grid}
            variants={containerVariants}
            initial="hidden"
            animate={productsInView ? "visible" : "hidden"}
          >
            {sortedProducts.map((product) => (
              <motion.div
                key={product.id}
                className={styles.productCard}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={styles.imageContainer}>
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className={styles.productImage}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  {!product.inStock && <div className={styles.outOfStock}>Out of Stock</div>}
                  {product.originalPrice && <div className={styles.saleTag}>Sale</div>}
                </div>

                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productDesc}>{product.description}</p>

                  <div className={styles.priceContainer}>
                    <span className={styles.price}>${product.price}</span>
                    {product.originalPrice && <span className={styles.originalPrice}>${product.originalPrice}</span>}
                  </div>

                  <motion.button
                    className={`${styles.addToCart} ${!product.inStock ? styles.disabled : ""}`}
                    disabled={!product.inStock}
                    whileHover={product.inStock ? { scale: 1.05 } : {}}
                    whileTap={product.inStock ? { scale: 0.95 } : {}}
                  >
                    {product.inStock ? "Add to Cart" : "Notify When Available"}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

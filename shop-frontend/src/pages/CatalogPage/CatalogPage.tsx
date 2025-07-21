import { motion, useScroll, useTransform, useInView, Variants } from "framer-motion"
import React, { useRef, useState } from "react"
import styles from "./CatalogPage.module.scss"
import { Product } from "../ProductPage/models/typeProducts";

export const CatalogPage = () => {
  const { scrollY } = useScroll()
  const headerRef = useRef(null)
  const filtersRef = useRef(null)
  const productsRef = useRef(null)

  const headerInView = useInView(headerRef, { once: true })
  const filtersInView = useInView(filtersRef, { once: true })
  const productsInView = useInView(productsRef, { once: true })

  // Parallax effects
  const headerY = useTransform(scrollY, [0, 300], [0, -50])
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -200])

  const [selectedCategory, setSelectedCategory] = useState("Все")
  const [sortBy, setSortBy] = useState("name")

  const categories = [
    "Все",
    "Премиум",
    "Люстры",
    "Светильники",
    "Бра",
    "Встраиваемые",
    "Настольные",
    "Подвесные",
    "Споты",
    "Торшеры",
    "Трековые",
    "Уличные",
  ]

  const products: Product[] = [
    {
      id: "1",
      name: "Люстра Crystal Elite",
      image: "/placeholder.svg?height=300&width=300&text=Люстра+Crystal+Elite",
      category: "Люстры",
      quantity: 5,
      description: "Роскошная хрустальная люстра с LED подсветкой",
    },
    {
      id: "2",
      name: "Светильник Modern Loft",
      image: "/placeholder.svg?height=300&width=300&text=Светильник+Modern+Loft",
      category: "Светильники",
      quantity: 10,
      description: "Стильный светильник в стиле лофт",
    },
    {
      id: "3",
      name: "Бра Classic Gold",
      image: "/placeholder.svg?height=300&width=300&text=Бра+Classic+Gold",
      category: "Бра",
      quantity: 0,
      description: "Элегантное настенное бра в золотом цвете",
    },
    {
      id: "4",
      name: "Торшер Minimalist",
      image: "/placeholder.svg?height=300&width=300&text=Торшер+Minimalist",
      category: "Торшеры",
      quantity: 3,
      description: "Минималистичный торшер для современного интерьера",
    },
    {
      id: "5",
      name: "Спот Track Pro",
      image: "/placeholder.svg?height=300&width=300&text=Спот+Track+Pro",
      category: "Споты",
      quantity: 7,
      description: "Профессиональный трековый спот",
    },
    {
      id: "6",
      name: "Настольная лампа Designer",
      image: "/placeholder.svg?height=300&width=300&text=Настольная+лампа+Designer",
      category: "Настольные",
      quantity: 2,
      description: "Дизайнерская настольная лампа",
    },
    {
      id: "7",
      name: "Подвесной светильник Industrial",
      image: "/placeholder.svg?height=300&width=300&text=Подвесной+Industrial",
      category: "Подвесные",
      quantity: 8,
      description: "Подвесной светильник в индустриальном стиле",
    },
    {
      id: "8",
      name: "Встраиваемый светильник LED",
      image: "/placeholder.svg?height=300&width=300&text=Встраиваемый+LED",
      category: "Встраиваемые",
      quantity: 0,
      description: "Энергоэффективный встраиваемый светильник",
    },
  ]

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "Все" || product.category === selectedCategory
    return categoryMatch
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "name":
      default:
        return a.name.localeCompare(b.name)
    }
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  const cardVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <div className={styles.catalogPage}>
      {/* Animated Background Elements */}
      <motion.div className={styles.backgroundElements} style={{ y: backgroundY }}>
        <div className={styles.particle1}></div>
        <div className={styles.particle2}></div>
        <div className={styles.particle3}></div>
        <div className={styles.particle4}></div>
      </motion.div>

      {/* Header Section */}
      <motion.section ref={headerRef} className={styles.headerSection} style={{ y: headerY }}>
        <div className={styles.headerParticles}>
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className={styles.headerParticle}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
                y: Math.random() * 400,
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        <div className={styles.container}>
          <motion.div
            className={styles.headerContent}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.h1 className={styles.pageTitle} variants={itemVariants}>
              Каталог освещения
            </motion.h1>
            <motion.p className={styles.pageDescription} variants={itemVariants}>
              Широкий выбор качественных светильников для любого интерьера
            </motion.p>
            <motion.div className={styles.breadcrumbs} variants={itemVariants}>
              <span>Главная</span>
              <span className={styles.breadcrumbSeparator}>→</span>
              <span className={styles.breadcrumbActive}>Каталог</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Filters Section */}
      <motion.section
        ref={filtersRef}
        className={styles.filtersSection}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={styles.container}>
          <motion.div
            className={styles.filtersContainer}
            variants={containerVariants}
            initial="hidden"
            animate={filtersInView ? "visible" : "hidden"}
          >
            <motion.div className={styles.filterGroup} variants={itemVariants}>
              <h3>Категории</h3>
              <div className={styles.categoryButtons}>
                {categories.map((category, index) => (
                  <motion.button
                    key={category}
                    className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ""}`}
                    onClick={() => setSelectedCategory(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div className={styles.filterGroup} variants={itemVariants}>
              <h3>Сортировка</h3>
              <select className={styles.sortSelect} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name">По названию</option>
              </select>
            </motion.div>

            <motion.div className={styles.filterGroup} variants={itemVariants}>
              <h3>Результаты</h3>
              <p className={styles.resultsCount}>
                Найдено товаров: <span>{sortedProducts.length}</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Products Section */}
      <motion.section
        ref={productsRef}
        className={styles.productsSection}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className={styles.container}>
          <motion.div
            className={styles.productsGrid}
            variants={containerVariants}
            initial="hidden"
            animate={productsInView ? "visible" : "hidden"}
          >
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className={styles.productCard}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
                custom={index}
              >
                <div className={styles.productImageContainer}>
                  <motion.div
                    className={styles.productImage}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className={styles.productImg}
                    />
                  </motion.div>
                  {/* Badges удалены */}
                  {/* Quick Actions */}
                  <motion.div
                    className={styles.quickActions}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.button className={styles.quickAction} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      👁️
                    </motion.button>
                    <motion.button className={styles.quickAction} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      ❤️
                    </motion.button>
                  </motion.div>
                </div>
                <div className={styles.productInfo}>
                  <motion.h3 className={styles.productName} whileHover={{ color: "#f59e0b" }}>
                    {product.name}
                  </motion.h3>
                  <p className={styles.productDescription}>{product.description}</p>
                  <div className={styles.productPrice}>
                    <span className={styles.currentPrice}>В наличии: {product.quantity} шт.</span>
                  </div>
                  <div className={styles.productActions}>
                    <motion.button
                      className={`${styles.addToCartButton} ${product.quantity === 0 ? styles.disabled : ""}`}
                      disabled={product.quantity === 0}
                      whileHover={product.quantity > 0 ? { scale: 1.05 } : {}}
                      whileTap={product.quantity > 0 ? { scale: 0.95 } : {}}
                    >
                      {product.quantity > 0 ? "В корзину" : "Нет в наличии"}
                    </motion.button>
                    <motion.button
                      className={styles.buyNowButton}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Купить сейчас
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Load More Button */}
          <motion.div
            className={styles.loadMoreContainer}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.button className={styles.loadMoreButton} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Показать еще товары
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className={styles.statsSection}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={styles.container}>
          <motion.div
            className={styles.statsGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { number: "1000+", label: "Товаров в каталоге", icon: "💡" },
              { number: "50+", label: "Брендов", icon: "⭐" },
              { number: "24/7", label: "Поддержка", icon: "🛠️" },
              { number: "99%", label: "Довольных клиентов", icon: "😊" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className={styles.statCard}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <motion.div
                  className={styles.statIcon}
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.5,
                  }}
                >
                  {stat.icon}
                </motion.div>
                <h3 className={styles.statNumber}>{stat.number}</h3>
                <p className={styles.statLabel}>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

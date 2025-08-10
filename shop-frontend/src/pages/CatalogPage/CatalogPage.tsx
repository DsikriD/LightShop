import { motion, useScroll, useTransform, useInView, Variants } from "framer-motion"
import React, { useEffect, useRef, useState } from "react"
import styles from "./CatalogPage.module.scss"
import { useAppDispatch, useAppSelector } from "../../store"
import { fetchPublicProducts } from "./services/fetchPublicProducts"
import { CatalogItem } from "./models/typeCatalog"

interface Product extends CatalogItem {}

export const CatalogPage = () => {
  const { scrollY } = useScroll()
  const headerRef = useRef(null)
  const productsRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })
  const productsInView = useInView(productsRef, { once: true })

  const headerY = useTransform(scrollY, [0, 300], [0, -50])

  const dispatch = useAppDispatch()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("name")
  const [error, setError] = useState<string | null>(null)

  const products = useAppSelector((s) => (s as any).catalog?.items as CatalogItem[] | undefined) || []
  const loading = useAppSelector((s) => (s as any).catalog?.loading as boolean | undefined) || false

  const categories = ["All", "Chandeliers", "Pendant Lights", "Wall Sconces", "Table Lamps", "Floor Lamps"]

  useEffect(() => {
    dispatch(fetchPublicProducts()).unwrap().catch((e: any) => setError(String(e)))
  }, [dispatch])

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
          {loading && <div>Loading...</div>}
          {error && <div className={styles.error}>{error}</div>}
          {!loading && !error && (
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
          )}
        </div>
      </motion.section>
    </div>
  )
}

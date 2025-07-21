import { motion, useScroll, useTransform, useInView, Variants } from "framer-motion"
import React, { useRef } from "react"
import styles from "./HomePage.module.scss"

export const HomePage = () => {
  const { scrollY } = useScroll()
  const heroRef = useRef(null)
  const infoRef = useRef(null)
  const catalogRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const infoInView = useInView(infoRef, { once: true })
  const catalogInView = useInView(catalogRef, { once: true })

  // Parallax effects
  const heroY = useTransform(scrollY, [0, 500], [0, -150])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -200])

  const categories = [
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
    "Аксессуары",
  ]

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

  return (
    <div className={styles.homePage}>
      {/* Animated Background Elements */}
      <motion.div className={styles.backgroundElements} style={{ y: backgroundY }}>
        <div className={styles.particle1}></div>
        <div className={styles.particle2}></div>
        <div className={styles.particle3}></div>
        <div className={styles.particle4}></div>
      </motion.div>

      {/* Hero Section */}
      <motion.section ref={heroRef} className={styles.heroSection} style={{ y: heroY, opacity: heroOpacity }}>
        {/* Animated background particles */}
        <div className={styles.particleContainer}>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={styles.animatedParticle}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
                y: Math.random() * 700,
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className={styles.heroContainer}>
          <motion.div
            className={styles.heroContent}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.h1 className={styles.heroTitle} variants={itemVariants} whileHover={{ scale: 1.05 }}>
              Современное освещение
              <br className={styles.heroBreak} /> для вашего дома
              <br className={styles.heroBreak} /> и бизнеса
            </motion.h1>
            <motion.p className={styles.heroDescription} variants={itemVariants}>
              Стильные и энергоэффективные светильники подчеркивают уникальность вашего пространства и создают идеальную
              атмосферу
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Company Info Section */}
      <motion.section
        className={styles.infoSection}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={styles.container}>
          <motion.div
            className={styles.infoGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className={styles.infoTitle} variants={itemVariants} whileHover={{ scale: 1.02 }}>
              <h2>
                Тристар Люкс —<br className={styles.titleBreak} /> ваш надежный партнер
                <br className={styles.titleBreak} /> в мире светотехники
              </h2>
            </motion.div>
            <motion.div className={styles.infoText} variants={itemVariants} whileHover={{ x: 10 }}>
              <p>
                Мы предлагаем широкий ассортимент продукции для создания уюта и уникальной атмосферы в вашем интерьере
              </p>
            </motion.div>
            <motion.div className={styles.infoText} variants={itemVariants} whileHover={{ x: 10 }}>
              <p>
                В нашем каталоге только стильные, качественные светильники и аксессуары для их установки и обслуживания
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Consultation Section with Image */}
      <motion.section
        ref={infoRef}
        className={styles.consultationSection}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={styles.container}>
          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
            <div className={styles.consultationCard}>
              <div className={styles.consultationGrid}>
                {/* Image Section */}
                <motion.div className={styles.imageSection} whileHover={{ scale: 1.1 }} transition={{ duration: 0.6 }}>
                  <img
                    src="/placeholder.svg?height=400&width=600&text=Современный+салон+освещения"
                    alt="Современный салон освещения"
                    className={styles.consultationImage}
                  />
                  <motion.div
                    className={styles.imageOverlay}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className={styles.overlayContent}
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className={styles.overlayIcon}>✨</div>
                      <p>Наш шоурум</p>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Content Section */}
                <motion.div
                  className={styles.consultationContent}
                  initial="hidden"
                  animate={infoInView ? "visible" : "hidden"}
                  variants={containerVariants}
                >
                  <motion.p className={styles.consultationText} variants={itemVariants}>
                    Мы специализируемся на продаже различных видов освещения: от изысканных светильников и люстр до
                    элегантных торшеров и настольных ламп, которые могут стать как основным акцентом, так и
                    дополнительным источником света
                  </motion.p>
                  <motion.div variants={itemVariants}>
                    <button className={styles.consultationButton}>
                      <span>
                        Получить консультацию
                        <br className={styles.buttonBreak} /> менеджера
                      </span>
                    </button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Catalog Section */}
      <motion.section
        ref={catalogRef}
        className={styles.catalogSection}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className={styles.container}>
          <div className={styles.catalogGrid}>
            {/* Categories Sidebar */}
            <motion.div
              className={styles.categoriesSection}
              variants={containerVariants}
              initial="hidden"
              animate={catalogInView ? "visible" : "hidden"}
            >
              <div className={styles.categoriesGrid}>
                {categories.map((category, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button className={styles.categoryButton}>{category}</button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              className={styles.catalogContent}
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                className={styles.catalogImageContainer}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src="/placeholder.svg?height=500&width=800&text=Каталог+освещения"
                  alt="Каталог освещения"
                  className={styles.catalogImage}
                />
                <motion.div className={styles.catalogOverlay} initial={{ opacity: 0.8 }} whileHover={{ opacity: 0.9 }}>
                  <motion.div
                    className={styles.catalogOverlayContent}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div
                      className={styles.catalogIcon}
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      💡
                    </motion.div>
                    <p className={styles.catalogTitle}>Каталог товаров</p>
                    <motion.p className={styles.catalogSubtitle} initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}>
                      Откройте мир современного освещения
                    </motion.p>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <button className={styles.catalogButton}>
                  <span>
                    Открыть полный каталог
                    <br className={styles.buttonBreak} /> товаров
                  </span>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Delivery Section */}
      <motion.section
        className={styles.deliverySection}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={styles.container}>
          <motion.h2
            className={styles.deliveryTitle}
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Доставка и оплата
          </motion.h2>
          <motion.div
            className={styles.deliveryGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: "🚚", title: "Быстрая доставка", desc: "Доставляем по всей России в кратчайшие сроки" },
              { icon: "💳", title: "Удобная оплата", desc: "Принимаем все виды платежей" },
              { icon: "🛡️", title: "Гарантия качества", desc: "Официальная гарантия на всю продукцию" },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={styles.deliveryCard}>
                  <div className={styles.deliveryCardContent}>
                    <motion.div
                      className={styles.deliveryIcon}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className={styles.deliveryCardTitle}>{item.title}</h3>
                    <p className={styles.deliveryCardDesc}>{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Additional Content Section */}
      <motion.section
        className={styles.additionalSection}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className={styles.container}>
          <div className={styles.additionalGrid}>
            <motion.div
              className={styles.whyUsSection}
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className={styles.whyUsTitle}>Почему выбирают нас?</h2>
              <motion.div
                className={styles.whyUsList}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { icon: "✨", title: "Премиум качество", desc: "Работаем только с проверенными производителями" },
                  {
                    icon: "🎯",
                    title: "Индивидуальный подход",
                    desc: "Поможем подобрать освещение под ваши потребности",
                  },
                  { icon: "⚡", title: "Энергоэффективность", desc: "Современные LED-технологии для экономии" },
                ].map((item, index) => (
                  <motion.div key={index} className={styles.whyUsItem} variants={itemVariants} whileHover={{ x: 10 }}>
                    <motion.div
                      className={styles.whyUsIcon}
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div className={styles.whyUsContent}>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className={styles.futureSection}
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src="/placeholder.svg?height=320&width=400&text=Освещение+будущего"
                alt="Освещение будущего"
                className={styles.futureImage}
              />
              <motion.div
                className={styles.futureOverlay}
                whileHover={{
                  background: "linear-gradient(135deg, rgba(251, 191, 36, 0.9), rgba(249, 115, 22, 0.9))",
                }}
              >
                <div className={styles.futureContent}>
                  <motion.div
                    className={styles.futureIcon}
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    💡
                  </motion.div>
                  <p>Освещение будущего</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className={styles.footer}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={styles.container}>
          <motion.div
            className={styles.footerGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className={styles.footerSection} variants={itemVariants}>
              <h3>Тристар Люкс</h3>
              <p>Ваш надежный партнер в мире светотехники</p>
            </motion.div>
            <motion.div className={styles.footerSection} variants={itemVariants}>
              <h4>Каталог</h4>
              <ul>
                {["Люстры", "Светильники", "Торшеры", "Настольные лампы"].map((item, index) => (
                  <motion.li key={index} whileHover={{ x: 5, color: "#FDE047" }}>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div className={styles.footerSection} variants={itemVariants}>
              <h4>Услуги</h4>
              <ul>
                {["Консультация", "Доставка", "Установка", "Гарантийное обслуживание"].map((item, index) => (
                  <motion.li key={index} whileHover={{ x: 5, color: "#FDE047" }}>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div className={styles.footerSection} variants={itemVariants}>
              <h4>Контакты</h4>
              <div className={styles.footerContacts}>
                <motion.p whileHover={{ color: "#FDE047" }}>📞 +7 (xxx) xxx-xx-xx</motion.p>
                <motion.p whileHover={{ color: "#FDE047" }}>📧 info@tristar-lux.ru</motion.p>
                <motion.p whileHover={{ color: "#FDE047" }}>📍 Москва, ул. Примерная, 123</motion.p>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            className={styles.footerBottom}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p>&copy; 2024 Тристар Люкс. Все права защищены.</p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}

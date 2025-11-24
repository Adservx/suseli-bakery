import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
    pageVariants,
    staggerContainerVariants,
    itemVariants,
    floatAnimation
} from '../utils/animations.jsx';

function HomePage() {
    const heroRef = useRef(null);
    const featuresRef = useRef(null);
    const specialsRef = useRef(null);
    const testimonialsRef = useRef(null);

    // Hero 3D scroll
    const { scrollYProgress: heroProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const heroY = useTransform(heroProgress, [0, 1], ['0%', '50%']);
    const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);
    const heroScale = useTransform(heroProgress, [0, 1], [1, 1.3]);
    const heroRotateX = useTransform(heroProgress, [0, 1], [0, 25]);

    // Features 3D
    const { scrollYProgress: featuresProgress } = useScroll({
        target: featuresRef,
        offset: ["start end", "center center", "end start"]
    });

    const featuresRotateY = useTransform(featuresProgress, [0, 0.5, 1], [-25, 0, 25]);
    const featuresZ = useTransform(featuresProgress, [0, 0.5, 1], [-200, 0, -200]);

    // Specials 3D
    const { scrollYProgress: specialsProgress } = useScroll({
        target: specialsRef,
        offset: ["start end", "center center", "end start"]
    });

    const specialsRotateX = useTransform(specialsProgress, [0, 0.5, 1], [20, 0, -20]);
    const specialsScale = useTransform(specialsProgress, [0, 0.5, 1], [0.85, 1, 0.85]);

    // Testimonials 3D
    const { scrollYProgress: testimonialsProgress } = useScroll({
        target: testimonialsRef,
        offset: ["start end", "center center", "end start"]
    });

    const testimonialsRotateY = useTransform(testimonialsProgress, [0, 0.5, 1], [30, 0, -30]);

    const springConfig = { stiffness: 100, damping: 30 };
    const heroYSpring = useSpring(heroY, springConfig);

    const dailySpecials = [
        { id: 1, name: 'Artisan Croissant', desc: 'Buttery, flaky perfection', price: '$4.50', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop' },
        { id: 2, name: 'Sourdough Loaf', desc: 'Traditional slow-fermented bread', price: '$8.00', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop' },
        { id: 3, name: 'Fruit Tart', desc: 'Seasonal fresh fruits on custard', price: '$6.00', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop' },
        { id: 4, name: 'Chocolate Éclair', desc: 'Rich chocolate pastry cream', price: '$5.50', image: 'https://images.unsplash.com/photo-1612203985729-70726954388c?w=800&auto=format&fit=crop' }
    ];

    const features = [
        { icon: 'eco', title: 'Organic Ingredients', desc: 'Locally grown, organic ingredients for authentic taste' },
        { icon: 'schedule', title: 'Baked Fresh Daily', desc: 'Made from scratch every morning before we open' },
        { icon: 'verified', title: 'Master Bakers', desc: 'Over 50 years of combined baking expertise' },
        { icon: 'favorite', title: 'Made with Love', desc: 'Crafted with passion and attention to detail' }
    ];

    const testimonials = [
        { name: 'Sarah Mitchell', role: 'Regular Customer', text: 'The croissants here are absolute perfection! Flaky, buttery, and just like the ones I had in Paris.', rating: 5 },
        { name: 'James Chen', role: 'Food Blogger', text: 'Suseli Bakery has the best sourdough in town. The crust is crispy, the inside is soft and airy - perfection!', rating: 5 },
        { name: 'Emma Rodriguez', role: 'Coffee Enthusiast', text: 'My morning is not complete without their almond croissant and cappuccino. Worth every penny!', rating: 5 }
    ];

    return (
        <motion.main
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex-grow overflow-hidden bg-gradient-to-b from-cream-50 to-background-light"
            style={{ perspective: '2000px' }}
        >
            {/* Hero */}
            <section ref={heroRef} className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ y: heroYSpring, scale: heroScale, rotateX: heroRotateX, transformStyle: 'preserve-3d' }}
                    className="absolute inset-0"
                >
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/hero-background.png")' }}>
                        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/70 via-charcoal-900/60 to-charcoal-900/80"></div>
                    </div>
                </motion.div>

                <motion.div animate={{ y: [-20, 20], rotateZ: [0, 360] }} transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl backdrop-blur-3xl" style={{ transformStyle: 'preserve-3d' }} />

                <motion.div style={{ opacity: heroOpacity }} className="relative z-10 container mx-auto px-6 md:px-12 py-20 text-center">
                    <motion.div initial={{ opacity: 0, y: 60, rotateX: -30, scale: 0.9 }} animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                        transition={{ duration: 1, type: "spring", stiffness: 80 }}
                        className="max-w-5xl mx-auto bg-white/10 backdrop-blur-2xl rounded-3xl p-12 border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
                        style={{ transformStyle: 'preserve-3d' }}>
                        <span className="inline-block mb-6 text-primary-200 font-accent text-xl md:text-2xl" style={{ transform: 'translateZ(40px)' }}>
                            Artisan Bakery Since 2010
                        </span>
                        <h1 className="text-display lg:text-display-lg font-display text-white mb-6 drop-shadow-2xl" style={{ transform: 'translateZ(60px)' }}>
                            Freshly Baked <span className="text-gradient">Goodness</span>, Daily
                        </h1>
                        <p className="text-lg md:text-xl text-cream-100 mb-10 max-w-2xl mx-auto drop-shadow-lg" style={{ transform: 'translateZ(40px)' }}>
                            Experience the art of traditional baking with our handcrafted breads, pastries, and desserts.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center" style={{ transform: 'translateZ(50px)' }}>
                            <Link to="/menu">
                                <motion.button whileHover={{ scale: 1.08, rotateY: 8, boxShadow: "0 25px 50px rgba(201, 165, 90, 0.5)" }} whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 text-lg font-semibold bg-primary/90 backdrop-blur-xl text-white rounded-2xl border border-white/30 shadow-[0_8px_32px_0_rgba(201,165,90,0.4)]"
                                    style={{ transformStyle: 'preserve-3d' }}>Explore Menu</motion.button>
                            </Link>
                            <Link to="/about">
                                <motion.button whileHover={{ scale: 1.08, rotateY: -8 }} whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 text-lg font-semibold bg-white/10 backdrop-blur-xl border-2 border-white/40 text-white rounded-2xl shadow-[0_8px_32px_0_rgba(255,255,255,0.2)]"
                                    style={{ transformStyle: 'preserve-3d' }}>Our Story</motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Features */}
            <motion.section ref={featuresRef} style={{ rotateY: featuresRotateY, z: featuresZ, transformStyle: 'preserve-3d' }} className="py-24 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cream-100/50 to-primary-50/50 backdrop-blur-sm"></div>
                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <motion.div variants={staggerContainerVariants(0.15)} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, idx) => (
                            <motion.div key={idx} variants={itemVariants} whileHover={{ y: -20, rotateY: 15, rotateX: -10, scale: 1.08 }}
                                className="text-center bg-white/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/60 shadow-[0_8px_32px_0_rgba(255,255,255,0.5)]"
                                style={{ transformStyle: 'preserve-3d' }}>
                                <motion.div whileHover={{ rotateZ: [0, -15, 15, 0], scale: 1.2 }}
                                    className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-100/80 to-primary-200/60 backdrop-blur-xl text-primary-700 rounded-3xl mb-6 border border-primary-200/50 shadow-lg"
                                    style={{ transform: 'translateZ(30px)' }}>
                                    <span className="material-symbols-outlined text-4xl">{feature.icon}</span>
                                </motion.div>
                                <h3 className="text-xl font-display font-bold text-text-light mb-3" style={{ transform: 'translateZ(20px)' }}>{feature.title}</h3>
                                <p className="text-text-secondary-light" style={{ transform: 'translateZ(10px)' }}>{feature.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Specials */}
            <motion.section ref={specialsRef} style={{ rotateX: specialsRotateX, scale: specialsScale, transformStyle: 'preserve-3d' }}
                className="py-24 relative bg-gradient-to-b from-transparent to-cream-100/30">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="text-center mb-16">
                        <div className="inline-block bg-white/50 backdrop-blur-xl px-6 py-2 rounded-full border border-white/60 mb-4">
                            <span className="text-primary font-bold uppercase">Today's Selection</span>
                        </div>
                        <h2 className="section-header">Daily Specials</h2>
                        <div className="divider-primary"></div>
                    </div>
                    <motion.div variants={staggerContainerVariants(0.12)} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" style={{ perspective: '1500px' }}>
                        {dailySpecials.map((item) => (
                            <motion.div key={item.id} variants={itemVariants} whileHover={{ y: -25, rotateY: 18, rotateX: -12, scale: 1.08, z: 80 }}
                                className="overflow-hidden rounded-3xl bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]"
                                style={{ transformStyle: 'preserve-3d' }}>
                                <div className="aspect-[4/3] overflow-hidden">
                                    <motion.img src={item.image} alt={item.name} className="w-full h-full object-cover"
                                        whileHover={{ scale: 1.25, rotateZ: 3 }} />
                                </div>
                                <div className="p-6 bg-white/40 backdrop-blur-xl" style={{ transform: 'translateZ(30px)' }}>
                                    <h3 className="text-xl font-display font-bold text-text-light mb-2" style={{ transform: 'translateZ(25px)' }}>{item.name}</h3>
                                    <p className="text-sm text-text-secondary-light mb-4" style={{ transform: 'translateZ(15px)' }}>{item.desc}</p>
                                    <div className="flex items-center justify-between" style={{ transform: 'translateZ(20px)' }}>
                                        <motion.span whileHover={{ scale: 1.3, rotateY: [0, 360] }}
                                            className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400"
                                            style={{ display: 'inline-block' }}>{item.price}</motion.span>
                                        <Link to="/menu">
                                            <motion.button whileHover={{ scale: 1.1, x: 5 }}
                                                className="text-primary-600 font-bold text-sm flex items-center gap-1 bg-primary-50/50 px-4 py-2 rounded-full border border-primary-200/50">
                                                View <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                            </motion.button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Testimonials */}
            <motion.section ref={testimonialsRef} style={{ rotateY: testimonialsRotateY, transformStyle: 'preserve-3d' }}
                className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-mocha via-mocha-600 to-charcoal-800"></div>
                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-block bg-white/10 backdrop-blur-xl px-6 py-2 rounded-full border border-white/30 mb-4">
                            <span className="text-primary-200 font-bold uppercase">What People Say</span>
                        </div>
                        <h2 className="section-header text-white">Customer Love</h2>
                        <div className="divider-primary"></div>
                    </div>
                    <motion.div variants={staggerContainerVariants(0.2)} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ perspective: '1500px' }}>
                        {testimonials.map((testimonial, idx) => (
                            <motion.div key={idx} variants={itemVariants} whileHover={{ y: -20, rotateY: 12, rotateX: -8, scale: 1.05 }}
                                className="bg-white/10 backdrop-blur-2xl rounded-3xl p-10 border border-white/30 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]"
                                style={{ transformStyle: 'preserve-3d' }}>
                                <div className="flex gap-1 mb-6" style={{ transform: 'translateZ(20px)' }}>
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <motion.span key={i} initial={{ scale: 0, rotateY: -180 }} whileInView={{ scale: 1, rotateY: 0 }}
                                            className="material-symbols-outlined text-primary-300 text-2xl">star</motion.span>
                                    ))}
                                </div>
                                <p className="text-cream-50 text-lg mb-8 italic" style={{ transform: 'translateZ(15px)' }}>"{testimonial.text}"</p>
                                <div className="pt-6 border-t border-white/20" style={{ transform: 'translateZ(10px)' }}>
                                    <p className="font-display font-bold text-white text-lg">{testimonial.name}</p>
                                    <p className="text-cream-300 text-sm mt-1">{testimonial.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* CTA */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-cream-100 to-primary-100"></div>
                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <motion.div initial={{ opacity: 0, y: 60, rotateX: -25 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true }}
                        whileHover={{ scale: 1.03, rotateX: 5, y: -15 }}
                        className="bg-white/60 backdrop-blur-3xl rounded-[3rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] p-16 text-center max-w-5xl mx-auto border border-white/80"
                        style={{ transformStyle: 'preserve-3d' }}>
                        <h2 className="text-display-sm font-display text-text-light mb-6" style={{ transform: 'translateZ(40px)' }}>Start Your Morning Right</h2>
                        <p className="text-xl text-text-secondary-light mb-10 max-w-2xl mx-auto" style={{ transform: 'translateZ(30px)' }}>
                            Order online for pickup or delivery. Fresh pastries delivered to your door.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center" style={{ transform: 'translateZ(35px)' }}>
                            <Link to="/menu">
                                <motion.button whileHover={{ scale: 1.1, rotateY: 10 }} whileTap={{ scale: 0.95 }}
                                    className="px-10 py-5 text-lg font-bold bg-gradient-to-r from-primary to-primary-600 text-white rounded-2xl shadow-[0_8px_32px_0_rgba(201,165,90,0.4)]">Order Now</motion.button>
                            </Link>
                            <Link to="/contact">
                                <motion.button whileHover={{ scale: 1.1, rotateY: -10 }} whileTap={{ scale: 0.95 }}
                                    className="px-10 py-5 text-lg font-bold bg-white/40 backdrop-blur-xl border-2 border-primary-200 text-text-light rounded-2xl">Contact Us</motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </motion.main>
    );
}

export default HomePage;

import React, { useState, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import { pageVariants, staggerContainerVariants, itemVariants } from '../utils/animations.jsx';

function MenuPage() {
    const { addToCart } = useShop();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-15, 0, 15]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

    const categories = ['All', 'Breads', 'Pastries', 'Cakes', 'Cookies'];

    const products = [
        { id: 1, name: 'Artisan Croissant', category: 'Pastries', price: '$4.50', desc: 'Buttery, flaky French perfection', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop' },
        { id: 2, name: 'Sourdough Loaf', category: 'Breads', price: '$8.00', desc: 'Traditional slow-fermented bread', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop' },
        { id: 3, name: 'Chocolate Cake', category: 'Cakes', price: '$32.00', desc: 'Rich Belgian chocolate layers', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop' },
        { id: 4, name: 'Almond Cookies', category: 'Cookies', price: '$12.00', desc: '12 pieces of crunchy delight', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop' },
        { id: 5, name: 'Fruit Tart', category: 'Pastries', price: '$6.00', desc: 'Seasonal fresh fruits on custard', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop' },
        { id: 6, name: 'Baguette', category: 'Breads', price: '$5.00', desc: 'Classic French bread', image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&auto=format&fit=crop' },
        { id: 7, name: 'Éclair', category: 'Pastries', price: '$5.50', desc: 'Rich chocolate pastry cream', image: 'https://images.unsplash.com/photo-1612203985729-70726954388c?w=800&auto=format&fit=crop' },
        { id: 8, name: 'Red Velvet Cake', category: 'Cakes', price: '$35.00', desc: 'Classic with cream cheese frosting', image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&auto=format&fit=crop' },
    ];

    const filteredProducts = selectedCategory === 'All' ? products : products.filter(p => p.category === selectedCategory);

    return (
        <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit"
            className="flex-grow bg-gradient-to-b from-cream-50 to-background-light" style={{ perspective: '2000px' }}>

            {/* Header */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-cream-200 pattern-dots"></div>
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <motion.div initial={{ opacity: 0, y: 40, rotateX: -20 }} animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        className="text-center max-w-3xl mx-auto bg-white/30 backdrop-blur-2xl rounded-3xl p-12 border border-white/50 shadow-[0_8px_32px_0_rgba(255,255,255,0.4)]"
                        style={{ transformStyle: 'preserve-3d' }}>
                        <span className="text-primary font-semibold uppercase tracking-wide" style={{ transform: 'translateZ(20px)' }}>Our Selection</span>
                        <h1 className="section-header mt-2" style={{ transform: 'translateZ(40px)' }}>Artisan Menu</h1>
                        <div className="divider-primary"></div>
                        <p className="section-subheader" style={{ transform: 'translateZ(30px)' }}>
                            Handcrafted selection of breads, pastries, cakes, and cookies - all made fresh daily
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="sticky top-20 z-40 py-6">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                        className="bg-white/60 backdrop-blur-2xl rounded-2xl p-4 border border-white/80 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]">
                        <div className="flex flex-wrap justify-center gap-3">
                            {categories.map(category => (
                                <motion.button key={category}
                                    whileHover={{ scale: 1.08, rotateY: 5, boxShadow: "0 10px 30px rgba(201, 165, 90, 0.3)" }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-6 py-2.5 rounded-full font-semibold transition-all ${selectedCategory === category
                                            ? 'bg-gradient-to-r from-primary to-primary-600 text-white shadow-[0_4px_16px_0_rgba(201,165,90,0.4)] border border-primary-300/50'
                                            : 'bg-white/80 backdrop-blur-xl border-2 border-border-light text-text-light hover:border-primary hover:text-primary'
                                        }`}
                                    style={{ transformStyle: 'preserve-3d' }}>
                                    {category}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Products Grid */}
            <motion.section ref={containerRef} style={{ rotateY, scale, transformStyle: 'preserve-3d' }} className="py-16">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div variants={staggerContainerVariants(0.1)} initial="hidden" animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" style={{ perspective: '1500px' }}>
                        {filteredProducts.map(product => (
                            <motion.div key={product.id} variants={itemVariants} layout
                                whileHover={{ y: -20, rotateY: 15, rotateX: -10, scale: 1.05, z: 60 }}
                                className="group overflow-hidden rounded-3xl bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]"
                                style={{ transformStyle: 'preserve-3d' }}>
                                <div className="aspect-square overflow-hidden bg-cream-100 relative">
                                    <motion.img src={product.image} alt={product.name} className="w-full h-full object-cover"
                                        whileHover={{ scale: 1.2, rotateZ: 3 }} transition={{ duration: 0.6 }} />
                                    <motion.div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/50 to-transparent backdrop-blur-[1px]"
                                        initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} />
                                </div>
                                <div className="p-5 bg-white/40 backdrop-blur-xl" style={{ transform: 'translateZ(25px)' }}>
                                    <div className="mb-3">
                                        <span className="inline-block px-3 py-1 bg-primary-100/80 backdrop-blur-sm text-primary-700 rounded-full text-xs font-semibold border border-primary-200/50">
                                            {product.category}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-display font-semibold text-text-light mb-1" style={{ transform: 'translateZ(20px)' }}>{product.name}</h3>
                                    <p className="text-sm text-text-secondary-light mb-4" style={{ transform: 'translateZ(15px)' }}>{product.desc}</p>
                                    <div className="flex items-center justify-between" style={{ transform: 'translateZ(20px)' }}>
                                        <motion.span whileHover={{ scale: 1.2, rotateY: 360 }} transition={{ duration: 0.6 }}
                                            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400"
                                            style={{ display: 'inline-block' }}>{product.price}</motion.span>
                                        <motion.button whileHover={{ scale: 1.1, rotateY: 10 }} whileTap={{ scale: 0.95 }}
                                            onClick={() => addToCart(product)}
                                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-mocha to-mocha-600 text-white rounded-xl shadow-[0_4px_16px_0_rgba(58,43,34,0.3)] border border-mocha-400/50"
                                            style={{ transformStyle: 'preserve-3d' }}>
                                            <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                                            <span className="font-semibold text-sm">Add</span>
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {filteredProducts.length === 0 && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-16 bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/60">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-cream-200/60 backdrop-blur-xl rounded-full mb-4">
                                <span className="material-symbols-outlined text-4xl text-text-secondary-light">bakery_dining</span>
                            </div>
                            <h3 className="text-xl font-display font-semibold text-text-light mb-2">No items found</h3>
                            <p className="text-text-secondary-light">Try selecting a different category</p>
                        </motion.div>
                    )}
                </div>
            </motion.section>
        </motion.main>
    );
}

export default MenuPage;

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { pageVariants, staggerContainerVariants, itemVariants } from '../utils/animations.jsx';

function AboutPage() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
    const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);

    const values = [
        { icon: 'eco', title: 'Quality Ingredients', desc: 'We partner with local farmers to source the freshest, organic ingredients for authentic taste and nutrition' },
        { icon: 'favorite', title: 'Handcrafted with Love', desc: 'Every item is made from scratch daily, using traditional techniques passed down through generations' },
        { icon: 'groups', title: 'Community First', desc: 'We\'re more than a bakery; we\'re a gathering place for friends, family, and neighbors to connect' }
    ];

    const timeline = [
        { year: '2010', title: 'Founded', desc: 'The dream of Suseli Bakery begins in a small home kitchen, fueled by passion' },
        { year: '2012', title: 'First Sourdough Mastered', desc: 'After months of trial and error, our signature sourdough recipe is perfected' },
        { year: '2015', title: 'Community Partnership', desc: 'We began partnering with local cafes and donating leftover bread to food banks' },
        { year: '2020', title: 'Expanded Menu', desc: 'Introducing a full range of pastries, cakes, and artisanal coffee to our offerings' }
    ];

    const team = [
        { name: 'Jane Doe', role: 'Founder & Head Baker', quote: 'For me, baking is about creating moments of joy. My favorite thing to bake is our classic country loaf.', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop' },
        { name: 'John Smith', role: 'Pastry Chef', quote: 'I love the precision and artistry of pastry. Nothing beats the smell of our freshly baked croissants in the morning.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop' },
        { name: 'Emily White', role: 'Barista & Front of House', quote: 'I get to connect with our amazing customers every day. My go-to is an oat latte and a warm almond croissant.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop' }
    ];

    return (
        <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex-grow" style={{ perspective: '2000px' }}>
            {/* Hero */}
            <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-mocha via-mocha-600 to-charcoal-800"></div>
                <div className="absolute inset-0 pattern-grid opacity-5"></div>
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
                <motion.div style={{ rotateX }} className="relative z-10 container mx-auto px-6 md:px-12 py-20 text-center">
                    <motion.div initial={{ opacity: 0, y: 40, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto bg-white/10 backdrop-blur-2xl rounded-3xl p-12 border border-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]"
                        style={{ transformStyle: 'preserve-3d' }}>
                        <span className="text-primary-200 font-accent text-xl" style={{ transform: 'translateZ(30px)' }}>Est. 2010</span>
                        <h1 className="text-display lg:text-display-lg text-white mt-4 mb-6" style={{ transform: 'translateZ(50px)' }}>
                            The Story of <span className="text-gradient">Suseli</span>
                        </h1>
                        <p className="text-xl text-cream-100 max-w-3xl mx-auto" style={{ transform: 'translateZ(40px)' }}>
                            Baked with passion, shared with love. Discover the heart and soul behind your favorite neighborhood bakery.
                        </p>
                    </motion.div>
                </motion.div>
            </section>

            {/* Introduction */}
            <section className="py-20 bg-gradient-to-b from-cream-50 to-background-light">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center bg-white/50 backdrop-blur-xl rounded-3xl p-12 border border-white/60 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)]">
                        <p className="text-xl leading-relaxed text-text-light">
                            It all started with a simple dream: to create a place where the community could gather and enjoy the simple pleasure of handcrafted bread. From our humble beginnings in a small kitchen, Suseli Bakery has grown, but our core passion remains the same—<strong className="text-primary">to bake with love</strong>, using only the finest ingredients, for the wonderful people we call our neighbors.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cream-100/80 to-primary-50/80"></div>
                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-center mb-12 bg-white/40 backdrop-blur-xl rounded-2xl p-6 inline-block mx-auto border border-white/60">
                        <span className="text-primary font-semibold uppercase tracking-wide">What We Stand For</span>
                        <h2 className="section-header mt-2">Our Mission & Values</h2>
                        <div className="divider-primary"></div>
                    </motion.div>

                    <motion.div variants={staggerContainerVariants(0.15)} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ perspective: '1500px' }}>
                        {values.map((value, idx) => (
                            <motion.div key={idx} variants={itemVariants}
                                whileHover={{ y: -20, rotateY: 12, rotateX: -8, scale: 1.05 }}
                                className="bg-white/70 backdrop-blur-2xl rounded-3xl p-10 text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] border border-white/80"
                                style={{ transformStyle: 'preserve-3d' }}>
                                <motion.div whileHover={{ rotateZ: [0, -15, 15, 0], scale: 1.2 }}
                                    className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-100/80 to-primary-200/60 backdrop-blur-xl text-primary-700 rounded-3xl mb-6 border border-primary-200/50 shadow-lg"
                                    style={{ transform: 'translateZ(30px)' }}>
                                    <span className="material-symbols-outlined text-4xl">{value.icon}</span>
                                </motion.div>
                                <h3 className="text-xl font-display font-semibold text-text-light mb-3" style={{ transform: 'translateZ(20px)' }}>{value.title}</h3>
                                <p className="text-text-secondary-light" style={{ transform: 'translateZ(10px)' }}>{value.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-20 bg-gradient-to-b from-background-light to-cream-50">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-center mb-16 bg-white/40 backdrop-blur-xl rounded-2xl p-6 inline-block mx-auto border border-white/60">
                        <span className="text-primary font-semibold uppercase tracking-wide">Our Journey</span>
                        <h2 className="section-header mt-2">A Growing Legacy</h2>
                        <div className="divider-primary"></div>
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-400 via-primary to-primary-400 hidden md:block"></div>
                            {timeline.map((item, idx) => (
                                <motion.div key={idx} initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }} transition={{ delay: idx * 0.2 }}
                                    whileHover={{ scale: 1.03, rotateY: idx % 2 === 0 ? 5 : -5 }}
                                    className={`relative flex items-center mb-12 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                    <div className={`w-full md:w-5/12 ${idx % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                                        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] border border-white/80"
                                            style={{ transformStyle: 'preserve-3d' }}>
                                            <span className="inline-block px-4 py-1 bg-primary-100/80 backdrop-blur-sm text-primary-700 font-bold rounded-full text-sm mb-3 border border-primary-200/50">{item.year}</span>
                                            <h3 className="text-xl font-display font-semibold text-text-light mb-2">{item.title}</h3>
                                            <p className="text-text-secondary-light">{item.desc}</p>
                                        </div>
                                    </div>
                                    <div className="hidden md:block w-2/12 flex-shrink-0">
                                        <motion.div whileHover={{ scale: 1.5, rotateZ: 360 }}
                                            className="w-4 h-4 bg-primary rounded-full mx-auto border-4 border-surface-light shadow-glow"></motion.div>
                                    </div>
                                    <div className="hidden md:block w-5/12"></div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cream-100/80 to-primary-50/80"></div>
                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-center mb-12 bg-white/40 backdrop-blur-xl rounded-2xl p-6 inline-block mx-auto border border-white/60">
                        <span className="text-primary font-semibold uppercase tracking-wide">Meet the Team</span>
                        <h2 className="section-header mt-2">The Bakers Behind the Magic</h2>
                        <div className="divider-primary"></div>
                    </motion.div>

                    <motion.div variants={staggerContainerVariants(0.2)} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ perspective: '1500px' }}>
                        {team.map((member, idx) => (
                            <motion.div key={idx} variants={itemVariants}
                                whileHover={{ y: -20, rotateY: 10, rotateX: -8, scale: 1.05 }}
                                className="bg-white/70 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] border border-white/80 group"
                                style={{ transformStyle: 'preserve-3d' }}>
                                <div className="aspect-square overflow-hidden bg-cream-100/50">
                                    <motion.img src={member.image} alt={member.name}
                                        whileHover={{ scale: 1.15, rotateZ: 3 }}
                                        className="w-full h-full object-cover" />
                                </div>
                                <div className="p-6 text-center bg-white/40 backdrop-blur-xl" style={{ transform: 'translateZ(20px)' }}>
                                    <h3 className="text-xl font-display font-semibold text-text-light mb-1">{member.name}</h3>
                                    <p className="text-primary font-semibold mb-4">{member.role}</p>
                                    <p className="text-text-secondary-light italic">"{member.quote}"</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </motion.main>
    );
}

export default AboutPage;

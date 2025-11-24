import React, { useState } from 'react';
import { motion } from 'framer-motion';

function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <main className="flex-grow">
            {/* Hero */}
            <section className="bg-gradient-to-br from-primary-50 to-cream-200 py-16 pattern-dots">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <span className="text-primary font-semibold uppercase tracking-wide">Let's Connect</span>
                        <h1 className="section-header mt-2">Get in Touch</h1>
                        <div className="divider-primary"></div>
                        <p className="section-subheader">
                            We'd love to hear from you! Visit us, give us a call, or send a message below
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-20 bg-background-light">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Info & Map */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-8"
                        >
                            {/* Contact Details */}
                            <motion.div variants={itemVariants} className="card p-8">
                                <h2 className="text-2xl font-display font-bold text-text-light mb-6">Visit Us</h2>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                                            <span className="material-symbols-outlined text-primary">location_on</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-text-light mb-1">Address</p>
                                            <p className="text-text-secondary-light">123 Sweet Street<br />Pastryville, CA 90210</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                                            <span className="material-symbols-outlined text-primary">phone</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-text-light mb-1">Phone</p>
                                            <a href="tel:5551234567" className="text-text-secondary-light hover:text-primary transition-colors">
                                                (555) 123-4567
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                                            <span className="material-symbols-outlined text-primary">mail</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-text-light mb-1">Email</p>
                                            <a href="mailto:hello@suselibakery.com" className="text-text-secondary-light hover:text-primary transition-colors">
                                                hello@suselibakery.com
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Opening Hours */}
                            <motion.div variants={itemVariants} className="card p-8">
                                <h2 className="text-2xl font-display font-bold text-text-light mb-6">Opening Hours</h2>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center pb-3 border-b border-border-light">
                                        <span className="font-semibold text-text-light">Monday - Friday</span>
                                        <span className="text-text-secondary-light">7:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-3 border-b border-border-light">
                                        <span className="font-semibold text-text-light">Saturday</span>
                                        <span className="text-text-secondary-light">8:00 AM - 5:00 PM</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-text-light">Sunday</span>
                                        <span className="text-red-500 font-semibold">Closed</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Map */}
                            <motion.div
                                variants={itemVariants}
                                className="card overflow-hidden h-80"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop"
                                    alt="Map Location"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="card p-8 lg:p-10"
                        >
                            <h2 className="text-2xl font-display font-bold text-text-light mb-2">Send Us a Message</h2>
                            <p className="text-text-secondary-light mb-8">Have a question or a special request? We're here to help.</p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <label className="block text-sm font-semibold text-text-light mb-2" htmlFor="name">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="input-primary"
                                        placeholder="Your Name"
                                        required
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <label className="block text-sm font-semibold text-text-light mb-2" htmlFor="email">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="input-primary"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <label className="block text-sm font-semibold text-text-light mb-2" htmlFor="subject">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="input-primary"
                                        placeholder="e.g. Custom Cake Order"
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <label className="block text-sm font-semibold text-text-light mb-2" htmlFor="message">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="5"
                                        className="input-primary resize-none"
                                        placeholder="Your message here..."
                                        required
                                    ></textarea>
                                </motion.div>

                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="btn-primary w-full text-lg"
                                >
                                    Send Message
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ContactPage;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';

function Header() {
    const location = useLocation();
    const { cart } = useShop();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const isActive = (path) => location.pathname === path;

    const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/menu', label: 'Menu' },
        { path: '/about', label: 'About' },
        { path: '/contact', label: 'Contact' },
        { path: '/order-history', label: 'My Orders' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md shadow-soft'
                : 'bg-surface-light dark:bg-surface-dark'
            } border-b border-border-light dark:border-border-dark`}>
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-3 group"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <div className="relative">
                            <div className="size-10 bg-gradient-to-br from-primary to-mocha rounded-xl flex items-center justify-center shadow-soft group-hover:shadow-glow transition-all duration-300">
                                <span className="material-symbols-outlined text-white text-xl">bakery_dining</span>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-display font-bold text-text-light dark:text-text-dark group-hover:text-primary transition-colors">
                                Suseli
                            </h1>
                            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-accent">
                                Artisan Bakery
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                className={`relative text-sm font-semibold transition-colors group ${isActive(link.path)
                                        ? 'text-primary'
                                        : 'text-text-light dark:text-text-dark hover:text-primary'
                                    }`}
                                to={link.path}
                            >
                                {link.label}
                                {isActive(link.path) && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute -bottom-6 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-400 to-primary"
                                    />
                                )}
                                <span className="absolute -bottom-6 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-400 to-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Cart, Admin & Mobile Menu */}
                    <div className="flex items-center gap-3">
                        {/* Admin Link - Desktop Only */}
                        <Link
                            to="/admin"
                            className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-mocha text-mocha hover:bg-mocha hover:text-white transition-all"
                        >
                            <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
                            <span className="font-semibold">Admin</span>
                        </Link>

                        {/* Cart */}
                        <Link
                            to="/cart"
                            className="relative group"
                        >
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary-600 transition-all">
                                <span className="material-symbols-outlined">shopping_bag</span>
                                <span className="hidden sm:inline font-semibold">Cart</span>
                            </div>
                            {cartItemCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-mocha text-white text-xs font-bold shadow-soft"
                                >
                                    {cartItemCount}
                                </motion.span>
                            )}
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 rounded-xl hover:bg-background-light dark:hover:bg-background-dark transition-colors"
                        >
                            <span className="material-symbols-outlined text-text-light dark:text-text-dark">
                                {isMobileMenuOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Dropdown */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="lg:hidden overflow-hidden border-t border-border-light dark:border-border-dark"
                        >
                            <nav className="py-4 flex flex-col gap-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        className={`px-4 py-3 rounded-xl font-semibold transition-all ${isActive(link.path)
                                                ? 'bg-primary-100 text-primary'
                                                : 'text-text-light dark:text-text-dark hover:bg-background-light dark:hover:bg-background-dark'
                                            }`}
                                        to={link.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <Link
                                    to="/track-order"
                                    className="px-4 py-3 rounded-xl font-semibold text-text-light dark:text-text-dark hover:bg-background-light dark:hover:bg-background-dark transition-all"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Track Order
                                </Link>
                                <Link
                                    to="/admin"
                                    className="px-4 py-3 rounded-xl font-semibold text-mocha hover:bg-mocha-50 transition-all"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Admin
                                </Link>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}

export default Header;

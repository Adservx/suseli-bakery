import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

function CartPage() {
    const { cart, updateQuantity, removeFromCart, placeOrder } = useShop();
    const [discountCode, setDiscountCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [lastOrder, setLastOrder] = useState(null);

    const subtotal = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        return sum + (price * item.quantity);
    }, 0);

    const tax = subtotal * 0.085;
    const total = subtotal + tax;

    const handleCheckout = async () => {
        if (cart.length === 0) return;

        if (!phoneNumber.trim()) {
            toast.error('Please enter your phone number to place an order.');
            return;
        }

        if (phoneNumber.length < 10) {
            toast.error('Please enter a valid phone number.');
            return;
        }

        const order = await placeOrder({
            customerName: "Guest User",
            phoneNumber: phoneNumber,
            discountCode
        });

        if (order) {
            setLastOrder(order);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Order ID copied to clipboard!');
    };

    if (lastOrder) {
        return (
            <main className="flex-grow flex items-center justify-center px-4 py-12 md:py-20 bg-gradient-to-br from-green-50 to-cream-100">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="w-full max-w-lg card p-8 md:p-10 text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="size-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow"
                    >
                        <span className="material-symbols-outlined text-5xl">check_circle</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-display-sm font-display text-text-light mb-2"
                    >
                        Order Placed!
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-text-secondary-light mb-8"
                    >
                        Thank you for your purchase. Your order has been received and is being processed.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-background-light p-6 rounded-xl border-2 border-primary/20 mb-8"
                    >
                        <p className="text-sm text-text-secondary-light mb-3">Your Order ID</p>
                        <div className="flex items-center justify-center gap-3 flex-wrap">
                            <span className="text-2xl font-mono font-bold text-primary tracking-wider">{lastOrder.id}</span>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => copyToClipboard(lastOrder.id)}
                                className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-primary"
                                title="Copy Order ID"
                            >
                                <span className="material-symbols-outlined">content_copy</span>
                            </motion.button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col gap-3"
                    >
                        <Link to="/track-order" className="btn-primary">
                            <span className="flex items-center justify-center gap-2">
                                Track Order Status
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </span>
                        </Link>
                        <Link to="/menu" className="btn-outline">
                            Continue Shopping
                        </Link>
                    </motion.div>
                </motion.div>
            </main>
        );
    }

    return (
        <main className="flex-grow bg-background-light">
            {/* Header */}
            <section className="bg-gradient-to-br from-primary-50 to-cream-200 py-12 pattern-dots">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="section-header">Your Shopping Cart</h1>
                        <p className="text-text-secondary-light text-center">{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-6 md:px-12 py-12">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <AnimatePresence mode="popLayout">
                            {cart.map((item, index) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20, height: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    key={item.id}
                                    className="card-hover p-6 mb-4"
                                >
                                    <div className="flex flex-col sm:flex-row gap-6">
                                        <div className="aspect-square w-24 sm:w-32 rounded-lg overflow-hidden bg-cream-100 flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4">
                                            <div>
                                                <h3 className="text-lg font-display font-bold text-text-light mb-1">{item.name}</h3>
                                                <p className="text-sm text-text-secondary-light mb-3">{item.desc}</p>
                                                <p className="text-xl font-bold text-primary">{item.price}</p>
                                            </div>
                                            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-4">
                                                <div className="flex items-center gap-3 bg-background-light rounded-full p-1">
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="w-8 h-8 rounded-full bg-white hover:bg-primary hover:text-white transition-colors flex items-center justify-center font-bold shadow-soft"
                                                    >
                                                        -
                                                    </motion.button>
                                                    <span className="w-8 text-center font-bold text-text-light">{item.quantity}</span>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="w-8 h-8 rounded-full bg-white hover:bg-primary hover:text-white transition-colors flex items-center justify-center font-bold shadow-soft"
                                                    >
                                                        +
                                                    </motion.button>
                                                </div>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-red-500 hover:text-red-700 font-semibold text-sm flex items-center gap-1"
                                                >
                                                    <span className="material-symbols-outlined text-lg">delete</span>
                                                    Remove
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {cart.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="card p-12 text-center"
                            >
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-cream-200 rounded-full mb-6">
                                    <span className="material-symbols-outlined text-4xl text-text-secondary-light">shopping_cart</span>
                                </div>
                                <h3 className="text-xl font-display font-semibold text-text-light mb-2">Your cart is empty</h3>
                                <p className="text-text-secondary-light mb-6">Start adding some delicious items!</p>
                                <Link to="/menu" className="btn-primary inline-flex">
                                    Browse Menu
                                </Link>
                            </motion.div>
                        )}

                        {cart.length > 0 && (
                            <div className="mt-6 text-center">
                                <Link to="/menu" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                                    <span className="material-symbols-outlined">arrow_back</span>
                                    Continue Shopping
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-1"
                    >
                        <div className="sticky top-24 card p-6 space-y-6">
                            <h2 className="text-2xl font-display font-bold text-text-light">Order Summary</h2>

                            <div className="space-y-3">
                                <div className="flex justify-between text-text-light">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-text-light">
                                    <span>Tax (8.5%)</span>
                                    <span className="font-semibold">${tax.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="border-t-2 border-dashed border-border-light pt-4">
                                <div className="flex justify-between text-xl font-bold text-text-light">
                                    <span>Total</span>
                                    <span className="text-primary">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4">
                                <div>
                                    <label className="block text-sm font-semibold text-text-light mb-2" htmlFor="phone">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className="input-primary"
                                        placeholder="e.g. 9841234567"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-text-light mb-2" htmlFor="discount">
                                        Discount Code
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            id="discount"
                                            value={discountCode}
                                            onChange={(e) => setDiscountCode(e.target.value)}
                                            className="input-primary flex-1"
                                            placeholder="Enter code"
                                        />
                                        <button className="px-4 py-2 bg-mocha-100 text-mocha font-semibold rounded-lg hover:bg-mocha-200 transition-colors">
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleCheckout}
                                disabled={cart.length === 0}
                                className="btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined">lock</span>
                                    Secure Checkout
                                </span>
                            </motion.button>

                            <p className="text-xs text-center text-text-secondary-light">
                                SSL Encrypted • Secure Payment
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}

export default CartPage;

import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';

function OrderTrackingPage() {
    const { orders } = useShop();
    const [searchId, setSearchId] = useState('');
    const [foundOrder, setFoundOrder] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchId.trim()) return;

        // Search by full ID or last 6 characters
        const order = orders.find(o =>
            o.id === searchId || o.id.endsWith(searchId)
        );

        setFoundOrder(order || null);
        setHasSearched(true);
    };

    const getStepStatus = (step, currentStatus) => {
        const statusOrder = ['Pending', 'Processing', 'Completed'];
        const currentIndex = statusOrder.indexOf(currentStatus);
        const stepIndex = statusOrder.indexOf(step);

        if (currentStatus === 'Cancelled') return 'error';
        if (currentIndex >= stepIndex) return 'completed';
        return 'pending';
    };

    return (
        <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 md:py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl"
            >
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-black text-text-light dark:text-text-dark mb-4">Track Your Order</h1>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg">Enter your Order ID to see the current status.</p>
                </div>

                <form onSubmit={handleSearch} className="flex gap-4 mb-12">
                    <input
                        type="text"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        placeholder="e.g. 173235..."
                        className="flex-1 h-14 px-6 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-lg focus:border-primary focus:ring-primary shadow-sm"
                    />
                    <button
                        type="submit"
                        className="h-14 px-8 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-md"
                    >
                        Track
                    </button>
                </form>

                <AnimatePresence mode="wait">
                    {hasSearched && !foundOrder && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-xl text-center border border-red-100 dark:border-red-900/30"
                        >
                            <span className="material-symbols-outlined text-4xl mb-2">error</span>
                            <p className="font-bold">Order not found</p>
                            <p className="text-sm mt-1">Please check the ID and try again.</p>
                        </motion.div>
                    )}

                    {foundOrder && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-lg border border-border-light dark:border-border-dark overflow-hidden"
                        >
                            <div className="p-6 md:p-8 border-b border-border-light dark:border-border-dark bg-background-light/50 dark:bg-background-dark/50">
                                <div className="flex flex-wrap justify-between items-center gap-4">
                                    <div>
                                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Order ID</p>
                                        <p className="text-xl font-mono font-bold text-text-light dark:text-text-dark">#{foundOrder.id}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Total Amount</p>
                                        <p className="text-xl font-bold text-primary">${foundOrder.total.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 md:p-8">
                                {/* Status Stepper */}
                                <div className="relative flex justify-between mb-12 mt-4">
                                    {/* Progress Bar Background */}
                                    <div className="absolute top-1/2 left-0 w-full h-1 bg-border-light dark:border-border-dark -translate-y-1/2 z-0"></div>

                                    {/* Steps */}
                                    {['Pending', 'Processing', 'Completed'].map((step, index) => {
                                        const status = getStepStatus(step, foundOrder.status);
                                        const isCancelled = foundOrder.status === 'Cancelled';

                                        let circleClass = "bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark";
                                        if (status === 'completed') circleClass = "bg-primary border-primary text-white";
                                        if (isCancelled) circleClass = "bg-red-500 border-red-500 text-white";

                                        return (
                                            <div key={step} className="relative z-10 flex flex-col items-center gap-2">
                                                <div className={`size-10 rounded-full border-4 flex items-center justify-center font-bold transition-colors duration-500 ${circleClass}`}>
                                                    {status === 'completed' && <span className="material-symbols-outlined text-sm">check</span>}
                                                    {isCancelled && <span className="material-symbols-outlined text-sm">close</span>}
                                                    {status === 'pending' && (index + 1)}
                                                </div>
                                                <p className={`text-sm font-medium ${status === 'completed' ? 'text-primary' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}>
                                                    {step}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Order Items */}
                                <div className="space-y-4">
                                    <h3 className="font-bold text-lg text-text-light dark:text-text-dark">Items Ordered</h3>
                                    {foundOrder.items.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-background-light dark:bg-background-dark">
                                            <div className="size-16 rounded-md bg-cover bg-center" style={{ backgroundImage: `url("${item.image}")` }}></div>
                                            <div className="flex-1">
                                                <p className="font-bold text-text-light dark:text-text-dark">{item.name}</p>
                                                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="font-medium text-text-light dark:text-text-dark">{item.price}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </main>
    );
}

export default OrderTrackingPage;

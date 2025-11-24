import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

function OrderHistoryPage() {
    const { myOrders } = useShop();

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Order ID copied!');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500';
            case 'Processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500';
            case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500';
            case 'Cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <main className="flex-grow px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-text-light dark:text-text-dark">My Orders</h1>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">View your past orders and their status.</p>
                </div>

                <div className="space-y-6">
                    <AnimatePresence>
                        {myOrders.map(order => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                key={order.id}
                                className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden"
                            >
                                {/* Order Header */}
                                <div className="p-6 border-b border-border-light dark:border-border-dark bg-background-light/50 dark:bg-background-dark/50 flex flex-wrap justify-between items-center gap-4">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Order ID:</span>
                                            <span className="font-mono font-bold text-text-light dark:text-text-dark">#{order.id}</span>
                                            <button
                                                onClick={() => copyToClipboard(order.id)}
                                                className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors text-primary"
                                                title="Copy Order ID"
                                            >
                                                <span className="material-symbols-outlined text-sm">content_copy</span>
                                            </button>
                                        </div>
                                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">
                                            Placed on {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                        <Link
                                            to="/track-order"
                                            className="text-sm font-bold text-primary hover:underline"
                                        >
                                            Track
                                        </Link>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="p-6">
                                    <div className="space-y-4">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-4">
                                                <div className="size-16 rounded-md bg-cover bg-center shrink-0" style={{ backgroundImage: `url("${item.image}")` }}></div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-text-light dark:text-text-dark truncate">{item.name}</p>
                                                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Qty: {item.quantity}</p>
                                                </div>
                                                <p className="font-medium text-text-light dark:text-text-dark">{item.price}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-border-light dark:border-border-dark flex justify-between items-center">
                                        <span className="text-text-light dark:text-text-dark font-medium">Total Amount</span>
                                        <span className="text-xl font-bold text-primary">${order.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {myOrders.length === 0 && (
                        <div className="text-center py-16 bg-surface-light dark:bg-surface-dark rounded-xl border border-dashed border-border-light dark:border-border-dark">
                            <div className="size-16 bg-background-light dark:bg-background-dark rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-3xl text-text-secondary-light dark:text-text-secondary-dark">receipt_long</span>
                            </div>
                            <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-2">No orders yet</h3>
                            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6">Looks like you haven't placed any orders yet.</p>
                            <Link
                                to="/menu"
                                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
                            >
                                Start Shopping
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default OrderHistoryPage;

import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';

function AdminPage() {
    const { orders, updateOrderStatus, deleteOrder, isAdmin, adminLogin, adminLogout } = useShop();
    const [pin, setPin] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        adminLogin(pin);
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

    if (!isAdmin) {
        return (
            <main className="flex-grow flex items-center justify-center px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md bg-surface-light dark:bg-surface-dark p-8 rounded-2xl shadow-lg border border-border-light dark:border-border-dark"
                >
                    <div className="text-center mb-8">
                        <div className="mx-auto size-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-primary text-2xl">lock</span>
                        </div>
                        <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">Admin Access</h1>
                        <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2">Please enter the PIN to continue.</p>
                    </div>
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <input
                            type="password"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            placeholder="Enter PIN"
                            className="w-full h-12 px-4 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-center text-lg tracking-widest focus:border-primary focus:ring-primary"
                            maxLength={4}
                            autoFocus
                        />
                        <button
                            type="submit"
                            className="w-full h-12 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
                        >
                            Access Dashboard
                        </button>
                    </form>
                </motion.div>
            </main>
        );
    }

    return (
        <main className="flex-grow px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-text-light dark:text-text-dark">Order Management</h1>
                        <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">Manage and track all customer orders.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-surface-light dark:bg-surface-dark px-4 py-2 rounded-lg shadow-sm border border-border-light dark:border-border-dark">
                            <span className="font-bold text-primary">{orders.length}</span> Total Orders
                        </div>
                        <button
                            onClick={adminLogout}
                            className="px-4 py-2 text-sm font-bold text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[900px]">
                            <thead className="bg-background-light dark:bg-background-dark border-b border-border-light dark:border-border-dark">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-bold text-text-secondary-light dark:text-text-secondary-dark">Order ID</th>
                                    <th className="px-6 py-4 text-sm font-bold text-text-secondary-light dark:text-text-secondary-dark">Date</th>
                                    <th className="px-6 py-4 text-sm font-bold text-text-secondary-light dark:text-text-secondary-dark">Customer</th>
                                    <th className="px-6 py-4 text-sm font-bold text-text-secondary-light dark:text-text-secondary-dark">Phone</th>
                                    <th className="px-6 py-4 text-sm font-bold text-text-secondary-light dark:text-text-secondary-dark">Items</th>
                                    <th className="px-6 py-4 text-sm font-bold text-text-secondary-light dark:text-text-secondary-dark">Total</th>
                                    <th className="px-6 py-4 text-sm font-bold text-text-secondary-light dark:text-text-secondary-dark">Status</th>
                                    <th className="px-6 py-4 text-sm font-bold text-text-secondary-light dark:text-text-secondary-dark">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-light dark:divide-border-dark">
                                <AnimatePresence>
                                    {orders.map(order => (
                                        <motion.tr
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            key={order.id}
                                            className="hover:bg-background-light/50 dark:hover:bg-background-dark/50 transition-colors"
                                        >
                                            <td className="px-6 py-4 text-sm font-mono text-text-light dark:text-text-dark">#{order.id.slice(-6)}</td>
                                            <td className="px-6 py-4 text-sm text-text-light dark:text-text-dark">
                                                {new Date(order.date).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-text-light dark:text-text-dark">{order.customerName}</td>
                                            <td className="px-6 py-4 text-sm text-text-light dark:text-text-dark font-mono">{order.phoneNumber || '-'}</td>
                                            <td className="px-6 py-4 text-sm text-text-light dark:text-text-dark">
                                                <div className="flex flex-col gap-1">
                                                    {order.items.map((item, idx) => (
                                                        <span key={idx} className="text-xs">
                                                            {item.quantity}x {item.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-text-light dark:text-text-dark">${order.total.toFixed(2)}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                        className="text-xs rounded border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary"
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Processing">Processing</option>
                                                        <option value="Completed">Completed</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                    <button
                                                        onClick={() => deleteOrder(order.id)}
                                                        className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                                                        title="Delete Order"
                                                    >
                                                        <span className="material-symbols-outlined text-lg">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                                {orders.length === 0 && (
                                    <tr>
                                        <td colSpan="8" className="px-6 py-12 text-center text-text-secondary-light dark:text-text-secondary-dark">
                                            No orders found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AdminPage;

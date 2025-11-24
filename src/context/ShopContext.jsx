import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../supabaseClient';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isAdmin, setIsAdmin] = useState(() => {
        return localStorage.getItem('isAdmin') === 'true';
    });

    const [myOrderIds, setMyOrderIds] = useState(() => {
        const savedIds = localStorage.getItem('myOrderIds');
        return savedIds ? JSON.parse(savedIds) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('myOrderIds', JSON.stringify(myOrderIds));
    }, [myOrderIds]);

    // Fetch orders from Supabase
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data: ordersData, error: ordersError } = await supabase
                    .from('orders')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (ordersError) throw ordersError;

                const { data: itemsData, error: itemsError } = await supabase
                    .from('order_items')
                    .select('*');

                if (itemsError) throw itemsError;

                // Combine orders with their items
                const fullOrders = ordersData.map(order => ({
                    ...order,
                    date: order.created_at, // Map created_at to date for compatibility
                    items: itemsData.filter(item => item.order_id === order.id).map(item => ({
                        ...item,
                        name: item.product_name // Map product_name to name for compatibility
                    }))
                }));

                setOrders(fullOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
                toast.error('Failed to load orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();

        // Real-time subscription
        const subscription = supabase
            .channel('public:orders')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, fetchOrders)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'order_items' }, fetchOrders)
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    // Derive the user's orders from the global orders list using the saved IDs
    const myOrders = orders.filter(order => myOrderIds.includes(order.id));

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                toast.success(`Updated quantity for ${product.name}`);
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            toast.success(`Added ${product.name} to cart`);
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
        toast.error('Removed item from cart');
    };

    const updateQuantity = (id, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const clearCart = () => setCart([]);

    const placeOrder = async (orderDetails) => {
        const orderId = Date.now().toString();
        const total = cart.reduce((sum, item) => sum + (parseFloat(item.price.replace('$', '')) * item.quantity), 0) * 1.085;

        try {
            // 1. Insert Order
            const { error: orderError } = await supabase
                .from('orders')
                .insert([{
                    id: orderId,
                    customer_name: orderDetails.customerName,
                    phone_number: orderDetails.phoneNumber,
                    total: total,
                    status: 'Pending',
                    discount_code: orderDetails.discountCode
                }]);

            if (orderError) throw orderError;

            // 2. Insert Order Items
            const itemsToInsert = cart.map(item => ({
                order_id: orderId,
                product_name: item.name,
                quantity: item.quantity,
                price: item.price,
                image: item.image
            }));

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(itemsToInsert);

            if (itemsError) throw itemsError;

            // Update local state (optimistic update or wait for subscription)
            // We'll rely on subscription/fetch for global list, but return the object for the UI
            const newOrder = {
                id: orderId,
                date: new Date().toISOString(),
                status: 'Pending',
                items: cart,
                total,
                ...orderDetails
            };

            setMyOrderIds(prev => [orderId, ...prev]);
            clearCart();
            toast.success('Order placed successfully!');
            return newOrder;

        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Failed to place order. Please try again.');
            return null;
        }
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            const { error } = await supabase
                .from('orders')
                .update({ status })
                .eq('id', orderId);

            if (error) throw error;
            toast.success(`Order marked as ${status}`);
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Failed to update status');
        }
    };

    const deleteOrder = async (orderId) => {
        try {
            const { error } = await supabase
                .from('orders')
                .delete()
                .eq('id', orderId);

            if (error) throw error;

            setMyOrderIds(prev => prev.filter(id => id !== orderId));
            toast.success('Order deleted');
        } catch (error) {
            console.error('Error deleting order:', error);
            toast.error('Failed to delete order');
        }
    };

    const adminLogin = (pin) => {
        if (pin === '3690') {
            setIsAdmin(true);
            localStorage.setItem('isAdmin', 'true');
            toast.success('Welcome back, Admin!');
            return true;
        }
        toast.error('Invalid PIN');
        return false;
    };

    const adminLogout = () => {
        setIsAdmin(false);
        localStorage.removeItem('isAdmin');
        toast.success('Logged out');
    };

    return (
        <ShopContext.Provider value={{
            cart,
            orders,
            myOrders,
            isAdmin,
            loading,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            placeOrder,
            updateOrderStatus,
            deleteOrder,
            adminLogin,
            adminLogout
        }}>
            {children}
        </ShopContext.Provider>
    );
};

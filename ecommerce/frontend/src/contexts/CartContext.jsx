import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    //Inicializa o carrinho com os dados do localStorage (se existirem)
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('shopping_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    //Salva no localStorage sempre que o carrinho mudar
    useEffect(() => {
        localStorage.setItem('shopping_cart', JSON.stringify(cart));
    }, [cart]);

    //Adiciona produto ao carrinho
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingIndex = prevCart.findIndex((item) => item.id === product.id);
            if (existingIndex > -1) {
                const updated = [...prevCart];
                updated[existingIndex].quantity += 1;
                return updated;
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    //Remove produto do carrinho
    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    //Altera a quantidade diretamente
    const updateQuantity = (id, quantity) => {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }
        setCart((prevCart) =>
            prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    };

    //Limpa todo o carrinho
    const clearCart = () => setCart([]);

    //Cálculos de totais
    const totalItems = cart.reduce((acc, item) => acc + item.quantify, 0);
    const totalPrice = cart.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updatequantity,
                clearCart,
                totalItems,
                totalPrice
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext)
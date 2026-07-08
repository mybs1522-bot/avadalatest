import * as React from 'react';
import { useState } from 'react';
import { ShoppingCart } from '@/components/ui/shopping-cart';
import { PRODUCTS } from '@/lib/data';

export function ShoppingCartDemo() {
  const [cartItems, setCartItems] = useState([
    {
      id: PRODUCTS[0].id,
      name: PRODUCTS[0].name,
      price: PRODUCTS[0].price,
      quantity: 1,
      imageUrl: PRODUCTS[0].imageUrl,
    }
  ]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="p-8 max-w-3xl mx-auto pt-24 min-h-screen">
      <ShoppingCart
        items={cartItems}
        onQuantityChange={handleQuantityChange}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}

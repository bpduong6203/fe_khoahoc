'use client';
import React from 'react';
import CartLayout from '@/layouts/cart/cartshopping'; 
import "../../app/globals.css";
import AppLayoutClient from "@/layouts/app-layout-client";

const Cart = () => {
  return (
    <AppLayoutClient>
      <CartLayout />
    </AppLayoutClient>
  );
};

export default Cart;
'use client';
import React from 'react';
import CartLayout from '@/layouts/cart/cartshopping'; 
import "../../app/globals.css";
import AppLayoutClient from "@/layouts/app-layout-client";

export default function Cart () {
  return (
    <AppLayoutClient>
      <CartLayout />
    </AppLayoutClient>
  );
}
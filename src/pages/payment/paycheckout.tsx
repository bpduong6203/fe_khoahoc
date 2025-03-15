import React from 'react';
import PayLayout from '@/layouts/payment/paycheckout'; 
import "../../app/globals.css";
import AppLayoutClient from "@/layouts/app-layout-client"; 

const paycheckout = () => {
  return (
    <AppLayoutClient>
      <PayLayout />
    </AppLayoutClient>
  );
};

export default paycheckout;
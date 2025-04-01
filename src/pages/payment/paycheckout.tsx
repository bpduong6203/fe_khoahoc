import React from 'react';
import PayLayout from '@/layouts/user/payment/paycheckout'; 
import "../../app/globals.css";
import AppLayoutClient from "@/layouts/app-layout-client"; 

export default function paycheckout (){
  return (
    <AppLayoutClient>
      <PayLayout />
    </AppLayoutClient>
  );
}
import React from 'react';
import Homepage from '@/layouts/homepage';
import Head from 'next/head';

export default function Homepages () {
  return (
    <>
      <Head>
        <title>
          Home | Khoá học của bạn
        </title>
      </Head>
      <div>
        <Homepage />
      </div>    
    </>

  );
}
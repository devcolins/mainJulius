'use client';
import React from 'react';
import { useQueryWithAuth } from "@convex-dev/convex-lucia-auth/react";
import { api } from "@/convex/_generated/api";
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FaHeart, FaShare } from 'react-icons/fa';
import Link from 'next/link';
import { OrderProduct } from '@/app/actions/createOrder';
import { getFileUrl } from '@/app/constants/img';
import Image from 'next/image';


function Shop() {
  const products = useQueryWithAuth(api.myFunctions.getProducts, {});
 
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-2 gap-4 rounded-lg min-h-screen">
      {products?.products.map((product) => (
        <Link href={`/pages/product/${product._id}`} key={product._id}>
          <Card className="cursor-pointer">
            <div className="grid aspect-card group overflow-hidden rounded-lg w-full">
              <div className="relative  overflow-hidden rounded-t-lg">
                <Image
                  alt="Product image"
                  className="aspect-card object-cover w-full transition-transform"
                  height={100}
                  src={getFileUrl(product.imagefile)}
                  width={100}
                />
                <div className="absolute inset-0 flex flex-col md:flex-row lg:flex-row right-2 gap-4 p-4 transform translate-x-full transition-transform w-full bg-opacity-75 bg-gray-900 dark:bg-gray-1000/75 group-hover:translate-x-0">
                  <Button
                    className="top-4 dark:invert"
                    size="icon"
                    variant="outline"
                  >
                    <FaHeart className="w-4 h-4" />
                    <span className="sr-only">Add to favorites</span>
                  </Button>

                  <OrderProduct />

                  <Button
                    className="top-4 dark:invert"
                    size="icon"
                    variant="outline"
                  >
                    <FaShare className="w-4 h-4" />
                    <span className="sr-only">Share</span>
                  </Button>
                </div>
              </div>
              <div className="p-4  grid grid-cols-2 gap-2">
                <h3 className="font-semibold text-sm line-clamp-2">
                  {product.title || "Product Name"}
                </h3>
                <p className="font-semibold text-sm">Ksh{product.price}</p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default Shop;







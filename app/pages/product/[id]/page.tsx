
'use client';
import React from 'react';
import { useQueryWithAuth } from "@convex-dev/convex-lucia-auth/react";
import { api } from "@/convex/_generated/api";
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FaHeart, FaShare, FaTruckLoading } from 'react-icons/fa';
import { useParams } from "next/navigation";
import { OrderProduct } from '@/app/actions/createOrder';
import Link from 'next/link';
import { getFileUrl } from '@/app/constants/img';
import Image from 'next/image';




export default function Page() {
 
  const { id } = useParams();
  const products = useQueryWithAuth(api.myFunctions.getProducts, {});

  return (
    <div className='  max-h-2/3'>
      {products?.products.map((product) => {
        if (product._id === id) {
          return (
            <Card key={product._id}>
              <div className=" flex flex-col md:flex-row  aspect-card group overflow-hidden rounded-lg ">
                <div className="relative  overflow-hidden p-6 rounded-t-lg">
                  <Image
                    alt="Product image"
                    className="aspect-card rounded-lg object-cover  transition-transform"
                    height={400}
                    src={getFileUrl(product.imagefile)}
                    width={400}
                  />
                </div>
                <div className="">
                  <div className="flex flex-row lg:flex-row right-2 gap-4 p-4 ">
                    <Button
                      className="top-4 dark:invert"
                      size="icon"
                      variant="outline"
                    >
                      <FaHeart className="w-4 h-4" />
                      <span className="sr-only">Add to favorites</span>
                    </Button>
                    <Button
                      className="top-4 dark:invert"
                      size="icon"
                      variant="outline"
                    >
                      <FaShare className="w-4 h-4" />
                      <span className="sr-only">Share</span>
                    </Button>

                    <OrderProduct />

                    <Button
                      className="top-4 dark:invert"
                      size="icon"
                      variant="outline"
                    >
                      <FaTruckLoading className="w-4 h-4" />
                      <span className="sr-only">Buy now</span>
                    </Button>
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold">{product.title}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {/* {product.description} */}
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Molestiae nisi explicabo sit, omnis, amet consequuntur
                      consectetur inventore quia iure quisquam praesentium
                      exercitationem, doloribus perferendis eligendi! Impedit
                      perspiciatis deserunt nam corporis?
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-lg font-semibold">${product.price}</p>
                      <Link href="/pages/shop">
                        <Button variant="ghost" className="dark:invert">
                          Browse More Products
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        }
      }
      )}
    </div>
  );
}
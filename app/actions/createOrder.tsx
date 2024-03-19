'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useQueryWithAuth } from "@convex-dev/convex-lucia-auth/react";
import { useMutation } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";

export function OrderProduct() {
    const { id }= useParams();
    const router = useRouter();
    const products = useQueryWithAuth(api.myFunctions.getProducts, {})?.products ;
    const orderedproduct = products?.find((product) => product._id === id);
    const user = useQueryWithAuth(api.myFunctions.getUser, {});
    const createOrder = useMutation(api.myFunctions.createOrder);
    
  async function handleOrder(e: any) {
     e.preventDefault();
        await createOrder({
            product: orderedproduct?._id as any,
            quantity: 1,
            user: user?._id as any,
        });
        router.push("/pages/shop");
    }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="top-4 dark:invert" size="icon" variant="outline">
          <FaShoppingCart className="w-4 h-4" />
          <span className="sr-only">Add to cart</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You are about to place an order</AlertDialogTitle>
          <AlertDialogDescription>
                      This action cannot be undone. This will be shown
                      to the seller.
                      The seller will reach out to you to confirm the order.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={
              void  handleOrder
            }
                              >
                                            Continue
                                        </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        );
                      }

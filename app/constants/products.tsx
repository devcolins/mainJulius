'use client';
import { Button } from "@/components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { ProductForm } from "../actions/createProducts";
import { useQueryWithAuth } from "@convex-dev/convex-lucia-auth/react";
import { api } from "@/convex/_generated/api";



export function ProductsTable() {
  const products = useQueryWithAuth(api.myFunctions.getProductsByVendor, {});

  return (
    <div className="flex flex-col w-full min-h-52 ">
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <ProductForm />
      </header>

      <div className="border rounded-lg w-full px-4">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.products.map((product: any) => (
              <TableRow key={product.id}>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="secondary" size="sm">
                      <FileEditIcon />
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm">
                      <TrashIcon />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function FileEditIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
    </svg>
  );
}



function TrashIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

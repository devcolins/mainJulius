//eslint-disable

'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useQueryWithAuth } from "@convex-dev/convex-lucia-auth/react";
import { ScrollArea } from "@/components/ui/scroll-area";


const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().min(2,{
    message: "Please enter a valid email.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  storeName: z.string().min(2, {
    message: "Store name must be at least 2 characters.",
  }),
  storeDescription: z.string().min(10, {
    message: "Store description must be at least 10 characters.",
  }),
  storeAddress: z.string().min(6, {
    message: "Store address must be at least 10 characters.",
  }),
});

export function RegisterVendor() {

  const createVendor = useMutation(api.myFunctions.createVendor || '');
  const user = useQueryWithAuth(api.myFunctions.getUser, {});
 
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: user?.email,
      phone: "",
      storeName: "",
      storeDescription: "",
      storeAddress: "",

    },
  });

  

  async function onSubmit(data: z.infer<typeof FormSchema>): Promise<void> {

    await createVendor({
      name: data.name,
      email: data.email,
      phone: data.phone,
      storeName: data.storeName,
      storeDescription: data.storeDescription,
      storeAddress: data.storeAddress,
    
    })


    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className=" w-full">
      <div>
        <Form {...form}>
          <ScrollArea className="h-96 mt-2 px-4 py-6 md:px-8 lg:px12 rounded-md border">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                void form.handleSubmit(onSubmit)(event);
              }}
              className=" space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your name will be used to identify you.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="venity@support.com"
                        disabled
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Your email will be used to contact you.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+25400000000" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your phone number will be used to contact you.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="storeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My Store" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public store name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="storeDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Description</FormLabel>
                    <FormControl>
                      <Input placeholder="About Store" {...field} />
                    </FormControl>
                    <FormDescription>Tell us about your store.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="storeAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Location</FormLabel>
                    <FormControl>
                      <Input type="address" placeholder="Address" {...field} />
                    </FormControl>
                    <FormDescription>
                      Where is your store located?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </ScrollArea>
        </Form>
      </div>
    </div>
  );
}

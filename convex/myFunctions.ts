import { v } from "convex/values";
import { mutation, action } from "./_generated/server";
import { queryWithAuth } from "@convex-dev/convex-lucia-auth";




//create vendor

export const createVendor = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    storeName: v.string(),
    storeDescription: v.string(),
    storeAddress: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("vendor", {
      name: args.name,
      email: args.email,
      phone: args.phone,
      storeName: args.storeName,
      storeDescription: args.storeDescription,
      storeAddress: args.storeAddress,
    });
    console.log("created  new vendor with your  email");
  },
});


//create a product
export const createProduct = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    price: v.number(),
    quantity: v.number(),
    vendor: v.id("vendor"),
    onSale: v.boolean(),
    imagefile: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("product", {
      title: args.title,
      description: args.description,
      price: args.price,
      quantity: args.quantity,
      vendor: args.vendor,
      onSale: args.onSale,
      imagefile: args.imagefile,
    });
    console.log("Added new Product .");
  },
});


export const createOrder = mutation({
  args: {
    user: v.string(),
    product: v.id("product"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("order", {
      user: args.user,
      product: args.product,
      quantity: args.quantity,
    });
    console.log("Added new Order .");
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});


export const getUser = queryWithAuth({
  args:{},
  handler: async (ctx) => {
    const user = ctx.session?.user;
    if(!user){
      return null;
    }
    return user;
  },
});


export const getVendor = queryWithAuth({
  args:{},
  handler: async (ctx) => {
    const vendor_email = ctx.session?.user.email;
    const vendor = await ctx.db.query("vendor").withIndex('email', (q) => q.eq('email', vendor_email ?? "")).first();
      
    if(!vendor){
      return null;
    }
    return vendor;
  },
});


export const getVendorId = queryWithAuth({
  args: {},
  handler: async (ctx) => {
    const user = ctx.session?.user;
    const VendorId = await ctx.db.query("vendor").withIndex("email", (q) => q.eq('email', user?.email ?? '')).first().then((vendor) => vendor?._id);
  if (VendorId === undefined) {
    throw new Error("Vendor not found");
  }
    
  return {
    vendorId: VendorId,
  };
  }
});

//get all products
export const getProducts = queryWithAuth({
  args:{},
  handler: async (ctx) => {
    const products = await ctx.db.query("product").collect();
    return {
      products: products,
    };
  },
});

export const getProductsByVendor = queryWithAuth({
  args:{},
  handler: async (ctx) => {
    const user = ctx.session?.user;
    const vendor = await ctx.db.query("vendor").withIndex("email", (q) => q.eq('email', user?.email ?? '')).first().then((vendor) => vendor?._id);
    const products = await ctx.db.query("product").withIndex("vendor", (q) => q.eq('vendor', vendor as any)).collect();
    if(!products){
      return null;
    }
    return {
      products: products,
    };
  },
});


export const getOrders = queryWithAuth({
  args:{},
  handler: async (ctx) => {
    return {
      orders: ctx.session?.user,
     
      
    };
  },
});
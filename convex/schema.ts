import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/convex-lucia-auth";
import { v } from "convex/values";

export default defineSchema(
  {
    ...authTables({
      user: {
        email: v.string(),
      },
      session: {},
    }),
    // This definition matches the example query and mutation code:
    numbers: defineTable({
      value: v.number(),
    }),
    vendor: defineTable({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
      storeName: v.string(),
      storeDescription: v.string(),
      storeAddress: v.string(),
    }).index("email", ["email"]),

    product: defineTable({
      title: v.string(),
      description: v.string(),
      price: v.number(),
      quantity: v.number(),
      vendor: v.id("vendor"),
      onSale: v.boolean(),
      imagefile: v.id("_storage"),
    }).index("vendor", ["vendor"]),

    order: defineTable({
      user: v.string(),
      product: v.id("product"),
      quantity: v.number(),
    }).index("user", ["user"]),
  },

  { schemaValidation: true }
);

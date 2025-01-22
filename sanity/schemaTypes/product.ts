import { defineType } from "sanity"

export const product = defineType({
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required().min(2).max(100)
        },
        {
            name: "description",
            type: "text",
            title: "Description",
            validation: (rule) => rule.required().min(10).max(1000)
        },
        {
            name: "productImage",
            type: "image",
            title: "Product Image",
            validation: (rule) => rule.required(),
            options: {
                hotspot: true
            }
        },
        {
            name: "price",
            type: "number",
            title: "Price",
            validation: (rule) => rule.required().positive()
        },
        {
            name: "tags",
            type: "array",
            title: "Tags",
            of: [{ type: "string" }],
            options: {
                layout: 'tags'
            }
        },
        {
            name: "discountPercentage",
            type: "number",
            title: "Discount Percentage",
            validation: (rule) => rule.min(0).max(100)
        },
        {
            name: "isNew",
            type: "boolean",
            title: "New Badge",
            initialValue: false
        },
        {
            name: "slug",
            type: "slug",
            title: "Slug",
            options: {
                source: "title",
                maxLength: 96
            },
            validation: (rule) => rule.required()
        }
    ]
})
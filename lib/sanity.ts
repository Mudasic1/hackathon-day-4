import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { config } from "./sanity.config";

export const client = createClient(config);

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return source?.asset?._ref ? builder.image(source) : builder.image({});
} 
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'm1ru58zb',
  dataset: 'production',
  useCdn: true, // Use CDN for faster reads, set false if you need latest data immediately
  apiVersion: '2024-03-01',
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

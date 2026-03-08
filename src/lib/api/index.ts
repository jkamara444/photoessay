import { albums } from "@/data/albums";

export async function getAlbums() {
  return [...albums].sort((a, b) => a.order - b.order);
}

export async function getAlbum(slug: string) {
  return albums.find((a) => a.slug === slug);
}
import { albums } from "@/data/albums";
import { AlbumList, AlbumSchema } from "@/types/albums";
import { Photo } from "@/types/api";

// Helper function to transform photo data to match Photo type
function transformPhoto(src: string): Photo {
  // For now, use placeholder values for size, width, height
  // In a real app, these would come from the image metadata or API
  return {
    size: 0, // Placeholder
    url: src,
    width: 800, // Placeholder
    height: 600 // Placeholder
  };
}

export async function getAlbums(): Promise<AlbumList> {
  // Transform raw album data to match the expected schema
  const transformedAlbums = albums.map(album => ({
    title: album.title as any, // This will be validated by the schema
    description: album.description || null,
    date: album.date || null,
    lat: album.lat,
    lng: album.lng,
    locations: album.locations || [],
    color: album.color,
    order: album.order,
    type: album.type as "location" | "custom",
    slug: album.slug
  }));

  // Validate and return the transformed albums
  return AlbumSchema.array().parse(transformedAlbums).sort((a, b) => a.order - b.order);
}

export async function getAlbum(slug: string) {
  // Return the raw album data with all properties including a6400 and photoEssay
  return albums.find((a) => a.slug === slug);
}

export async function getFolders() {
  // Extract unique folders from albums based on type or other grouping logic
  // For now, let's group by album type since we don't have explicit folder data
  const folders = albums.reduce((acc, album) => {
    const folderName = album.type === 'location' ? 'Locations' : 'Custom Albums';
    if (!acc.find(f => f.title === folderName)) {
      acc.push({
        title: folderName,
        date: new Date().getFullYear().toString(), // Use current year as date
        slug: folderName.toLowerCase().replace(/\s+/g, '-')
      });
    }
    return acc;
  }, [] as Array<{ title: string; date: string; slug: string }>);

  return folders.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getFolder(name: string) {
  // Find albums that match the folder type
  const folderType = name.toLowerCase().includes('location') ? 'location' : 'custom';
  const folderAlbums = albums.filter(album => album.type === folderType);

  // Get photos from all albums in this folder
  const photos = folderAlbums.flatMap(album => {
    const albumPhotos = [];
    if (album.photos) albumPhotos.push(...album.photos.map((p: any) => transformPhoto(p.src)));
    if (album.a6400) albumPhotos.push(...album.a6400.map((p: any) => transformPhoto(p.src)));
    if (album.photoEssay) albumPhotos.push(...album.photoEssay.map((p: any) => transformPhoto(p.src)));
    return albumPhotos;
  });

  return {
    folder: {
      title: folderType === 'location' ? 'Locations' : 'Custom Albums',
      date: new Date().getFullYear().toString(),
      slug: name
    },
    photos
  };
}

export async function getPhotos(tag: string): Promise<Photo[]> {
  // Get all photos from albums that match the tag
  const filteredAlbums = albums.filter(album =>
    album.title.toLowerCase().includes(tag.toLowerCase()) ||
    album.slug.toLowerCase().includes(tag.toLowerCase())
  );

  return filteredAlbums.flatMap(album => {
    const photos = [];
    if (album.photos) photos.push(...album.photos.map((p: any) => transformPhoto(p.src)));
    if (album.a6400) photos.push(...album.a6400.map((p: any) => transformPhoto(p.src)));
    if (album.photoEssay) photos.push(...album.photoEssay.map((p: any) => transformPhoto(p.src)));
    return photos;
  });
}
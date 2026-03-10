import { getAlbum, getAlbums } from '@/lib/api';
import { titleToSlug } from '@/lib/api/slug';
import AlbumPageClient from './album-page-client';

export async function generateStaticParams() {
  const albums = await getAlbums();
  return albums.map(album => ({ slug: titleToSlug(album.title) }));
}

async function AlbumPage({ params }: { params: { slug: string } }) {
  const albums = await getAlbums();
  const album = await getAlbum(params.slug);

  return <AlbumPageClient albums={albums} album={album} />;
}

export default AlbumPage;
'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import Nav from '@/lib/nav';
import { LocationIcon } from '@/lib/icons/location-icon';
import { TagChip, useTags } from './chip';

const Masonry = dynamic(() => import('@/lib/images/masonry'), {
  ssr: false
});

export default function AlbumPageClient({ albums, album }: any) {
  const [activeSection, setActiveSection] = useState<'a6400' | 'photoEssay'>('a6400');

  const tags = useTags(album);

  const hasSections = album && (album.a6400 || album.photoEssay);

  let photos: any[] = [];

  if (hasSections) {
    photos =
      activeSection === 'a6400'
        ? album?.a6400 || []
        : album?.photoEssay || [];
  } else {
    photos = album?.photos || [];
  }

  return (
    <section className="flex flex-col sm:flex-row sm:my-20" id="top">
      <div className="pt-10 sm:pl-10 sm:pr-20 lg:pl-20 lg:pr-40 space-y-1">
        <Nav albums={albums} title={album?.title || ''} />
      </div>

      <div className="flex flex-col items-start mt-6">
        <div
          className={`rounded-lg bg-gray-100
          mx-auto sm:m-0
          px-5 py-4
          min-w-[calc(100%-16px)] max-w-[600px] sm:min-w-[400px]`}
        >
          <div role="img" className="pointer-events-none text-gray-400">
            <LocationIcon />
          </div>

          <div className="flex items-center justify-between gap-8 mt-4">

            <h1 className="font-normal text-2xl text-gray-600 min-w-32">
              {album?.title}
            </h1>

            {hasSections ? (
              <div className="flex gap-3">

                <button
                  onClick={() => setActiveSection('a6400')}
                  className={`px-4 py-2 rounded-lg text-sm transition ${
                    activeSection === 'a6400'
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  a6400
                </button>

                <button
                  onClick={() => setActiveSection('photoEssay')}
                  className={`px-4 py-2 rounded-lg text-sm transition ${
                    activeSection === 'photoEssay'
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Photo Essay
                </button>

              </div>
            ) : (
              <div className="flex items-end justify-end flex-wrap-reverse gap-2 text-gray-500 text-sm">
                {tags.map((tag: string) => (
                  <TagChip key={tag} tag={tag} />
                ))}
              </div>
            )}

          </div>
        </div>

        <Masonry className="my-12" items={photos} />

        <a
          href="#top"
          className={`pt-6 max-sm:px-2 max-sm:pb-6
          max-sm:text-center max-sm:w-full
          text-gray-400 hover:text-gray-600
          fade-in-delayed`}
        >
          Go to top ↑
        </a>
      </div>
    </section>
  );
}
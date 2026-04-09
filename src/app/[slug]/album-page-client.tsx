'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Nav from '@/lib/nav';
import { LocationIcon } from '@/lib/icons/location-icon';
import { TagChip, useTags } from './chip';

const Masonry = dynamic(() => import('@/lib/images/masonry'), {
    ssr: false
});

// Function to get image dimensions
async function getImageDimensions(src: string): Promise<{ width: number; height: number }> {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            resolve({ width: img.naturalWidth, height: img.naturalHeight });
        };
        img.onerror = () => {
            // Fallback dimensions if image fails to load
            resolve({ width: 400, height: 300 });
        };
        img.src = src;
    });
}

export default function AlbumPageClient({ albums, album }: any) {
    const [activeSection, setActiveSection] = useState<'a6400' | 'photoEssay'>('a6400');
    const [photoItems, setPhotoItems] = useState<any[]>([]);

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

    // Load image dimensions when photos or section changes
    useEffect(() => {
        const loadDimensions = async () => {
            const items = await Promise.all(
                photos.map(async (photo: any) => {
                    const src = photo.src || photo;
                    const dimensions = await getImageDimensions(src);
                    return {
                        size: 0,
                        url: src,
                        width: dimensions.width,
                        height: dimensions.height
                    };
                })
            );
            setPhotoItems(items);
        };

        if (photos.length > 0) {
            loadDimensions();
        } else {
            setPhotoItems([]);
        }
    }, [photos, activeSection]);

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
                                    className={`px-4 py-2 rounded-lg text-sm transition ${activeSection === 'a6400'
                                        ? 'bg-gray-800 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                >
                                    a6400
                                </button>

                                <button
                                    onClick={() => setActiveSection('photoEssay')}
                                    className={`px-4 py-2 rounded-lg text-sm transition ${activeSection === 'photoEssay'
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

                {/* Text section for photo essays */}
                {hasSections && activeSection === 'photoEssay' && (
                    <section className="max-w-4xl py-8 text-left">
                        {album?.slug === 'ghana' ? (
                            <>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    {"When I first arrived in Ghana, I had questions around how people navigate identity within a place shaped by colonial history, globalization, and cultural pride all at once. I was curious about how culture manifests in everyday life and how people balance tradition with ideas of \"progress\" and \"opportunity,\" as they say. As I traveled through the country and began taking photos, a clear theme began to emerge in many of the moments I captured. Again and again, I noticed what felt like a pursuit of whiteness, or more broadly, a pursuit of Americanness. The photos I took document the many subtle and visible ways this aspiration appeared around me."}
                                </p>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    {"One of clearest expressions of this came through idea of what Kwabena described as the \"Ghanaian dream,\" which he explained as desire to "} <strong>japart</strong> {" or leave Ghana to build a life in places like the United States or the United Kingdom. I heard this sentiment frequently. People I met would ask if I could take them back with me to America or tell me about the many attempts they had made to apply for visas. At the same time, these ideas were visible in the public landscape. Billboards and advertisements often positioned American or Western identity as something aspirational. Some of the first photos I took show advertisements for skin bleaching products that promise to bring people physically closer to whiteness. Other billboards promoting higher education show students dressed in Western professional clothing rather than traditional Ghanaian attire like kente cloth, suggesting that professionalism is imagined through an American lens."}
                                </p>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    {"I also began noticing how this pursuit extended beyond appearance and education. There were advertisements encouraging people to polish their English to sound more American and lose their accent, and even everyday products gained credibility when labeled as \"American\" or \"FDA approved.\" Religion reflected similar patterns. Despite Jesus being represented differently across cultures around the world and localized to those regions, the images I saw in Ghana almost always depicted him as white. Even conversations about death reflected this shift. At Transitions, the marketing director explained that Transitions' appeal is people wanting a \"classy\" death. This basically meant a death that avoided the elaborate cultural caskets Ghana is known for. That idea made me question what is considered classy and why expressions of love, artistry, and care rooted in culture might be seen as something to move away from."} <strong>{"Why is it not classy to have a casket made from care that expresses the love you have for your loved one? Is it because classy is set by a Western standard, a standard in which there is a constant stripping of emotion, creativity, and care?"}</strong>
                                </p>
                            </>
                        ) : album?.slug === 'mexico' ? (
                            <>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    {"My photo essay explores different forms of activism across Oaxaca, from movements addressing the treatment of women in Mexico and femicide to messages that speak to how Mexicans are treated as immigrants in the United States. Together, these images show how activism can be both deeply local and globally connected, reflecting struggles that move across borders."}
                                </p>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    {"One piece that really stood out to me was artwork in a thrift store that said, \"F*** law school, I wanna be a Juana.\" It reminded me of what Gustavo explained about how many people feel pressured to abandon their Indigenous practices and ways of life in pursuit of college, economic mobility, and capitalism. In this piece, she's rejecting that path by disparaging law school and instead embracing being a \"Juana,\" a name that represents something much more culturally grounded in Mexico."}
                                </p>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    {"The \"Defend yourself, and learn Spanish\" sign also caught my attention. It immediately made me think of the signs I saw in Accra that encouraged people to learn \"good English.\" In that way, this sign feels resistance toward those kinds of messages and the white supremacy behind them. The sign expresses language as something tied to identity and encourages resistance rather than assimilation."}
                                </p>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    {"Toward the end of my essay, the tone shifts as I focus on the gentrification I observed in Puerto Escondido during my three-day break. The city is filled with modern buildings and Airbnbs along the beach, with constant construction and \"coming soon\" signs signaling even more development. At the same time, there are people who live in these communities, and throughout the day we would see them working on construction sites building the tourist infrastructure."}
                                </p>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    {"Spending time there also made me introspect and reflect on my own role in all of this. As a tourist staying in one of those very Airbnbs, I'm part of the same system that's gentrifying the space. That tension between observing, benefiting from, and questioning these changes became an important motivator behind why I took the images I did and the story they tell."}
                                </p>
                            </>
                        ) : null}
                    </section>
                )}

                <Masonry key={`${activeSection}-${photoItems.length}`} className="my-12" items={photoItems} />

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
'use client';

import Link from 'next/link';
import { AlbumList, AlbumTitle } from '../types/albums';
import React, { useState } from 'react';
import { GlobeIcon, InfoIcon, SocialIcon } from './icons';
import { titleToSlug } from './api/slug';
import { THEME_COLORS } from './colors';

const GlobeLink: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/"
      className={`font-bold block leading-none tracking-tight duration-200 ease-in-out transition-colors`}
      style={{ color: isHovered ? THEME_COLORS.PRIMARY : undefined }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <GlobeIcon />
    </Link>
  );
};

const AlbumLink: React.FC<{
  href: string;
  children: React.ReactNode;
  isActive: boolean;
}> = ({ href, children, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className={isActive ? 'font-bold' : ''}
      style={{ color: !isActive && isHovered ? THEME_COLORS.PRIMARY : undefined }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      prefetch={false}
    >
      {children}
    </Link>
  );
};

export const Nav: React.FC<{
  title?: AlbumTitle;
  albums: AlbumList;
}> = ({ albums, title = '', ...props }) => {
  return (
    <nav className="text-lg max-sm:!text-2xl" {...props}>
      <h1 className="mb-10 max-sm:flex max-sm:justify-center">
        <GlobeLink />
      </h1>

      <ul className="flex flex-col max-sm:items-center max-sm:mb-8 content-start tracking-tight">
        {albums.map(album => {
          const isActive = title.toLowerCase() === album.title.toLowerCase();
          return (
            <li key={album.title} className="max-w-fit">
              <AlbumLink
                href={`/${titleToSlug(album.title)}`}
                isActive={isActive}
              >
                {album.title}
              </AlbumLink>
            </li>
          );
        })}
        {title && (
          <>
            <li className="sm:mt-10 flex gap-1">
              <Link
                href="/about"
                prefetch={false}
                className="flex gap-1 items-center text-2xl sm:leading-5 sm:text-[15px] text-gray-400 hover:text-[rgba(255,69,134,1)]"
              >
                <InfoIcon />
                About
              </Link>
            </li>
            <li className="flex sm:mt-1 gap-1 max-sm:hidden">
              <Link
                href="/about"
                prefetch={false}
                className="flex gap-1 items-center text-2xl sm:leading-5 sm:text-[15px] text-gray-400 hover:text-[rgba(255,69,134,1)]"
              >
                <SocialIcon />
                Socials
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;

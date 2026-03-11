import Link from 'next/link';
import cn from 'classnames';
import { THEME_COLORS } from './colors';

export const ExternalLink: React.FC<{
  children: React.ReactNode;
  href: string;
  className?: string;
}> = ({ href, children, className, ...props }) => {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className={cn('hover:text-[rgba(255,69,134,1)]', className)}
      {...props}
    >
      {children}
    </Link>
  );
};

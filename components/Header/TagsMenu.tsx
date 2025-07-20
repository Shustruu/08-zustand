'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getTags } from '@/lib/api';
import css from './Header.module.css';

export default function TagsMenu() {
  const { data: tags = [] } = useQuery({ queryKey: ['tags'], queryFn: getTags });

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton}>Notes ▾</button>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href="/notes/filter/All" className={css.menuLink}>
            All notes
          </Link>
        </li>
        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

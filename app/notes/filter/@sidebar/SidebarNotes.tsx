import Link from 'next/link';
import { getTags } from '@/lib/api';
import css from './SidebarNotes.module.css';

export default async function SidebarNotes() {
  const tags = await getTags();

  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href="/notes/filter/All" className={css.menuLink}>
          All notes
        </Link>
      </li>

      {tags.map((tag: string) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}


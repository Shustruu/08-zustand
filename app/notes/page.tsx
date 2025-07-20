import NotesClient from '@/components/NotesClient/NotesClient';
import { fetchNotes } from '@/lib/api';

export default async function NotesPage() {
  const data = await fetchNotes('', 1);

  return <NotesClient initialData={data} />;
}

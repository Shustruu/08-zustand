import NotesClient from './Notes.client';
import { getNotes } from '@/lib/api';

export default async function NotesPage() {
  const data = await getNotes('', 1); 

  return <NotesClient initialData={data} />;
}

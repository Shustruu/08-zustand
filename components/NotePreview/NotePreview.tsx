'use client';

import { getSingleNote } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

interface Props {
  id: number;
}

export default function NotePreview({ id }: Props) {
  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getSingleNote(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !note) return <p>Failed to load note</p>;

  return (
    <>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>Tag: {note.tag}</p>
      <p>Created at: {note.createdAt}</p>
    </>
  );
}


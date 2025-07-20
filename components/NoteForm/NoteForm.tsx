'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ChangeEvent, FormEvent } from 'react';
import toast from 'react-hot-toast';

import { useNoteStore } from '@/lib/store/noteStore';
import { createNote } from '@/lib/api';
import type { Draft, NoteStore } from '@/lib/store/noteStore';
import type { Note } from '@/types/note';

import css from './NoteForm.module.css';

interface NoteFormProps {
  onClose?: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const draft = useNoteStore((state: NoteStore) => state.draft);
  const setDraft = useNoteStore((state: NoteStore) => state.setDraft);
  const clearDraft = useNoteStore((state: NoteStore) => state.clearDraft);

  const mutation = useMutation<Note, Error, Draft>({
    mutationFn: (newNote) => createNote(newNote),
    onSuccess: () => {
      toast.success('Note created successfully');
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ['notes'] });

      if (onClose) onClose();
      else router.back();
    },
    onError: () => {
      toast.error('Failed to create note');
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(draft);
  };

  const isLoading = mutation.status === 'pending';

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={draft.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDraft({ title: e.target.value })
          }
          className={css.input}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          value={draft.content}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setDraft({ content: e.target.value })
          }
          className={css.textarea}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          value={draft.tag}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setDraft({ tag: e.target.value as Draft['tag'] })
          }
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => (onClose ? onClose() : router.back())}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
}

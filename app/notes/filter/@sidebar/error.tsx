'use client';

export default function FilterSlugError({ error }: { error: Error }) {
  return (
    <div>
      <h2>Oops, error loading filtered notes</h2>
      <p>{error.message}</p>
    </div>
  );
}

import { db } from "@/db";
import Link from "next/link";
import type { Snippet } from "@prisma/client";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderedSnippets = snippets.map((snip : Snippet) => {
    return (
      <Link
        key={snip.id}
        className="flex justify-between items-center p-2 border rounded"
        href={`/snippets/${snip.id}`}
      >
        <div>{snip.title}</div>
        <div>View</div>
      </Link>
    );
  });

  return (
    <div>
      <div className="flex flex-row justify-between p-2">
        <h1 className="text-xl font-bold">Snippets</h1>
        <Link href="/snippets/new" className="border p-2 rounded">
          New
        </Link>
      </div>

      <div className="flex flex-col gap-2">{renderedSnippets}</div>
    </div>
  );
}

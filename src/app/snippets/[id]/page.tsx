import { db } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";

interface SnippetShowPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  await new Promise((r) => setTimeout(r, 2000));

  const snippetId = parseInt(props.params.id, 10);

  const snippet = await db.snippet.findFirst({
    where: { id: snippetId },
  });

  if (!snippet) {
    return notFound();
  }

  return (
    <div>
      <div>
        <div className="flex m-4 justify-between items-center">
          <h1 className="text-xl font-bold">{snippet.title}</h1>
          <div className="flex gap-4">
            <Link href={`/snippets/${snippet.id}/edit`} className="p-2 border rounded">Edit</Link>
            <button className="p-2 border rounded">Delete</button>
          </div>
        </div>
      </div>
      <pre className="p-3 border roudned bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

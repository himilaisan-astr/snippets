// this needs to be a server action
"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";

export async function createSnippet(formData: FormData) {
  // check the user's input and make sure they're valid
  const title = formData.get("title") as string;
  const code = formData.get("code") as string;

  // createa new record in the database
  const snippet = await db.snippet.create({
    data: {
      title,
      code,
    },
  });
  console.log(snippet);

  // redirect the user back to the root route
  redirect("/");
}

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });

  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id:number) {
  await db.snippet.delete({
    where: {id}
  })

  redirect('/')
}

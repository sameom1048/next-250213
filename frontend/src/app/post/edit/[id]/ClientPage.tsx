"use client";

import { components } from "@/lib/backend/apiV1/schema";
import client from "@/lib/backend/client";
import { useRouter } from "next/navigation";

export default function ClientPage({
  post,
}: {
  post: components["schemas"]["PostWithContentDto"];
}) {
  const router = useRouter();

  async function edit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const title = form._title.value;
    const content = form.content.value;
    const published = form.published.checked;
    const listed = form.listed.checked;

    if (title.trim().length == 0) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (content.trim().length == 0) {
      alert("내용을 입력해주세요.");
      return;
    }

    const response = await client.PUT("/api/v1/posts/{id}", {
      body: {
        title,
        content,
        published,
        listed,
      },
      credentials: "include",
      params: {
        path: {
          id: post.id,
        },
      },
    });

    if (response.error) {
      alert(response.error.msg);
      return;
    }

    router.push(`/post/${post.id}`);
    // window.location.href = "/post/list";
  }

  return (
    <>
      <form onSubmit={edit} className="flex flex-col w-1/5 gap-3">
        <input
          type="text"
          name="_title"
          placeholder="제목"
          defaultValue={post.title}
          className="border-2 border-black"
        />
        <textarea
          name="content"
          placeholder="내용 작성"
          defaultValue={post.content}
          className="border-2 border-black"
        />
        <div className="flex gap-3">
          <label>공개 여부 : </label>
          <input
            type="checkbox"
            name="published"
            defaultChecked={post.published}
          />
        </div>
        <div className="flex gap-3">
          <label>검색 여부 : </label>
          <input type="checkbox" name="listed" defaultChecked={post.listed} />
        </div>

        <input type="submit" value="등록" />
      </form>
    </>
  );
}

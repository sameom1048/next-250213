"use client";

import client from "@/lib/backend/client";
import { useRouter } from "next/navigation";

export default function ClientPage() {
  const router = useRouter();

  async function write(e: React.FormEvent<HTMLFormElement>) {
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

    const response = await client.POST("/api/v1/posts", {
      body: {
        title,
        content,
        published,
        listed,
      },
      credentials: "include",
    });

    if (response.error) {
      alert(response.error.msg);
      return;
    }

    const post = response.data.data;

    router.push(`/post/${post.id}`);
    // window.location.href = "/post/list";
  }

  return (
    <>
      <form onSubmit={write} className="flex flex-col w-1/5 gap-3">
        <input
          type="text"
          name="_title"
          placeholder="제목"
          className="border-2 border-black"
        />
        <textarea
          name="content"
          placeholder="내용 작성"
          className="border-2 border-black"
        />
        <div className="flex gap-3">
          <label>공개 여부 : </label>
          <input type="checkbox" name="published" />
        </div>
        <div className="flex gap-3">
          <label>검색 여부 : </label>
          <input type="checkbox" name="listed" />
        </div>

        <input type="submit" value="등록" />
      </form>
    </>
  );
}

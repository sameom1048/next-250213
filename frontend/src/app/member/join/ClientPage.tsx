"use client";

import client from "@/lib/backend/client";
import { useRouter } from "next/navigation";

export default function ClientPage() {
  const router = useRouter();

  async function join(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const username = form.username.value;
    const password = form.password.value;
    const nickname = form.nickname.value;

    if (username.trim().length == 0) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (password.trim().length == 0) {
      alert("내용을 입력해주세요.");
      return;
    }

    if (nickname.trim().length == 0) {
      alert("내용을 입력해주세요.");
      return;
    }

    const response = await client.POST("/api/v1/members/join", {
      body: {
        username,
        password,
        nickname,
      },
      credentials: "include",
    });

    if (response.error) {
      alert(response.error.msg);
      return;
    }

    router.push(`/member/login`);
    // window.location.href = "/post/list";
  }

  return (
    <>
      <div>회원가입 페이지</div>

      <form onSubmit={join} className="flex flex-col w-1/5 gap-3">
        <input
          type="text"
          name="username"
          placeholder="아이디 입력"
          className="border-2 border-black"
        />
        <input
          type="password"
          name="password"
          placeholder="패스워드 입력"
          className="border-2 border-black"
        />
        <input
          type="text"
          name="nickname"
          placeholder="닉네임 입력"
          className="border-2 border-black"
        />
        <input type="submit" value="가입" />
      </form>
    </>
  );
}

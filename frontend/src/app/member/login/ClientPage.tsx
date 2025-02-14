"use client";

import client from "@/lib/backend/client";
import { useRouter } from "next/navigation";

export default function ClientPage() {
  const router = useRouter();

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const username = form.username.value;
    const password = form.password.value;

    const response = await client.POST("/api/v1/members/login", {
      body: {
        username,
        password,
      },
      credentials: "include",
    });

    if (response.error) {
      alert(response.error.msg);
      return;
    }

    router.push(`/post/list`);
  }

  return (
    <>
      <div>로그인 페이지</div>

      <form onSubmit={login} className="flex flex-col w-1/5 gap-3">
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
        <input type="submit" value="로그인" />
      </form>
    </>
  );
}

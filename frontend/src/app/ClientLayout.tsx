"use client";

import { components } from "@/lib/backend/apiV1/schema";
import client from "@/lib/backend/client";
import Link from "next/link";

export default function ClinetLayout({
  children,
  me,
}: Readonly<{
  children: React.ReactNode;
  me: components["schemas"]["MemberDto"];
}>) {
  const isLogined = me.id !== 0;

  return (
    <html lang="en">
      <body className="bg-blue-300 min-h-[100dvh] flex flex-col mx-20 my-4">
        <header className="flex gap-3">
          <Link href="/">메인</Link>
          <Link href="/about">소개</Link>
          {<Link href="/post/list">글 목록</Link>}
          {!isLogined && <Link href="/member/login">로그인</Link>}
          {isLogined && (
            <Link
              href=""
              onClick={async (e) => {
                e.preventDefault();
                const response = await client.DELETE("/api/v1/members/logout", {
                  credentials: "include",
                });

                if (response.error) {
                  alert(response.error.msg);
                  return;
                }

                // router.push(`/post/list`);
                window.location.href = "/post/list";
              }}
            >
              로그아웃
            </Link>
          )}
          {isLogined && <Link href="/member/me">내정보</Link>}
        </header>
        <div className="bg-blue-200 flex-grow">{children}</div>
        <footer className="bg-green-200">푸터</footer>
      </body>
    </html>
  );
}

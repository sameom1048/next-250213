"use client";

import Link from "next/link";

export default function ClinetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-blue-300 min-h-[100dvh] flex flex-col mx-20 my-4">
        <header className="flex gap-3">
          <Link href="/">메인</Link>
          <Link href="/about">소개</Link>
          <Link href="/post/list">글 목록</Link>
          <Link href="/member/login">로그인</Link>
          <Link href="/member/me">내정보</Link>
        </header>
        <div className="bg-blue-200 flex-grow">{children}</div>
        <footer className="bg-green-200">푸터</footer>
      </body>
    </html>
  );
}

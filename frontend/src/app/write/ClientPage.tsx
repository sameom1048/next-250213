"use client";

export default function ClientPage() {
  async function write(e: React.FormEvent<HTMLFormElement>) {}

  return (
    <>
      <form onSubmit={write} className="flex flex-col w-1/5 gap-3">
        <input
          type="text"
          name="title"
          placeholder="제목"
          className="border-2 border-black"
        />
        <textarea
          name="content"
          placeholder="내용 작성"
          className="border-2 border-black"
        />
        <input type="submit" value="등록" />
      </form>
    </>
  );
}

import { components } from "@/src/lib/backend/apiV1/schema";

type PostDto = components["schemas"]["PostDto"];

type PostItemPageDto = components["schemas"]["PageDto"];

export default async function Page() {
  // api 호출

  const response = await fetch("http://localhost:8080/api/v1/posts");

  if (!response.ok) {
    throw new Error("error");
  }

  const rsData = await response.json();

  const pageDto: PostItemPageDto = rsData.data;

  return (
    <div>
      <h1>글 목록 page</h1>

      <div>응답 코드 : {rsData.code}</div>
      <div>결과 메세지 : {rsData.msg}</div>

      <div>totalPages : {pageDto.totalPages}</div>
      <div>totalItems : {pageDto.totalItems}</div>
      <div>currentPageNo : {pageDto.currentPageNo}</div>
      <div>pageSize : {pageDto.pageSize}</div>

      <hr />
      <ul>
        {pageDto.items.map((item: PostDto) => {
          return (
            <li className="border-2 border-pink-500 my-2 p-2" key={item.id}>
              <div>id : {item.id}</div>
              <div>title : {item.title}</div>
              <div>authorId :{item.authorId}</div>
              <div>authorName:{item.authorName}</div>
              <div>published: {`${item.published}`}</div>
              <div>listed:{`${item.listed}`}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

"use client";

import { components } from "@/lib/backend/apiV1/schema";

export default function ClientPage({
  me,
}: {
  me: components["schemas"]["MemberDto"];
}) {
  return (
    <>
      <div>내 정보 페이지</div>
      <div>번호 : {me.id}</div>
      <div>Name : {me.nickname}</div>
      {/* <div>createdDate : {me.createdDate}</div>
      <div>modifiedDate : {me.modifiedDate}</div> */}
    </>
  );
}

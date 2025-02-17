import { cookies } from "next/headers";
import ClientPage from "./ClientPage";
import client from "@/lib/backend/client";

export default async function Page({
  params,
}: {
  params: {
    id: number;
  };
}) {
  const { id } = await params;

  const response = await client.GET("/api/v1/posts/{id}", {
    params: {
      path: {
        id,
      },
    },
    headers: {
      cookie: (await cookies()).toString(),
    },
  });

  if (response.error) {
    return <div>{response.error.msg}</div>;
  }

  const fetchMe = await client.GET("/api/v1/members/me", {
    headers: {
      cookie: (await cookies()).toString(),
    },
  });

  if (fetchMe.error) {
    alert(fetchMe.error.msg);
    return;
  }

  const post = response.data.data;
  const me = fetchMe.data.data;

  return <ClientPage post={post} me={me} />;
}

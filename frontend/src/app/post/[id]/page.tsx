import ClientPage from "./ClientPage";
import client from "@/lib/backend/client";

export default async function Page({
  params,
}: {
  params: {
    id: number;
  };
}) {
  const id = await params.id;

  const response = await client.GET("/api/v1/posts/{id}", {
    params: {
      path: {
        id,
      },
    },
  });

  if (response.error) {
    return <div>{response.error.msg}</div>;
  }

  const rsData = response.data;

  const post = rsData.data;

  return <ClientPage post={post} />;
}

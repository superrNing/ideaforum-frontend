"use client";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { idea } from "@/app/api/ideas";

export default function Page() {
  const params = useSearchParams();
  const idea_id = params?.get("idea_id");
  console.log(idea_id, "idea_id");

  // const { id, name } = router.query;
  const { data, refetch } = useQuery({
    queryKey: ["ideas", idea_id],
    queryFn: () => {
      return idea({ idea_id });
    },
  });
  const ideaDetail = data?.data ?? {};
  console.log(data);

  return (
    <>
      <p>detail Page</p>
      <div>{ideaDetail.description}</div>
    </>
  );
}

import request from "@/app/utils/request";

// list
export const comments = async (params?: any) => {
  const base_url = "/api/idea_comments";
  const res = await request.get(base_url, { params });
  return res;
};

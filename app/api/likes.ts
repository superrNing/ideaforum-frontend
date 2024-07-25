import request from "@/app/utils/request";

// list
export const likes = async (params?: any) => {
  const base_url = "/api/idea_likes";
  const res = await request.get(base_url, { params });
  return res;
};

import request from "@/app/utils/request";

// list
export const likes = async (params?: any) => {
  const base_url = "/api/idea_likes";
  const res = await request.get(base_url, { params });
  return res;
};

// add like
export const addLike = async (params?: any) => {
  const base_url = "/api/likes";
  const res = await request.post(base_url, params);
  return res;
};

// remove like
export const deleteLike = async (params?: any) => {
  const base_url = "/api/likes";
  const res = await request.delete(base_url, { params });
  return res;
};

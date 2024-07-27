import request from "@/app/utils/request";

// list
export const comments = async (params?: any) => {
  const base_url = "/api/idea_comments";
  const res = await request.get(base_url, { params });
  return res;
};

export const addComment = async (params?: any) => {
  const base_url = "/api/comments";
  const res = await request.post(base_url, params);
  return res;
};

// remove idea
export const deleteComment = async (params?: any) => {
  const base_url = "/api/comments";
  const res = await request.delete(base_url, { params });
  return res;
};

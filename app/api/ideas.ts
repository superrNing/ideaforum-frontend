import request from "@/app/utils/request";

export type IdeaParams = {
  title: string;
  description: string;
  user_id: number;
};

// list
export const ideas = async (params?: any) => {
  const base_url = "/api/ideas";
  const res = await request.get(base_url, { params });
  return res;
};

// detail
export const idea = async (params?: any) => {
  const base_url = "/api/idea_detail";
  console.log("paramsparams", params);
  const res = await request.get(base_url, { params });
  return res;
};

// create
export const addIdea = async (params?: any) => {
  const base_url = "/api/ideas";
  const res = await request.post(base_url, params);
  return res;
};

// updateIdea
export const updateIdea = async (params?: any) => {
  const base_url = "/api/ideas";
  const res = await request.put(base_url, params);
  return res;
};

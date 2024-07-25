import request from "@/app/utils/request";

// list
export const ideas = async (params?: any) => {
  const base_url = "/api/ideas";
  const res = await request.get(base_url, params);
  return res;
};

// detail
export const idea = async (params?: any) => {
  const base_url = "/api/idea_detail";
  console.log("paramsparams", params);
  const res = await request.get(base_url, { params });
  return res;
};

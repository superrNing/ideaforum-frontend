import request from "@/app/utils/request";
// 创建用户
export type CreateUserParams = {
  email: string;
  password: string;
  name: string;
};

export type UserLoginParams = {
  email: string;
  password: string;
};

export const userLogin = async (params: UserLoginParams) => {
  const base_url = "/login";
  const res = await request.post(base_url, params);
  return res;
};

export const createUser = async (params: CreateUserParams) => {
  const base_url = "";
  const res = await request.post(base_url, params);
  return res;
};

// export const updateUser = async (params) => {
//   const base_url = "";
//   const res = (await request) / put(base_url, params);
//   return res;
// };

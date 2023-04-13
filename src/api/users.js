import { URL } from "@/api/url";
export const getUsers = () => {
  return fetch(`${URL}/users`);
};

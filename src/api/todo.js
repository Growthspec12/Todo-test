import {URL} from "@/api/url";

export const getTodos = () => {
  return fetch(`${URL}/todos`)
}

export const createTodo = (todoData) => {
  return fetch(`${URL}/todos`, {
    method: "POST",
    data: todoData
  })
}

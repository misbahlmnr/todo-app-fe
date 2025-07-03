import { axiosInstance } from "../utils";

export type Todo = {
  id: string;
  title: string;
  description: string;
  archived: boolean;
};

const TodosAPI = {
  getAllTodos: () => axiosInstance.get("/todo"),
  getTodoById: (id: string) => axiosInstance.get(`/todo/${id}`),
  createTodo: (data: Omit<Todo, "id">) => axiosInstance.post("/todo", data),
  updateTodo: (id: string, data: Todo) =>
    axiosInstance.put(`/todo/${id}`, data),
  deleteTodo: (id: string) => axiosInstance.delete(`/todo/${id}`),
  deleteAllTodos: () => axiosInstance.delete("/todo"),
};

export default TodosAPI;

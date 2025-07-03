import { useMutation, useQuery } from "@tanstack/react-query";
import TodosAPI, { type Todo } from "../api/todos";
import { queryClient } from "../main";

export const useGetAllTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: TodosAPI.getAllTodos,
  });
};

export const useGetTodoById = (id: string) => {
  return useQuery({
    queryKey: ["todo", id],
    queryFn: () => TodosAPI.getTodoById(id),
  });
};

export const useCreateTodo = () => {
  return useMutation({
    mutationFn: (data: Omit<Todo, "id">) => TodosAPI.createTodo(data),
    onSuccess: () => {
      // invalidate cache for refetch todos
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useUpdateTodo = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Todo }) =>
      TodosAPI.updateTodo(id, data),
    onSuccess: () => {
      // invalidate cache for refetch todos
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useDeleteTodo = () => {
  return useMutation({
    mutationFn: (id: string) => TodosAPI.deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useDeleteAllTodos = () => {
  return useMutation({
    mutationFn: () => TodosAPI.deleteAllTodos(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

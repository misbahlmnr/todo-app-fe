import { describe, it, expect, vi, beforeEach } from "vitest";
import { axiosInstance } from "../../utils";
import TodosAPI from "../../api/todos";

vi.mock("../utils", () => ({
  axiosInstance: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("Todo API Test", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call GET /todo endpoint", () => {
    TodosAPI.getAllTodos();
    expect(axiosInstance.get).toHaveBeenCalledWith("/todo");
  });

  it("should call GET /todo/:id endpoint", () => {
    const id = "1";
    TodosAPI.getTodoById(id);
    expect(axiosInstance.get).toHaveBeenCalledWith(`/todo/${id}`);
  });

  it("chould call POST /todo endpoint", () => {
    const data = { title: "test", description: "test", archived: false };
    TodosAPI.createTodo(data);
    expect(axiosInstance.post).toHaveBeenCalledWith("/todo", data);
  });

  it("should call PUT /todo/:id endpoint", () => {
    const id = "1";
    const data = { title: "test", description: "test", archived: false };
    TodosAPI.updateTodo(id, data);
    expect(axiosInstance.put).toHaveBeenCalledWith(`/todo/${id}`, data);
  });

  it("should call DELETE /todo/:id endpoint", () => {
    const id = "1";
    TodosAPI.deleteTodo(id);
    expect(axiosInstance.delete).toHaveBeenCalledWith(`/todo/${id}`);
  });
});

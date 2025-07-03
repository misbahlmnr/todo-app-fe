import AppLayout from "../components/AppLayout";
import FilterIcon from "../assets/filter.svg";
import FormTodo from "../components/FormTodo";
import TodoItem from "../components/TodoItem";
import {
  useDeleteAllTodos,
  useDeleteTodo,
  useGetAllTodos,
  useUpdateTodo,
} from "../hooks/todoHooks";
import { FaCircleNotch } from "react-icons/fa6";
import type { Todo } from "../api/todos";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { cn } from "../utils";

const Dashboard = () => {
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [deletingTodoId, setDeletingTodoId] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const filterDropdownRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useGetAllTodos();
  const todoItems = data?.data.data;

  const deleteAllTodosMutation = useDeleteAllTodos();
  const deleteMutation = useDeleteTodo();
  const editMutation = useUpdateTodo();

  const handleEdit = (id: string, data: Todo) => {
    setEditingTodoId(id);
    editMutation.mutate(
      { id, data },
      {
        onSuccess: (res) => {
          toast(res.data.message, { type: "success" });
          setEditingTodoId(null);
        },
        onError: (err) => {
          setEditingTodoId(null);
          console.log(err);
        },
      }
    );
  };

  const handleDelete = (id: string) => {
    setDeletingTodoId(id);
    deleteMutation.mutate(id, {
      onSuccess: (res) => {
        toast(res.data.message, { type: "success" });
        setDeletingTodoId(null);
      },
      onError: (err) => {
        setDeletingTodoId(null);

        console.log(err);
      },
    });
  };

  const handleDeleteAllTodos = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <h1 className="font-semibold text-gray-950">Are you sure?</h1>
          <p className="text-textcolor text-xs">All todos will be deleted</p>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => {
                deleteAllTodosMutation.mutate(undefined, {
                  onSuccess: (res) => {
                    toast(res.data.message, { type: "success" });
                  },
                  onError: (err) => {
                    console.log(err);
                  },
                });
                closeToast();
              }}
              className="px-2 py-1 bg-red-500 text-white rounded cursor-pointer"
            >
              Yes
            </button>
            <button
              onClick={closeToast}
              className="px-2 py-1 bg-gray-300 rounded cursor-pointer"
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  const handleFilter = (filter: string) => {
    setFilter(filter);
  };

  const optionFilterItems = ["all", "complete", "incomplete"];

  const filteredTodoItems = todoItems?.filter((todo: Todo) => {
    if (filter === "all") return todo;
    if (filter === "complete") return todo.archived;
    if (filter === "incomplete") return !todo.archived;
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(e.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <AppLayout>
      <div className="md:max-w-[441px] w-full h-auto bg-white rounded-[20px] p-5">
        <h3 className="text-base font-semibold mb-2">Add todo</h3>

        <FormTodo />

        <div className="border border-[#EEEEEE] mt-5 rounded-[10px]" />

        <div className="mt-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Todo list</h3>

            <div className="relative">
              <button
                title="Filter todo"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="p-2 bg-[#F4EBD3] rounded-full text-xs text-white cursor-pointer"
              >
                <img src={FilterIcon} alt="" />
              </button>

              <div
                ref={filterDropdownRef}
                className={cn(
                  "absolute min-w-[131px] w-full bg-white rounded-lg flex flex-col justify-between shadow-lg z-10 transition-all duration-200 ease-in-out text-xs p-3 right-0",
                  {
                    "opacity-100 scale-100 pointer-events-auto": isFilterOpen,
                    "opacity-0 scale-95 pointer-events-none": !isFilterOpen,
                  }
                )}
              >
                <h4 className="text-xs font-semibold text-gray-900 mb-3">
                  Filter todos
                </h4>
                <ul className="text-textcolor flex flex-col gap-[5px] text-center">
                  {optionFilterItems.map((item) => (
                    <li
                      className={cn(
                        "p-1.5 hover:bg-gray-100 rounded-md transition-all duration-200 ease-in-out",
                        { "bg-gray-100": item === filter }
                      )}
                    >
                      <button
                        className="capitalize cursor-pointer"
                        onClick={() => handleFilter(item)}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-5 min-h-[300px] max-h-[400px] overflow-y-auto">
            {isLoading && <FaCircleNotch className="text-white animate-spin" />}
            {!isLoading && filteredTodoItems.length !== 0 ? (
              filteredTodoItems.map((todo: Todo) => {
                return (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    isLoadingEdit={editingTodoId === todo.id}
                    isLoadingDelete={deletingTodoId === todo.id}
                  />
                );
              })
            ) : (
              <p className="text-sm text-textcolor">No todo found</p>
            )}
          </div>

          <div className="border border-[#EEEEEE] mt-5 mb-2 rounded-[10px]" />

          <div className="flex items-center justify-between">
            <p className="text-xs text-textcolor">
              {filteredTodoItems?.length} items total
            </p>
            <button
              title="Delete all todo"
              onClick={handleDeleteAllTodos}
              className="text-xs text-red-500 p-2 hover:bg-gray-50 cursor-pointer rounded-[10px]"
            >
              Delete all
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;

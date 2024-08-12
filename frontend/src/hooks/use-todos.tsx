import { create } from "zustand";
import { Todo } from "@/types";
import { getTodos, createTodo, updateTodo, deleteTodo } from "@/app/services/actions/todo";

interface TodoStore {
  todos: Todo[],
  getTodos: () => void,
  createTodo: (title: string) => void,
  deleteTodo: (id: number) => void,
  updateTodo: (todo: Todo) => void,
  setTodos: (todos: Todo[]) => void
}

export const useTodos = create<TodoStore>((set) => ({
  todos: [],
  getTodos: async () => {
    const response = await getTodos();
    set({ todos: response });
  },
  createTodo: async (title: string) => {
    const response = await createTodo(title);
    set({ todos: response });
  },
  updateTodo: async (todo: Todo) => {
    const response = await updateTodo(todo);
    set({ todos: response });
  },
  deleteTodo: async (id: number) => {
    const response = await deleteTodo(id.toString());
    set({ todos: response });
  },
  setTodos: (todos) => set({ todos }),
}))
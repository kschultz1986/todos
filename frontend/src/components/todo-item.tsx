"use client"

import { Todo } from "@/types";
import { Button } from "./ui/button";
import { Check, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { useTodos } from "@/hooks/use-todos";
import { AlertModal } from "./alert-modal";
import { useSelectedTodo } from "@/hooks/use-selected-todo";
import { useTodoModal } from "@/hooks/use-todo-modal";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface TodoItemProps {
  todo: Todo
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const updateTodo = useTodos((state) => state.updateTodo);
  const deleteTodo = useTodos((state) => state.deleteTodo);
  const [completed, setCompleted] = useState(false);
  const setTodo = useSelectedTodo((state: any) => state.setTodo);
  const todoModal = useTodoModal();

  const onDeleteTodo = async (todoId: number) => {
    try {
      setLoading(true)
      deleteTodo(todoId);
      toast.success("Todo Deleted")
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  const handleChange = (newTodo: Todo) => {

    const updatedTodo = {
      id: newTodo.id,
      title: newTodo.title,
      completed: !newTodo.completed
    }
    updateTodo(updatedTodo);

    setCompleted((prev) => !prev)
    if (todo.completed) {
      toast.success("Todo set to Not Completed")
    } else {
      toast.success("Todo set to Completed")
    }

  }

  return (
    <>
      <AlertModal
        open={open}
        onClose={() => setOpen(false)}
        disabled={loading}
        onConfirm={() => onDeleteTodo(todo.id)}
      />
      <div
        className={cn(
          "flex  gap-2 bg-white p-4 rounded-md border",
          todo.completed && "bg-teal-50"
        )}
      >
        <Button
          onClick={() => handleChange(todo)}
          size="icon"
          variant="outline"
          className={cn(
            todo.completed &&
              "bg-teal-500 text-white hover:bg-teal-600 hover:text-white"
          )}
        >
          <Check className="w-4 h-4" />
        </Button>
        <div>
          <h4
            className={cn(
              "text-xl font-semibold tracking-tight",
              todo.completed && "line-through"
            )}
          >
            {todo.title}
          </h4>
        </div>
        <div className="flex flex-col gap-2 ml-auto">
          <Button
            onClick={() => setOpen(true)}
            variant="destructive"
            size="icon"
          >
            <Trash className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => {
              setTodo(todo)
              todoModal.onOpen()
            }}
            variant="outline"
            size="icon"
          >
            <Pencil className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </>
  )
}
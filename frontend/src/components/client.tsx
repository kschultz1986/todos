"use client"

import { useTodoModal } from "@/hooks/use-todo-modal";
import { Button } from "./ui/button";

export const TodoClient = () => {

  const todoModal = useTodoModal();
  
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-semibold tracking-tighter">
        Todo List
      </h1>
      <Button
        onClick={() => {
          todoModal.onOpen()
        }}
      >
        Add Todo
      </Button>
    </div>
  )
}
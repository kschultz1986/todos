"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTodoModal } from "@/hooks/use-todo-modal";
import { useTodos } from "@/hooks/use-todos";
import { Todo } from "@/types";
import { Modal } from "@/components/ui/modal";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSelectedTodo } from "@/hooks/use-selected-todo";
import { useEffect } from "react";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(1, "Title is required")
})

interface AddTodoFormProps {
  initialData: Todo | null
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ initialData }) => {

  const todoModal = useTodoModal()
  const createTodo = useTodos((state) => state.createTodo);
  const updateTodo = useTodos((state) => state.updateTodo);
  const setTodo = useSelectedTodo((state) => state.setTodo);
  const selectedTodo = useSelectedTodo((state) => state.todo);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || ""
    },
  })

  const { isSubmitting, isValid } = form.formState;

  const title = initialData ? "Update Todo" : "Create Todo";
  const description = initialData
    ? "update todo with form"
    : "Enter title of the Todo";
  const toastMessage = initialData ? "Todo Updated" : "Todo Created";
  const action = initialData ? "Update" : "Create";

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    if (initialData) {

      const updatedTodo = {
        id: initialData.id,
        title: values.title,
        completed: initialData.completed
      };

      updateTodo(updatedTodo);

      todoModal.onClose()
      setTodo(null)

    } else {
      createTodo(values.title);
      form.reset();
      todoModal.onClose();
    }
    toast.success(toastMessage);
  }

  useEffect(() => {
    if (selectedTodo === null) {
      form.setValue("title", "")
    } else if (initialData !== null) {
      form.setValue("title", initialData?.title)
    }
  }, [selectedTodo, form, initialData])

  return (
    <Modal
      isOpen={todoModal.isOpen}
      title={title}
      onClose={todoModal.onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <Label>Title</Label>
                <FormControl>
                  <Input placeholder="Todo Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full justify-end flex gap-x-2">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={todoModal.onClose}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || !isValid}>
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  )
}

export { AddTodoForm }
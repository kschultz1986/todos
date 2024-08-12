"use server"

import { Todo } from "@/types";
 
export async function getTodos() {
  const response = await fetch(`http://127.0.0.1:3030/todos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const result = await response.json();
  return result;
}

export async function createTodo(title: string) {
  const response = await fetch(`http://127.0.0.1:3030/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: title })
  });
  const result = await response.json();
  return result;
}

export async function updateTodo(todo: Todo) {
  const { id } = todo;
  const response = await fetch(`http://127.0.0.1:3030/todos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo)
  });
  const result = await response.json();
  return result;
}

export async function deleteTodo(id: string) {
  const response = await fetch(`http://127.0.0.1:3030/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const result = await response.json();
  return result;
}
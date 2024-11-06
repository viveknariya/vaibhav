export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  email: string;
  isActive: boolean;
  todoCount: number;
  todos?: Todo[]; // Array of To-Do items for the user (optional)
}

// src/app/models/todo.model.ts
export interface Todo {
  id: number;
  title: string;
  dueOn: Date;
  isCompleted: boolean;
}

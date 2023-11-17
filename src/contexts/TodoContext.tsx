"use client";
import { Todo } from "@/types/todo";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface TodoContextProviderProps {
  todosSelecionados: Todo[];
  setTodosSelecionados: Dispatch<SetStateAction<Todo[]>>;
}

const TodoSelecionadosContext = createContext<TodoContextProviderProps>(
  {} as TodoContextProviderProps
);

export const TodosContextProvider = ({ children }: { children: ReactNode }) => {
  const [todosSelecionados, setTodosSelecionados] = useState<Todo[]>([]);
  return (
    <TodoSelecionadosContext.Provider
      value={{ todosSelecionados, setTodosSelecionados }}
    >
      {children}
    </TodoSelecionadosContext.Provider>
  );
};

export const useTodoContext = () => {
  const todoContext = useContext(TodoSelecionadosContext);

  if (todoContext === undefined)
    throw new Error(
      "TodoContext só pode ser usado dentro de TodosContextProvider"
    );

  return todoContext;
};

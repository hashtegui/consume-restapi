import { TodosContextProvider } from "@/contexts/TodoContext";
import { ReactNode } from 'react';

export default function TodoLayout({ children }: { children: ReactNode }) {
  return <TodosContextProvider>{children}</TodosContextProvider>;
}

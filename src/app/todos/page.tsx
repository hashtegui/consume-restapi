"use client";

import { TodosContextProvider, useTodoContext } from "@/contexts/TodoContext";
import { Todo } from "@/types/todo";
import { Button, Container, Table } from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProdutoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { todosSelecionados, setTodosSelecionados } = useTodoContext();

  useEffect(() => {
    const buscarTodos = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );

      if (!response.ok) {
        return;
      }

      const dados = (await response.json()) as Todo[];
      setTodos(dados);
    };
    buscarTodos();
  }, []);

  const handleClickButton = (id: number) => {
    const todo = todosSelecionados.find((t) => t.id === id);

    if (!todo) {
      const todoSelecionado = todos.find((t) => t.id === id) as Todo;
      setTodosSelecionados((todos) => [...todos, todoSelecionado]);
    } else {
      setTodosSelecionados((todos) => [...todos.filter((t) => t.id !== id)]);
    }
  };

  return (
    <TodosContextProvider>
      <Container size={800}>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Id</Table.Th>
              <Table.Th>User</Table.Th>
              <Table.Th>Username</Table.Th>
              <Table.Th>email</Table.Th>
              <Table.Th>Ações</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {todos.map((todo) => (
              <Table.Tr>
                <Table.Td>
                  <Link href={`/todos/${todo.id}`}>{todo.id}</Link>
                </Table.Td>
                <Table.Td>{todo.userId}</Table.Td>
                <Table.Td>{todo.title}</Table.Td>
                <Table.Td>{todo.completed}</Table.Td>
                <Table.Td>
                  {todosSelecionados.find((i) => i.id === todo.id) ? (
                    <Button
                      color="red"
                      onClick={() => handleClickButton(todo.id)}
                    >
                      {" "}
                      Remover{" "}
                    </Button>
                  ) : (
                    <Button
                      color="blue"
                      onClick={() => handleClickButton(todo.id)}
                    >
                      {" "}
                      Adicionar{" "}
                    </Button>
                  )}
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Container>
    </TodosContextProvider>
  );
}

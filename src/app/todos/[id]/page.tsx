"use client";
import { useTodoContext } from "@/contexts/TodoContext";
import { Todo } from "@/types/todo";
import { Box, Button } from "@mantine/core";
import { useEffect, useState } from "react";

export default function TodoDetails({ params }: { params: { id: number } }) {
  const [todo, setTodo] = useState<Todo | null>(null);
  const { todosSelecionados, setTodosSelecionados } = useTodoContext();

  useEffect(() => {
    console.log(todosSelecionados);
    
    const buscarTodos = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${params.id}`
      );

      if (!response.ok) {
        return;
      }

      const dados = (await response.json()) as Todo;
      console.log(dados);
      
      setTodo(dados);
      console.log(todo);
      
    };
    buscarTodos();
  }, []);

  const handleClickButton = () => {
    const todo = todosSelecionados.find((t) => t.id === params.id);

    if (!todo) {
      setTodosSelecionados((todos) => [...todos, todo as unknown as Todo]);
    } else {
      setTodosSelecionados((todos) => [
        ...todos.filter((t) => t.id !== params.id),
      ]);
    }
  };

  if (!todo) return <>Todo não encontrado</>;

  return (
    <>
      <Box component="pre">{JSON.stringify(todo, null, 2)}</Box>
      <br />
      <br />

      {todosSelecionados.find((i) => i.id === todo.id) ? (
        <Button color="red" onClick={handleClickButton}>
          {" "}
          Remover{" "}
        </Button>
      ) : (
        <Button color="blue" onClick={handleClickButton}>
          {" "}
          Adicionar{" "}
        </Button>
      )}
    </>
  );
}

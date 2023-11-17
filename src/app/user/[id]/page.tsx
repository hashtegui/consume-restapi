"use client";
import { User } from "@/types/user";
import { Text } from "@mantine/core";
import { useEffect, useState } from "react";

export default function UserDetails({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const buscaUsuario = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${params.id}`
      );

      if (!response.ok) {
        console.log("Erro ao fazer a requisição");
        return;
      }
      const user = (await response.json()) as User;

      setUser(user);
    };
    buscaUsuario();
  });

  if (!user) {
    return (
      <>
        <Text> Usuário não foi encontrado</Text>
      </>
    );
  }
  return (
    <>
      <Text fw={"bold"} fz={"lg"}>
        {user.name}
      </Text>
    </>
  );
}

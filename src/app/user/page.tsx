"use client";

import { User } from "@/types/user";
import { Button, Container, Flex, Table } from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function User() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const buscarUsuarios = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );

      if (!response.ok) {
        console.log("Não foi possivel carregar os usuarios");
        return;
      }

      const dados = (await response.json()) as User[];

      setUsers(dados);
    };

    buscarUsuarios();
  }, []);

  if (!users) {
    return <>Carregando...</>;
  }
  return (
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
          {users.map((user) => (
            <Table.Tr>
              <Table.Td>{user.id}</Table.Td>
              <Table.Td>{user.name}</Table.Td>
              <Table.Td>{user.username}</Table.Td>
              <Table.Td>{user.email}</Table.Td>
              <Table.Td>
                <Flex>
                  <Button
                    color="blue"
                    variant="outline"
                    component={Link}
                    href={`/user/${user.id}`}
                  >
                    Detalhes
                  </Button>
                  <Button color="red" variant="outline">
                    Excluir
                  </Button>
                </Flex>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Container>
  );
}

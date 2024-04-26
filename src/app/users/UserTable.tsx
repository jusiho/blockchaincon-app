"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  getKeyValue,
} from "@nextui-org/react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Componente para la tabla de usuarios
export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [cant, serialized] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_URL_LOCAL}/api/registerFree?page=${page}&perPage=${perPage}`,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  const pages = useMemo(() => {
    return data?.total_registros
      ? Math.ceil(data.total_registros / perPage)
      : 0;
  }, [data?.total_registros, perPage]);

  // const loadingState = isLoading || data?.results.length === 0 ? "loading" : "idle";

  // useEffect(() => {
  //   console.log("env ", process.env.NEXT_PUBLIC_URL_LOCAL);

  //   const fetchUsers = async () => {
  //     fetch(`${process.env.NEXT_PUBLIC_URL_LOCAL}/api/orders`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setUsers(data.data);
  //         serialized(data.totalOrders);
  //       });
  //   };
  //   fetchUsers();
  // }, []);
  const loadingState =
    isLoading || data?.data.length === 0 ? "loading" : "idle";

  return (
    <Table
      aria-label="Example table with client async pagination"
      bottomContent={
        pages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
      // {...args}
    >
      <TableHeader>
        <TableColumn key="id_register">ID registro</TableColumn>
        <TableColumn key="id_unique">ID unico</TableColumn>
        <TableColumn key="name">Nombres</TableColumn>
        <TableColumn key="lastname">Apellidos</TableColumn>
        <TableColumn key="email">Email</TableColumn>
        <TableColumn key="phone">Numero</TableColumn>
        <TableColumn key="company">Empresa</TableColumn>
        <TableColumn key="level_exp">Experiencia</TableColumn>
        <TableColumn key="category">Caregorias</TableColumn>
        <TableColumn key="edition">Edicion</TableColumn>
      </TableHeader>
      <TableBody
        items={data?.data ?? []}
        loadingContent={<Spinner />}
        loadingState={loadingState}
      >
        {(item: any) => (
          <TableRow key={item?.id_register}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

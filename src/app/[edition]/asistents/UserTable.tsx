"use client";
import * as React from "react";
import { signOut, useSession } from "next-auth/react";

import { useCallback, useMemo, useState } from "react";
import {
  Input,
  Table,
  Pagination,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Chip,
  Button,
} from "@nextui-org/react";
import { SearchIcon } from "../../Components/SearchIcon";
import useSWR from "swr";
import Swal from "sweetalert2";

const columns = [
  { name: "ID", uid: "id_register", sortable: true },
  { name: "TOKEN", uid: "id_unique", sortable: true },
  { name: "NOMBRE", uid: "name", sortable: true },
  { name: "APELLIDO", uid: "lastname", sortable: true },
  { name: "EMAIL", uid: "email", sortable: true },
  { name: "TELEFONO", uid: "phone", sortable: true },
  { name: "EMPRESA", uid: "company", sortable: true },
  { name: "PAIS", uid: "country", sortable: true },
  { name: "NIVEL CONOCIMENTO", uid: "know_exp", sortable: true },
  { name: "NIVEL EXPERIENCIA", uid: "level_exp", sortable: true },
  { name: "CATEGORIA", uid: "category", sortable: true },
  { name: "EDICION", uid: "edition", sortable: true },
  { name: "TIPO", uid: "type_ticket", sortable: true },
  { name: "ESTADO", uid: "state", sortable: true },
  { name: "ACCIONES", uid: "actions", sortable: true },
];

const INITIAL_VISIBLE_COLUMNS = [
  "id_register",
  "id_unique",
  "name",
  "lastname",
  "email",
  "phone",
  "company",
  "country",
  "knowledge",
  "know_exp",
  "level_exp",
  "category",
  "edition",
  "type_ticket",
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];
type StatusColorMap = {
  [key: string]:
    | "default"
    | "success"
    | "danger"
    | "warning"
    | "primary"
    | "secondary"
    | undefined;
};

const statusColorMap: StatusColorMap = {
  "1": "success",
  "3": "danger",
  "0": "warning",
};

interface SortDescriptor {
  column: string;
  direction: SortDirection | undefined;
}

type SortDirection = "ascending" | "descending";

type sendEmailConfirmationProps = {
  emailTo: string;
  htmlResponse: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface User {
  id_register: string;
  id_unique: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  know_exp: string;
  level_exp: string;
  category: string;
  edition: string;
  type_ticket: string;
  state: string;
  actions?: string;
}

export default function UseTable() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<string | Set<any>>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "id_register",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const {
    data: users,
    isLoading,
    mutate,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_URL_LOCAL}/api/registerFree?page=${page}&perPage=${rowsPerPage}&search=${search}&endpoint=records`,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  const pages = users?.total_pages;

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns.has("all")) return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    if (!users) return [];

    let filteredUsers = [...users?.data];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.state)
      );
    }
    console.log(filteredUsers);

    return filteredUsers;
  }, [users?.data, filterValue, statusFilter]);

  const items = useMemo(() => {
    if (!users) return [];

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  React.useEffect(() => {
    if (loading) {
      Swal.fire({
        title: "Loading",
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
    } else {
      Swal.close();
    }
  }, [loading]);

  const handleButtonApprove = async (user: User) => {
    console.log("Aprobar");

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_LOCAL}/api/updateRegister`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_register: user.id_register,
            state: "1",
          }),
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        // console.log(data);
        // console.log(user);

        // const emailTo = user.email;
        // const emailData = {
        //   id_register: user.id_register,
        //   id_unique: user.id_unique,
        //   name: user.name,
        //   lastname: user.lastname,
        //   email: user.email,
        //   phone: user.phone,
        //   company: user.company,
        //   country: user.country,
        //   know_exp: user.know_exp,
        //   level_exp: user.level_exp,
        //   category: user.category,
        //   edition: user.edition,
        //   type_ticket: user.type_ticket,
        // };
        // console.log(emailData);

        // const htmlResponse = await invoiceTemplate({ emailData });
        // console.log(htmlResponse);

        // // Función para enviar el correo electrónico de forma asincrónica
        // sendEmailConfirmation({ emailTo, htmlResponse });

        // Code to handle successful response
      } else {
        // Code to handle unsuccessful response
      }
    } catch (error) {
      // Code to handle error
    } finally {
      console.log("Finalmente");

      setLoading(false);
      mutate();
    }

    console.log("Aprobar", user);
  };

  const handleButtonRefuse = async (user: User) => {
    console.log("Aprobar");

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_LOCAL}/api/updateRegister`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            id_register: user.id_register,
            state: "3",
          }),
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        // console.log(data);
        // console.log(user);

        // const emailTo = user.email;
        // const emailData = {
        //   id_register: user.id_register,
        //   id_unique: user.id_unique,
        //   name: user.name,
        //   lastname: user.lastname,
        //   email: user.email,
        //   phone: user.phone,
        //   company: user.company,
        //   country: user.country,
        //   know_exp: user.know_exp,
        //   level_exp: user.level_exp,
        //   category: user.category,
        //   edition: user.edition,
        //   type_ticket: user.type_ticket,
        // };
        // console.log(emailData);

        // const htmlResponse = await invoiceTemplate({ emailData });
        // console.log(htmlResponse);

        // // Función para enviar el correo electrónico de forma asincrónica
        // sendEmailConfirmation({ emailTo, htmlResponse });

        // Code to handle successful response
      } else {
        // Code to handle unsuccessful response
      }
    } catch (error) {
      // Code to handle error
    } finally {
      console.log("Finalmente");

      setLoading(false);
      mutate();
    }

    console.log("Aprobar", user);
  };

  const renderCell = useCallback((user: User, columnKey: any) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      // ...

      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = useCallback((e: any) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value: string) => {
    if (value) {
      console.log(value);

      setFilterValue(value);
      setSearch(value);
      setPage(1);
    } else {
      setFilterValue("");
      setSearch("");
    }
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1 ",
              input: "border-none",
            }}
            placeholder="Busqueda por nombre..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        {pages > 0 ? (
          <>
            <Pagination
              showControls
              classNames={{
                cursor: "bg-foreground text-background",
              }}
              color="default"
              isDisabled={hasSearchFilter}
              page={page}
              total={pages}
              variant="light"
              onChange={(page) => setPage(page)}
            />
            <span className="text-small text-default-400">
              {selectedKeys === "all"
                ? "All items selected"
                : `${(selectedKeys as Set<any>).size} of ${
                    items.length
                  } selected`}
            </span>
          </>
        ) : null}
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const loadingState =
    isLoading || users?.total_records === 0 ? "loading" : "idle";

  return (
    <div>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={(key: string | Set<any>) => {
          setSelectedKeys(key);
        }}
        onSortChange={(key: any) => setSortDescriptor(key)}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No se encontro curso"}
          items={users?.data ?? []}
          loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {(item: any) => (
            <TableRow key={item.id_register}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

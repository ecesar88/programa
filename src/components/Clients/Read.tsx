import { Client } from "@prisma/client";
import { CustomTable, Table, TableHeader } from "../Table";

export const Read = ({ clients }: any) => {
  const tableHeader: TableHeader<Client>[] = [
    {
      render: (row) => row?.name,
      label: "Nome",
    },
    {
      render: (row) => row?.phone,
      label: "Telefone",
    },
  ];

  const tableData: Table<Client> = {
    header: tableHeader,
    content: clients,
  };

  return <CustomTable content={tableData.content} header={tableData.header} />;
};

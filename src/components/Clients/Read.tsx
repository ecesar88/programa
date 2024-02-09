import { Client } from "@prisma/client";
import { CustomTable, Table2Props } from "../Table";

export const Read = ({ clients }: { clients: Client[] }) => {
  const table2Data: Table2Props<Client> = {
    header: [
      {
        title: "Id",
        keyName: "id",
      },
      {
        title: "Nome",
        keyName: "name",
      },
      {
        title: "Telefone",
        keyName: "phone",
      },
    ],
    data: clients,
  };

  return <CustomTable data={table2Data} />;
};

import { Client } from "@prisma/client";
import { CustomTable, Table2Props } from "../Table";
import { useContext } from "react";
import { ScreenLocalContext } from "../../context/ScreenLocalContext";

export const Read = ({
  clients,
  onRowSelect,
}: {
  clients: Client[];
  onRowSelect?: (data?: Client) => void;
}) => {
  const {
    selectedRow: { selectedRow },
  } = useContext(ScreenLocalContext);

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
    onRowClick: (data) => {
      onRowSelect?.(data);
    },
    selectedRow: selectedRow as Client,
  };

  return <CustomTable data={table2Data} />;
};

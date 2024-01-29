import { Cell, Column, Table2 } from "@blueprintjs/table";
import { Client } from "@prisma/client";

interface ReadProps {
  clients: Client[];
}

export const Read = (props: ReadProps) => {
  const dollarCellRenderer = () => (
    <Cell>teste</Cell>
  );

  const euroCellRenderer = () => (
    <Cell>teste 2</Cell>
  );

  return (
    <Table2 numRows={props.clients.length}>
      <Column name="Nome" cellRenderer={dollarCellRenderer} />
      <Column name="Telefone" cellRenderer={euroCellRenderer} />
    </Table2>
  );
};

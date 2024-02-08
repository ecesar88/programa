import { HotkeysProvider } from "@blueprintjs/core";
import { Cell, Column, ColumnHeaderCell, Table2 } from "@blueprintjs/table";

export interface Table2HeaderType<T extends Record<string, any>> {
  title: string;
  keyName: keyof T;
  render?: (rowData: T) => React.ReactNode;
}

export interface Table2Props<T extends Record<string, any>> {
  header: Table2HeaderType<T>[];
  data: T[];
}

export const CustomTable = <T extends Record<string, any>>({
  data,
}: {
  data: Table2Props<T>;
}) => {
  const { data: tableData, header: tableHeaders } = data;

  return (
    <HotkeysProvider>
      <Table2 numRows={tableData?.length} enableGhostCells>
        {tableHeaders?.map((header) => {
          return (
            <Column
              key={header.title}
              cellRenderer={(idx) => {
                const columnData = tableData[idx];
                const rowData = columnData[header.keyName];

                let renderable;

                if (header?.render) {
                  renderable = header?.render(columnData);
                }

                return (
                  <Cell tooltip={rowData}>
                    {(() => {
                      if (renderable) return renderable;
                      return tableData[idx][header.keyName];
                    })()}
                  </Cell>
                );
              }}
              columnHeaderCellRenderer={() => (
                <ColumnHeaderCell name={header.title} />
              )}
            />
          );
        })}
      </Table2>
    </HotkeysProvider>
  );
};

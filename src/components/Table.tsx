import { CSSProperties } from "react";

export interface TableHeader<T> {
  render?: (rowData: T) => string | React.ReactNode;
  label?: string;

  cellStyle?: CSSProperties;
  headerStyle?: CSSProperties;

  headerChildren?: React.ReactNode;
}

export interface Table<T> {
  header: TableHeader<T>[];
  content: T[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CustomTable = <T extends Record<string, any>>(
  props: Table<T>
) => {
  const { header, content } = props;

  const defaultCellStyle: CSSProperties = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "6px",
  };

  return (
    <table>
      <thead>
        <tr>
          {header.map((header, hIdx) => (
            <th key={hIdx}>
              <div style={header?.headerStyle ?? defaultCellStyle}>
                {header?.headerChildren ?? null}
                <p>{header?.label?.toUpperCase()}</p>
              </div>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {content?.map((data, dataIndex) => {
          return (
            <tr key={dataIndex}>
              {header?.map((headerItem, hIdx) => {
                return (
                  <td key={hIdx}>
                    <div style={headerItem?.cellStyle ?? defaultCellStyle}>
                      {headerItem?.render?.(data)}
                    </div>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

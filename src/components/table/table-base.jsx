import React from "react";

import "./index.css";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { makeData } from "./makeData";

import { useDrag, useDrop } from "react-dnd";

import { ReactComponent as PinLeftIcon } from "./../../assets/icons/pin-left.svg";
import { ReactComponent as PinRightIcon } from "./../../assets/icons/pin-right.svg";
import { ReactComponent as PinDragIcon } from "./../../assets/icons/rows.svg";
// import { ReactComponent as CloseIcon } from "./../../assets/icons/close.svg";

const defaultColumns = [
  {
    accessorKey: "firstName",
    id: "firstName",
    header: "First Name",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.lastName,
    id: "lastName",
    cell: (info) => info.getValue(),
    header: () => <span>Last Name</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "age",
    id: "age",
    header: "Age",
    footer: (props) => props.column.id,
  },

  {
    accessorKey: "visits",
    id: "visits",
    header: "Visits",
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "status",
    id: "status",
    header: "Status",
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "progress",
    id: "progress",
    header: "Profile Progress",
    footer: (props) => props.column.id,
  },
];

const reorderColumn = (draggedColumnId, targetColumnId, columnOrder) => {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0]
  );
  return [...columnOrder];
};

const DraggableColumnHeader = ({ header, table }) => {
  const { getState, setColumnOrder } = table;
  const { columnOrder } = getState();
  const { column } = header;

  const [, dropRef] = useDrop({
    accept: "column",
    drop: (draggedColumn) => {
      const newColumnOrder = reorderColumn(
        draggedColumn.id,
        column.id,
        columnOrder
      );
      setColumnOrder(newColumnOrder);
    },
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => column,
    type: "column",
  });

  return (
    <th
      {...{
        key: header.id,
        colSpan: header.colSpan,
        style: {
          opacity: isDragging ? 0.5 : 1,
          width: header.getSize(),
        },
        ref: dropRef,
      }}
    >
      <div ref={previewRef}>
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}

        <button title="reorder column" className="btn-grab" ref={dragRef}>
          <PinDragIcon />
        </button>
        {/* <button title='reorder column' className='btn-grab' ref={dragRef}>🟰<PinDragIcon/></button> */}

        {/* pinning */}
        {header.column.getIsPinned() !== "left" ? (
          <button
            title="Pin column to left"
            className="border rounded px-2"
            onClick={() => {
              header.column.pin("left");
            }}
          >
            <PinLeftIcon />
          </button>
        ) : null}
        {header.column.getIsPinned() ? (
          <button
            title="Unpin column"
            className="border rounded px-2"
            onClick={() => {
              header.column.pin(false);
            }}
          >
            X
          </button>
        ) : null}
        {header.column.getIsPinned() !== "right" ? (
          <button
            title="Pin column to right"
            className="border rounded px-2"
            onClick={() => {
              header.column.pin("right");
            }}
          >
            <PinRightIcon />
          </button>
        ) : null}
      </div>
      <div
        {...{
          onMouseDown: header.getResizeHandler(),
          onTouchStart: header.getResizeHandler(),
          className: `resizer ${
            header.column.getIsResizing() ? "isResizing" : ""
          }`,
        }}
      />
    </th>
  );
};

function Table() {
  const [data, setData] = React.useState(() => makeData(20));
  const [columns] = React.useState(() => [...defaultColumns]);
  const columnResizeMode = "onChange";

  const [columnOrder, setColumnOrder] = React.useState(
    columns.map((column) => column.id) //must start out with populated columnOrder so we can splice
  );

  // const regenerateData = () => setData(() => makeData(20))

  // const resetOrder = () =>
  //   setColumnOrder(columns.map(column => column.id))

  const table = useReactTable({
    data,
    columns,
    columnResizeMode,
    state: {
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return (
    <div className="p-2">
      <div className="h-4" />
      <div className="flex flex-wrap gap-2"></div>
      <div className="h-4" />
      <div style={{ overflowX: "auto" }}>
        <table
          {...{
            key: table.getCenterTotalSize().toString(),
            style: {
              width: table.getCenterTotalSize(),
            },
          }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <DraggableColumnHeader
                    key={header.id}
                    header={header}
                    table={table}
                  />
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    {...{
                      key: cell.id,
                      style: {
                        width: cell.column.getSize(),
                      },
                    }}
                  >
                    {cell.id.toString().includes("progress") ? (
                      <button className="border rounded px-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </button>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {/* <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
        </table>
      </div>
      <pre>{JSON.stringify(table.getState().columnOrder, null, 2)}</pre>
    </div>
  );
}

export default Table;

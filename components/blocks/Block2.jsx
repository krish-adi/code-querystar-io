import React, { useState } from "react";
import CodeEditor from "@/components/CodeEditor";
import { getDuckConn } from "@/services/duckdb";
import DataGrid from "@/components/DataGrid";

export default function Block2() {
    const [doc, setDoc] = useState(
        "-- Start typing your SQL code here\n\n\n\n\n\n\n"
    );
    const [tableData, setTableData] = useState({
        columnDefs: [
            {
                headerName: "",
                valueGetter: "node.rowIndex + 1",
                editable: false,
                pinned: "left",
                width: 50,
            },
            { field: "no-tables-queried", headerName: "no-tables-queried" },
        ],
        rowData: [],
    });
    const [tableActive, setTableActive] = useState(false);

    return (
        <div className="mx-auto my-2 w-full max-w-2xl p-3 flex flex-col border border-gray-500 rounded-md">
            <div className="flex flex-row mb-2 justify-between">
                <div className="flex flex-row items-center">
                    <button
                        className="py-1 px-2 font-light text-xs bg-blue-500 text-white rounded-sm"
                        onClick={async () => {
                            const duck = await getDuckConn();

                            await duck.conn
                                .query(doc)
                                .then((result) => {
                                    const tableSchema =
                                        result.schema.fields.map(
                                            (item, idx) => {
                                                return {
                                                    name: item.name,
                                                    type: item.type,
                                                    nullable: item.nullable,
                                                };
                                            }
                                        );
                                    const tableMetaData = {
                                        schema: tableSchema,
                                        numCols: result.numCols,
                                        numRows: result.numRows,
                                        nullRowsCount: result.nullCount,
                                    };

                                    const headerData = result.schema.fields.map(
                                        (item, idx) => {
                                            return {
                                                field: item.name,
                                                headerName: item.name,
                                            };
                                        }
                                    );

                                    const rowData = JSON.parse(
                                        JSON.stringify(
                                            result.toArray(),
                                            (key, value) =>
                                                typeof value === "bigint"
                                                    ? value.toString()
                                                    : value // return everything else unchanged
                                        )
                                    );

                                    headerData.push({
                                        headerName: "",
                                        valueGetter: "node.rowIndex + 1",
                                        editable: false,
                                        pinned: "left",
                                        width: 50,
                                    });

                                    setTableData({
                                        columnDefs: headerData,
                                        rowData: rowData,
                                    });
                                    setTableActive(true);
                                })
                                .catch((_error) => {
                                    console.log(_error);
                                });
                        }}
                    >
                        RUN
                    </button>
                </div>
                <div></div>
            </div>

            <CodeEditor
                className={"w-full"}
                initialDoc={doc}
                onChange={setDoc}
            />
            {tableActive && (
                <div className="flex flex-row mt-2 justify-between">
                    <DataGrid tableData={tableData} className="h-96" />
                </div>
            )}
        </div>
    );
}

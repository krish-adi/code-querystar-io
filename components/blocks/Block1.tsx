import React, { useState } from "react";
import CodeEditor from "@/components/CodeEditor";
import { getDuckConn } from "@/services/duckdb";
import DataGrid from "@/components/DataGrid";
import { parseDuckResult } from "@/services/duckutils";
import CodeBlock from "@/components/CodeBlock";

export default function Block1() {
    const [doc, setDoc] = useState("-- Load the required tables\nSHOW TABLES;");
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
    const [blockMessage, setBlockMessage] = useState("");

    return (
        <CodeBlock name="Load tables block...">
            <div className="flex flex-row mb-2 justify-between">
                <div className="flex flex-row items-center">
                    <button
                        className="py-1 px-2 font-light text-xs bg-blue-500 text-white rounded-sm"
                        onClick={async () => {
                            const duck = await getDuckConn();

                            await duck.conn
                                .query("SHOW TABLES;")
                                .then((result: any) => {
                                    setTableData(parseDuckResult(result));
                                    setTableActive(true);
                                })
                                .catch((_error: any) => {
                                    console.log(_error);
                                });
                        }}
                    >
                        RUN
                    </button>

                    <button
                        className="ml-10 py-1 px-2 font-light text-xs bg-blue-500 text-white rounded-sm"
                        onClick={async () => {
                            try {
                                const duck = await getDuckConn();
                                await duck.db.registerFileURL(
                                    "yc_founders.parquet",
                                    `http://localhost:3000/yc_founders.parquet`,
                                    4,
                                    false
                                );
                                await duck.conn.query(
                                    `CREATE TABLE yc_founders AS SELECT * FROM parquet_scan('yc_founders.parquet')`
                                );
                                await duck.db.registerFileURL(
                                    "yc_companies.parquet",
                                    `http://localhost:3000/yc_companies.parquet`,
                                    4,
                                    false
                                );
                                await duck.conn.query(
                                    `CREATE TABLE yc_companies AS SELECT * FROM parquet_scan('yc_companies.parquet')`
                                );
                            } catch (error) {
                                console.log(error);
                            } finally {
                                setBlockMessage(
                                    "Tables loaded successfully! 🎉"
                                );
                            }
                        }}
                    >
                        Load Tables
                    </button>
                </div>
                <div>
                    {blockMessage !== "" && (
                        <p className="text-sm font-medium">{blockMessage}</p>
                    )}
                </div>
            </div>
            <CodeEditor
                className={"w-full"}
                initialDoc={doc}
                onChange={setDoc}
            />
            {tableActive && (
                <div className="flex flex-row mt-2 justify-between">
                    <DataGrid tableData={tableData} className="h-24" />
                </div>
            )}
        </CodeBlock>
    );
}

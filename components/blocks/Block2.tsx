import React, { useState } from "react";
import CodeEditor from "@/components/CodeEditor";
import { getDuckConn } from "@/services/duckdb";
import DataGrid from "@/components/DataGrid";
import { parseDuckResult } from "@/services/duckutils";
import CodeBlock from "@/components/CodeBlock";
import { useCompletions } from "@/components/completionsStore";

export default function Block2() {
    const [doc, setDoc] = useState(
        `-- Use QueryStar completions to generate SQL queries
-- Type your question inside '--?' and '--/'
\n\n\n`
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
    const fetchStatus = useCompletions((state) => state.fetchStatus);

    return (
        <CodeBlock name="QueryStar completions block...">
            <div className="flex flex-row mb-2 justify-between">
                <div className="flex flex-row items-center">
                    <button
                        className="py-1 px-2 font-light text-xs bg-blue-500 text-white rounded-sm"
                        onClick={async () => {
                            const duck = await getDuckConn();

                            await duck.conn
                                .query(doc)
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
                </div>
                <div>
                    {fetchStatus !== "idle" && (
                        <p className="text-sm font-medium">{fetchStatus}</p>
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
                    <DataGrid tableData={tableData} className="h-96" />
                </div>
            )}
        </CodeBlock>
    );
}

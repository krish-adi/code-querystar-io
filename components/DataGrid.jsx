import React, { useRef, useMemo, useState, useEffect } from "react";

import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import "ag-grid-community/styles/ag-theme-balham.css"; // Optional theme CSS

export default function DataGrid({
    className,
    tableData,
    // tableData = {
    //     columnDefs: [
    //         {
    //             headerName: "",
    //             valueGetter: "node.rowIndex + 1",
    //             editable: false,
    //             pinned: "left",
    //             width: 50,
    //         },
    //         { field: "no-tables-queried", headerName: "no-tables-queried" },
    //     ],
    //     rowData: [],
    // },
}) {
    const gridRef = useRef(); // Optional - for accessing Grid's API

    const formatObject = ({ value }) => {
        if (typeof value === "object") {
            return JSON.stringify(value);
        } else {
            return value;
        }
    };

    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(
        () => ({
            sortable: true,
            // initialWidth: 100,
            filter: false,
            editable: false,
            resizable: true,
            valueFormatter: formatObject,
        }),
        []
    );

    const rowDataUpdated = ({ gridApi, columnApi }) => {
        const allColumnIds = [];
        columnApi.getColumns().forEach((column) => {
            allColumnIds.push(column.getId());
        });
        columnApi.autoSizeColumns(allColumnIds, false);
    };

    return (
        <div className={`ag-theme-balham w-full ${className}`}>
            <AgGridReact
                ref={gridRef} // Ref for accessing Grid's API
                onRowDataUpdated={rowDataUpdated}
                rowData={tableData.rowData} // Row Data for Rows
                columnDefs={tableData.columnDefs} // Column Defs for Columns
                defaultColDef={defaultColDef} // Default Column Properties
                animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                rowSelection="multiple" // Options - allows click selection of rows
            />
        </div>
    );
}

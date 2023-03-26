import React, { useMemo } from "react";

import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import "ag-grid-community/styles/ag-theme-balham.css"; // Optional theme CSS

interface TableData {
    columnDefs: any[];
    rowData: any[];
}

export default function DataGrid({
    className,
    tableData,
}: {
    className: string;
    tableData: TableData;
}) {
    const formatObject = ({ value }: { value: any }) => {
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

    return (
        <div className={`ag-theme-balham w-full ${className}`}>
            <AgGridReact
                rowData={tableData.rowData} // Row Data for Rows
                columnDefs={tableData.columnDefs} // Column Defs for Columns
                defaultColDef={defaultColDef} // Default Column Properties
                animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                rowSelection="multiple" // Options - allows click selection of rows
            />
        </div>
    );
}

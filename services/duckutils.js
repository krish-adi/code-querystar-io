export const parseDuckResult = (result) => {
    const tableSchema = result.schema.fields.map((item, idx) => {
        return {
            name: item.name,
            type: item.type,
            nullable: item.nullable,
        };
    });
    const tableMetaData = {
        schema: tableSchema,
        numCols: result.numCols,
        numRows: result.numRows,
        nullRowsCount: result.nullCount,
    };

    const headerData = result.schema.fields.map((item, idx) => {
        return {
            field: item.name,
            headerName: item.name,
        };
    });

    const rowData = JSON.parse(
        JSON.stringify(
            result.toArray(),
            (key, value) =>
                typeof value === "bigint" ? value.toString() : value // return everything else unchanged
        )
    );

    headerData.push({
        headerName: "",
        valueGetter: "node.rowIndex + 1",
        editable: false,
        pinned: "left",
        width: 50,
    });

    return {
        columnDefs: headerData,
        rowData: rowData,
    };
};

import * as React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@material-ui/data-grid';
import "./DataTable.scss";

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'year', headerName: 'Year', width: 130 },
    { field: 'month', headerName: 'Month', width: 130 },
    { field: 'category', headerName: 'Expense Category', width: 230 },
    { field: 'amount', headerName: 'Amount', width: 130 }
];

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

export default function DataGridDemo(props) {
    const { rows, handleRowSelection } = props
    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={rows}
                /* autoHeight={true}
                autoPageSize={true} */
                columns={columns}
                pageSize={5}
                checkboxSelection
                components={{
                    Toolbar: CustomToolbar
                }}
                onSelectionModelChange={handleRowSelection}
            />
        </div>
    );
}
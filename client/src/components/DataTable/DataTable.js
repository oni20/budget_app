import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'year', headerName: 'Year', width: 130 },
    { field: 'month', headerName: 'Month', width: 130 },    
    { field: 'category', headerName: 'Expense Category', width: 230 },
    { field: 'amount', headerName: 'Amount', width: 130 }
];

export default function DataGridDemo(props) {
    const {rows} = props
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
        </div>
    );
}
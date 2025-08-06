import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';

const ReverseIpTable = ({ revrseIPDomains }) => {

    const [domains, setDomains] = useState([]);

    useEffect(() => {

        const dataWithIds = (revrseIPDomains?.domains || []).slice(0, 100).map((item, idx) => ({
            id: idx + 1,
            name: item.name,
            last_resolved: item.last_resolved
        }));

        setDomains(dataWithIds);


    }, [revrseIPDomains])

    const columns = [
        { field: 'id', headerName: '#', width: 70 },
        { field: 'name', headerName: 'Domain Name', flex: 1 },
        { field: 'last_resolved', headerName: 'Last Resolved', width: 180 }
    ];

    return (
        <>
            <DataGrid
                rows={domains}
                columns={columns}
                
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 10, page: 0 },
                    },
                }}
                rowsPerPageOptions={[5, 10, 25]}
                disableRowSelectionOnClick
                sx={{
                    height: 500,
                    bgcolor: '#0f172a',
                    color: '#fff',

                    '& .MuiDataGrid-cell': {
                        color: '#fff',
                        backgroundColor: '#0f172a',
                    },

                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#0f172a',
                    },

                    '& .MuiDataGrid-columnHeader': {
                        color: '#fff',
                        backgroundColor: '#0f172a',
                    },

                    '& .MuiDataGrid-columnSeparator': {
                        color: '#3d4366',
                    },

                    '& .MuiDataGrid-iconButtonContainer, & .MuiDataGrid-sortIcon': {
                        color: '#fff',
                    },

                    '& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus': {
                        outline: 'none',
                        backgroundColor: '#0f172a',
                    },

                    '& .MuiDataGrid-cell:hover, & .MuiDataGrid-columnHeader:hover': {
                        backgroundColor: '#0f172a',
                        color: '#fff',
                    },

                    // ✅ Force dark theme on action menu (3-dots menu)
                    '& .MuiPaper-root.MuiMenu-paper': {
                        backgroundColor: '#0f172a !important',
                        color: '#fff !important',
                    },

                    '& .MuiMenuItem-root': {
                        backgroundColor: '#0f172a',
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: '#2d3456',
                        },
                    },

                    // ✅ Also darken the divider & icons inside menu
                    '& .MuiDivider-root': {
                        borderColor: '#3d4366',
                    },

                    '& .MuiSvgIcon-root': {
                        color: '#fff',
                    },

                    '& .MuiList-root': {
                        backgroundColor: '#0f172a',
                        color: '#fff',
                    },
                }}

            />
        </>
    )
}

export default ReverseIpTable
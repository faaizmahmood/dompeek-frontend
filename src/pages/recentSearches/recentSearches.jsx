import { DataGrid } from '@mui/x-data-grid'
// import { Box, Typography } from '@mui/material'
import { useAppSelector } from '../../redux/hooks'
// import moment from 'moment' // You can use this or native Date

const RecentSearches = () => {
    const currentUser = useAppSelector((state) => state?.user?.profile?.data)
    const recentSearches = currentUser?.recentSearches || []

    // Prepare rows
    const rows = recentSearches.map((search, index) => ({
        id: index + 1,
        domain: search.domain,
        time: new Date(search.timestamp).toLocaleString(), // OR use moment if preferred
    }))

    const columns = [
        { field: 'id', headerName: '#', width: 70 },
        { field: 'domain', headerName: 'Domain Name', flex: 1 },
        { field: 'time', headerName: 'Searched At', flex: 1 },
    ]

    return (
        <>
            <h3>Recent Searches</h3>

            <div className='mt-4'>
                <DataGrid
  rows={rows}
  columns={columns}
  pageSize={5}
  rowsPerPageOptions={[5, 10]}
  disableSelectionOnClick
  sx={{
    border: 'none',
    borderRadius: 2,
    height: 400,
    boxShadow: 2,
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: '#f5f5f5',
      fontWeight: 'bold',
    },
    '& .MuiDataGrid-row:hover': {
      backgroundColor: '#f9f9f9',
    },
    '& .MuiDataGrid-cell': {
      borderBottom: '1px solid #eee',
    },
    '& .MuiDataGrid-footerContainer': {
      backgroundColor: '#f5f5f5',
    },
  }}
/>

            </div>

        </>
    )
}

export default RecentSearches

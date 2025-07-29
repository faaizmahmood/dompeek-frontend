import { useEffect, useState } from 'react';
import { BiTransferAlt } from 'react-icons/bi';
import { DataGrid } from '@mui/x-data-grid';
import apiService from '../../../../utils/apiClient';
import TabLoading from '../../../../components/tabLoading/tabLoading';
import styles from './reverseIP.module.scss';

const ReverseIP = ({ whoisData }) => {
    const [loading, setLoading] = useState(true);
    const [domains, setDomains] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!whoisData?.domainName) return;

        (async () => {
            try {
                const domain = whoisData?.domainName;
                setLoading(true);
                setError('');

                const res = await apiService.get('/domain/reverse-ip', { domain });

                const dataWithIds = (res.data.domains || []).slice(0, 100).map((item, idx) => ({
                    id: idx + 1,
                    name: item.name,
                    last_resolved: item.last_resolved
                }));

                console.log(dataWithIds)

                setDomains(dataWithIds);

            } catch (err) {
                console.error(err);
                setError('Failed to fetch reverse IP data.');
            } finally {
                setLoading(false);
            }
        })();
    }, [whoisData?.domainName]);

    const columns = [
        { field: 'id', headerName: '#', width: 70 },
        { field: 'name', headerName: 'Domain Name', flex: 1 },
        { field: 'last_resolved', headerName: 'Last Resolved', width: 180 }
    ];

    return (
        <div className={styles.reverseIP}>
            <div className={`d-flex gap-3 ${styles.tab_head}`}>
                <BiTransferAlt color='#fff' size={40} className="mt-2" />
                <div>
                    <h4>Reverse IP Lookup</h4>
                    <p>{whoisData?.domainName}</p>
                </div>
            </div>

            {loading && <TabLoading />}

            {!loading && error && <p className={styles.error}>{error}</p>}

            {!loading && domains.length === 0 && !error && (
                <p>No other domains found on this IP.</p>
            )}

            {!loading && domains.length > 0 && (
                <div style={{ width: '100%' }} className={styles.dataGridWrapper}>
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
                            bgcolor: '#232949',
                            color: '#fff',

                            '& .MuiDataGrid-cell': {
                                color: '#fff',
                                backgroundColor: '#232949',
                            },

                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#232949',
                            },

                            '& .MuiDataGrid-columnHeader': {
                                color: '#fff',
                                backgroundColor: '#232949',
                            },

                            '& .MuiDataGrid-columnSeparator': {
                                color: '#3d4366',
                            },

                            '& .MuiDataGrid-iconButtonContainer, & .MuiDataGrid-sortIcon': {
                                color: '#fff',
                            },

                            '& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus': {
                                outline: 'none',
                                backgroundColor: '#232949',
                            },

                            '& .MuiDataGrid-cell:hover, & .MuiDataGrid-columnHeader:hover': {
                                backgroundColor: '#232949',
                                color: '#fff',
                            },

                            // ✅ Force dark theme on action menu (3-dots menu)
                            '& .MuiPaper-root.MuiMenu-paper': {
                                backgroundColor: '#232949 !important',
                                color: '#fff !important',
                            },

                            '& .MuiMenuItem-root': {
                                backgroundColor: '#232949',
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
                                backgroundColor: '#232949',
                                color: '#fff',
                            },
                        }}

                    />

                </div>
            )}
        </div>
    );
};

export default ReverseIP;

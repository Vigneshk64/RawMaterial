import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import {
    Box,
    Typography,
    Paper,
    Divider,
    Table,
    TableBody, 
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';

export default function ViewCategory() {
    const [data, setData] = useState([]);
    const [deleteData, setDeleteData] = useState();

    useEffect(() => {
        axios.get('http://localhost:7002/invent/getinventory')
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }, [deleteData]);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:7002/invent/delete/${id}`)
            .then(() => {
                alert("Deleted Successfully");
                setDeleteData(id);
            })
            .catch((err) => console.log(err));
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#adcfd9' }}>
            <Sidebar />
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#ba9d52', p: 3 }}>
                <Header />
                <Paper elevation={3} sx={{ p: 3, borderRadius: 3, marginTop: "10px" }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Inventory & Revenue Data</Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {['ID', 'Recipe', 'Image', 'Price', 'Rating', 'Category', 'About', 'Group', 'Action'].map((header) => (
                                        <TableCell key={header} sx={{ textAlign: "center", fontWeight: "bold" }}>{header}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row, i) => (
                                    <TableRow key={i}>
                                        <TableCell sx={{ textAlign: "center" }}>{JSON.stringify(row._id)}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{row.name}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>
                                            <img 
                                                src={`http://localhost:7002/invent/files/${row.image}`} 
                                                width="80" 
                                                height="80" 
                                                style={{ borderRadius: "10px", objectFit: "cover" }} 
                                                alt={row.name} 
                                            />
                                        </TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{row.revenue}</TableCell>
                                        <TableCell sx={{ textAlign: "center", color: row.rating < 0 ? 'red' : 'inherit' }}>
                                            {row.rating < 0 ? 'N/A' : row.rating}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{row.status}</TableCell>
                                        <TableCell sx={{ textAlign: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "150px" }}>
                                            {row.notes}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: "center", color: row.category === 'Out of Stock' ? 'red' : 'inherit' }}>
                                            {row.category}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>
                                            <Button 
                                                variant="contained" 
                                                color="error" 
                                                size="small" 
                                                sx={{ fontSize: "12px", padding: "5px 10px" }}
                                                onClick={() => handleDelete(row._id)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <Divider sx={{ mt: 3, backgroundColor: '#2c3e50' }} />
                <Typography variant="body2" sx={{ p: 2, textAlign: 'center', color: '#fff' }}>
                    Powered by Pharma One © {new Date().getFullYear()}
                </Typography>
            </Box>
        </Box>
    );
}

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, CircularProgress, Alert } from '@mui/material';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:7002";

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token") || localStorage.getItem("usertoken");
        
        if (!token) {
            window.location.href = "/";
            return;
        }

        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/order/user-notifications`, {
                    headers: { "auth-token": token }
                });

                setNotifications(response.data);
            } catch (err) {
                console.error("Error fetching notifications:", err.response?.data || err.message);
                
                if (err.response?.status === 401) {
                    setError("Session expired. Please log in again.");
                    localStorage.removeItem("token");
                    localStorage.removeItem("usertoken");
                    window.location.href = "/";
                } else {
                    setError("Failed to fetch notifications.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case "Approved": return { bgColor: "#2E7D32", textColor: "#FFFFFF" };
            case "Rejected": return { bgColor: "#D32F2F", textColor: "#FFFFFF" };
            default: return { bgColor: "#757575", textColor: "#FFFFFF" };
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3, color: '#FFD700' }}>
                Order Notifications
            </Typography>

            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : notifications.length === 0 ? (
                <Alert severity="info">You have no new notifications.</Alert>
            ) : (
                notifications.map((notif) => {
                    const { bgColor, textColor } = getStatusColor(notif.status);
                    console.log("Notification Item:", notif.Itemid); // Debugging
                    return (
                        <Paper
                            key={notif._id}
                            sx={{
                                p: 2,
                                mb: 2,
                                backgroundColor: bgColor,
                                color: textColor
                            }}
                        >
                            <Typography><strong>Order ID:</strong> {notif._id}</Typography>
                            <Typography>
                                <strong>Item Name:</strong> {notif.Itemid?.name || "No Name Available"}
                            </Typography>
                            <Typography>
                                <strong>Status:</strong> 
                                {notif.status === "Approved" ? " ✅ Approved"
                                    : notif.status === "Rejected" ? " ❌ Rejected"
                                    : " ⏳ Pending"}
                            </Typography>
                            <Typography sx={{ fontSize: '12px', color: '#E0E0E0' }}>
                                {notif.createdAt ? new Date(notif.createdAt).toLocaleString() : " available in 1/2 hour"}
                            </Typography>
                        </Paper>
                    );
                })
            )}
        </Box>
    );
};

export default Notification;

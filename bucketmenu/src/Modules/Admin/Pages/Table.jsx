import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Avatar,
    LinearProgress,
} from "@mui/material";
import Sidebar from "../Component/Sidebar";
import Header from "../Component/Header";

export default function OrderCards() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:7002/order/get")
            .then((res) => setOrders(res.data))
            .catch((err) => console.error("Error fetching orders:", err));
    }, []);

    const handleStatusChange = (orderId, status, userId) => {
      axios.put(`http://localhost:7002/order/update/${orderId}`, { status })
          .then(() => {
              setOrders((prevOrders) =>
                  prevOrders.map((order) =>
                      order._id === orderId ? { ...order, status } : order
                  )
              );
  
              // Send a notification request
              axios.post("http://localhost:7002/notifications/send", {
                  userId,
                  message: `Your order has been ${status}.`
              }).catch(err => console.error("Error sending notification:", err));
  
          })
          .catch((err) => console.error(`Error updating order ${status}:`, err));
  };
  
    return (
        <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f5f5dc" }}>
            {/* Sidebar */}
            <Sidebar />

            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 3 }}>
                {/* Header */}
                <Header />

                <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", mb: 3 }}>
                    Orders Overview
                </Typography>

                <Grid container spacing={3}>
                    {orders.map((order) => (
                        <Grid item xs={12} sm={6} md={4} key={order._id}>
                            <Card sx={{ backgroundColor: "#1e1e2e", color: "white", borderRadius: 3, p: 2 }}>
                                <CardContent>
                                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                        <Avatar
                                            src={`http://localhost:7002/invent/files/${order.image}`}
                                            alt={order.Itemid?.name || "Product"}
                                            sx={{ width: 50, height: 50, borderRadius: "5px", mr: 2 }}
                                        />
                                        <Typography variant="h6">{order.Itemid?.name || "N/A"}</Typography>
                                    </Box>

                                    <Typography variant="body2">User: {order.Uid?.name || "N/A"}</Typography>
                                    <Typography variant="body2">Quantity: {order.Noitem}</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: "bold", mt: 1 }}>
                                        Price: ₹{order.Price}
                                    </Typography>

                                    {/* Progress Bar (optional, for order status) */}
                                    <LinearProgress
                                        variant="determinate"
                                        value={order.status === "Approved" ? 100 : order.status === "Rejected" ? 0 : 50}
                                        sx={{ mt: 2, height: 8, borderRadius: 2 }}
                                    />

                                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                                    <Button onClick={() => handleStatusChange(order._id, "Approved", order.Uid)}>
  APPROVE
</Button>
<Button onClick={() => handleStatusChange(order._id, "Rejected", order.Uid)}>
  REJECT
</Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Typography variant="body2" sx={{ textAlign: "center", color: "#333", mt: 3 }}>
                    Powered by Pharma One © {new Date().getFullYear()}
                </Typography>
            </Box>
        </Box>
    );
}

import React, { useEffect, useState } from "react";
import { Link} from "react-router";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";

import axios from "axios";
import '../css/Order.css';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Button,
  Stack,
  Box,
  CircularProgress,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)({
  maxWidth: 600,
  margin: "auto",
  padding: 20,
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
  borderRadius: "12px",
  background: "#1c1c1c",
  color: "#fff",
  textAlign: "center",
});

export default function Order() {
  const [state, setState] = useState(null);
  const [qty, setQty] = useState(1);
  const [userID, setUserID] = useState("");
  const { id } = useParams();
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("usertoken");
  
    if (!token) {
      alert("Authentication token missing. Redirecting to login.");
      navigate("/"); // Redirect to login page
      return;
    }
  
    axios
      .get("http://localhost:7002/api/get", { headers: { "auth-token": token } })
      .then((res) => {
        setUser(res.data);
        setUserID(res.data._id);
      })
      .catch((err) => {
        console.error(err);
        alert("Session expired. Please log in again.");
        localStorage.removeItem("usertoken"); // Clear invalid token
        navigate("/"); // Redirect to login page
      });
  }, [navigate]);
  

  useEffect(() => {
    axios
      .get(`http://localhost:7002/invent/singleview/${id}`)
      .then((res) => setState(res.data?.data || {}))
      .catch((err) => console.error("API Error:", err));
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem("usertoken");
    if (!token) {
      alert("Authentication token missing. Please log in again.");
      return;
    }
        axios
      .get("http://localhost:7002/api/get", { headers: { "auth-token": token } })
      .then((res) => {
        setUser(res.data);
        setUserID(res.data._id);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!state) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const handleOrder = async () => {
    if (!userID || !id || !qty || !state.revenue) {
      alert("Missing required data. Please check and try again.");
      return;
    }
  
    const orderData = {
      Uid: userID,
      Itemid: id,
      image: state.image,
      NoItem: qty,
      Price: state.revenue * qty
    };
  
    const token = localStorage.getItem("usertoken");
  
    try {
      const response = await axios.post("http://localhost:7002/order/create", orderData, {
        headers: { "auth-token": token }
      });
      console.log("Order Response:", response.data);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Order Error:", error.response ? error.response.data : error.message);
      alert(`Failed to place order: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
    }
  };
  
  if (!state) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <StyledCard>
      <Typography variant="h4" fontWeight="bold">
        Order Confirmation 🛍️
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, color: "#bbb" }}>
        Hi {user.name || "Customer"}, your order has been received.
      </Typography>
      <Divider sx={{ my: 2, background: "#444" }} />
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
          <CardMedia
            component="img"
            height="100"
            image={
              state.image
                ? `http://localhost:7002/invent/files/${state.image}`
                : "https://via.placeholder.com/100"
            }
            alt="Product Image"
            onError={(e) => (e.target.src = "https://via.placeholder.com/100")}
            sx={{ borderRadius: "8px", width: "100px" }}
          />
          <Box textAlign="left">
            <Typography variant="h6">{state.name || "No Name"}</Typography>
            <Typography variant="body2" sx={{ color: "#bbb" }}>
              {state.notes || "No Description Available"}
            </Typography>
            <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
  Price: ₹{state.revenue ? state.revenue * qty : "*"}
</Typography>

          </Box>
        </Box>

        <Divider sx={{ my: 2, background: "#444" }} />
        <Typography variant="body2">
          <strong>Order ID:</strong> {state._id || "N/A"}
        </Typography>
        <Typography variant="body2">
          <strong>User ID:</strong> {userID || "N/A"}
        </Typography>

        <Box sx={{ mt: 3 }}>
        <TextField
  label="Quantity"
  type="number"
  value={qty}
  onChange={(e) => {
    const newQty = Math.max(1, parseInt(e.target.value) || 1);
    setQty(newQty);
  }}
  inputProps={{ min: 1 }}
  sx={{ width: "100px", background: "#fff", borderRadius: "5px" }}
/>

        </Box>

        <Stack direction="row" spacing={2} sx={{ mt: 4, justifyContent: "center" }}>
        <Link to={'/home'}>
          <Button variant="outlined" color="error">
            Cancel
          </Button>
          </Link>
          <Link to={'/Prepay'}>
          <Button variant="outlined" color="warning">
            Pre-Pay
          </Button>
          </Link>
          <Button variant="contained" color="success" onClick={handleOrder}>
            Order Now
          </Button>
        </Stack>
      </CardContent>
    </StyledCard>
  );
}

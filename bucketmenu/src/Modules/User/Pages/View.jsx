import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // ✅ Import useNavigate
import Axios from "axios";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "../css/View.css";

export default function View() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();  // ✅ Hook for navigation

  useEffect(() => {
    Axios.get("http://localhost:7002/invent/Home")
      .then((res) => {
        console.log("API Response:", res.data);
        setData(res.data?.data || []);
      })
      .catch((err) => {
        console.error("API Error:", err);
      });
  }, []);

  return (
    <div className="view-container">
      {data.length > 0 ? (
        data.map((item, index) => (
          <Card key={index} className="card-container" onClick={() => navigate(`/singleview/${item._id}`)} style={{ cursor: "pointer" }}>
            <CardHeader title={item?.name || "No Name"} className="card-title" />
            <CardMedia
              component="img"
              className="card-image"
              image={item?.image ? `http://localhost:7002/invent/files/${item.image}` : "https://via.placeholder.com/180"}
              alt="Item Image"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/180"; }}
            />
            <CardContent className="card-content">
              <Typography variant="body2" className="card-text">{item?.revenue || "No Revenue"}</Typography>
              <Typography variant="body2" className="card-text">{item?.status || "No Status"}</Typography>
              <Typography variant="body2" className="card-text">{item?.category || "No Category"}</Typography>

              {/* ✅ Fix: Use Button with useNavigate instead of nested <Link> */}
              <div className="order-button">
                <Button variant="contained" color="success" onClick={(e) => { 
                  e.stopPropagation(); // Prevent Card's onClick from triggering
                  navigate(`/Order/${item._id}`);
                }}>
                  ORDER
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="h6">No data available</Typography>
      )}
    </div>
  );
}

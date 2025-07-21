import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
  Divider,
  Box,
  Button,
  Skeleton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Axios from "axios";

// Expand More Button Styling
const ExpandMore = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "expand",
})(({ expand, theme }) => ({
  transform: expand ? "rotate(180deg)" : "rotate(0deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

// Container Styling
const StyledContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  padding: "20px",
  backgroundColor: "#f9f9f9",
});

// Card Styling
const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: "850px",
  backgroundColor: "#ffffff",
  borderRadius: "20px",
  boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
  overflow: "hidden",
}));

// Image Styling
const StyledImage = styled(CardMedia)({
  height: 360,
  width: "100%",
  objectFit: "cover",
  borderRadius: "10px",
});

// Button Styling
const StyledOrderButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#2e7d32",
  color: "#fff",
  fontWeight: 600,
  padding: "10px 30px",
  borderRadius: "25px",
  fontSize: "15px",
  "&:hover": {
    backgroundColor: "#1b5e20",
  },
  "&:disabled": {
    backgroundColor: "#bdbdbd",
    color: "#616161",
    cursor: "not-allowed",
  },
}));

export default function SingleView() {
  const [expanded, setExpanded] = useState(false);
  const { id } = useParams();
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`http://localhost:7002/invent/singleview/${id}`)
      .then((res) => {
        setState(res.data?.data || {});
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, [id]);

  const handleExpandClick = () => setExpanded(!expanded);

  return (
    <StyledContainer>
      <StyledCard>
        {loading ? (
          <Box p={3}>
            <Skeleton variant="text" width="60%" height={30} />
            <Skeleton variant="rectangular" width="100%" height={360} />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="90%" />
            <Skeleton variant="rectangular" width="100%" height={50} />
          </Box>
        ) : (
          <>
            <CardHeader
              title={
                <Typography variant="h4" fontWeight={700} align="center" color="primary">
                  {state?.name || "Unnamed Product"}
                </Typography>
              }
            />
            <StyledImage
              component="img"
              image={
                state?.image
                  ? `http://localhost:7002/invent/files/${state.image}`
                  : "https://via.placeholder.com/400"
              }
              alt="Product"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <strong>Price:</strong> {state?.revenue || "N/A"}
              </Typography>
              <Typography variant="body1" gutterBottom color="text.secondary">
                <strong>Status:</strong> {state?.status || "N/A"}
              </Typography>
              <Typography variant="body1" gutterBottom color="text.secondary">
                <strong>Category:</strong> {state?.category || "N/A"}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body2" color="text.secondary">
                {state?.notes || "No additional details available."}
              </Typography>

              <Box textAlign="center" mt={4}>
                <Link to={`/Order/${state._id}`} style={{ textDecoration: "none" }}>
                  <StyledOrderButton
                    variant="contained"
                    disabled={state?.status?.toLowerCase() === "out of stock"}
                  >
                    ORDER
                  </StyledOrderButton>
                </Link>
              </Box>
            </CardContent>

            <CardActions disableSpacing sx={{ px: 3 }}>
              <Typography variant="body2" color="primary">
                More Info
              </Typography>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant="body1" fontWeight="bold" gutterBottom>
                  Additional Product Details:
                </Typography>
                <Typography variant="body2">
                  {state?.notes || "No additional details available."}
                </Typography>
              </CardContent>
            </Collapse>
          </>
        )}
      </StyledCard>
    </StyledContainer>
  );
}

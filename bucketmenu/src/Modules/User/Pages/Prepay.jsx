import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Stack,
  Divider,
  Box,
  Snackbar,
  Alert
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";

// Styled components and providers are unchanged
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 500,
  margin: "auto",
  padding: 20,
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
  borderRadius: "16px",
  background: "#ffffff", // white card
  color: "#000", // black text
  textAlign: "center",
}));

const upiProviders = [
  { value: "paytm", label: "Paytm", link: "https://paytm.com/" },
  { value: "gpay", label: "Google Pay", link: "https://pay.google.com/" },
  { value: "phonepe", label: "PhonePe", link: "https://www.phonepe.com/" },
  { value: "amazonpay", label: "Amazon Pay", link: "https://www.amazon.in/amazonpay/home" },
];

export default function Prepay() {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCVV] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card"); // "card" or "upi"

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // 'success', 'error', 'info', etc.

  const handleAddPayment = async () => {
    if (paymentMethod === "card") {
      if (!cardName || !cardNumber || !expiry || !cvv) {
        setSnackbarMessage("All card fields are required.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        return;
      }

      if (!/^\d{13,19}$/.test(cardNumber)) {
        setSnackbarMessage("Invalid card number. Must be 13-19 digits.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        return;
      }

      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
        setSnackbarMessage("Invalid expiry. Use MM/YY format.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        return;
      }

      if (!/^\d{3,4}$/.test(cvv)) {
        setSnackbarMessage("Invalid CVV. Must be 3 or 4 digits.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        return;
      }

      const cardData = {
        CardName: cardName,
        Cardid: cardNumber,
        Expiry: expiry,
        UpiId: "",
        UpiProvider: "",
      };

      try {
        const response = await axios.post("http://localhost:7002/online/in", cardData);
        setSnackbarMessage("payment successfull!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      } catch (err) {
        console.error("Error adding card:", err.response?.data || err.message);
        setSnackbarMessage("Failed to add card.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    }
  };

  const handleUpiRedirect = (link) => {
    window.open(link, "_blank"); // Open the UPI provider's link in a new tab
  };

  return (
    <Box sx={{ backgroundColor: "#f5f7fa", minHeight: "100vh", py: 5 }}>
      <StyledCard>
        <Typography variant="h5" gutterBottom>
          Prepay
        </Typography>
        <Divider sx={{ my: 2, background: "#ccc" }} />
        <CardContent>
          <Stack spacing={2}>
            {/* Select Payment Method */}
            <Stack direction="row" spacing={2}>
              <Button
                variant={paymentMethod === "card" ? "contained" : "outlined"}
                color="primary"
                onClick={() => setPaymentMethod("card")}
                fullWidth
              >
                Card Payment
              </Button>
              <Button
                variant={paymentMethod === "upi" ? "contained" : "outlined"}
                color="primary"
                onClick={() => setPaymentMethod("upi")}
                fullWidth
              >
                UPI Payment
              </Button>
            </Stack>

            {/* Conditional Rendering for Card Fields */}
            {paymentMethod === "card" && (
              <>
                <TextField
                  label="Card Number"
                  variant="outlined"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  inputProps={{ maxLength: 16 }}
                  fullWidth
                  sx={{ background: "#f9f9f9", borderRadius: "5px" }}
                />
                <TextField
                  label="Cardholder Name"
                  variant="outlined"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  fullWidth
                  sx={{ background: "#f9f9f9", borderRadius: "5px" }}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Expiry"
                    variant="outlined"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    inputProps={{ maxLength: 5 }}
                    sx={{ background: "#f9f9f9", borderRadius: "5px", flex: 1 }}
                  />
                  <TextField
                    label="CVV"
                    variant="outlined"
                    type="password"
                    value={cvv}
                    onChange={(e) => setCVV(e.target.value)}
                    inputProps={{ maxLength: 4 }}
                    sx={{ background: "#f9f9f9", borderRadius: "5px", flex: 1 }}
                  />
                </Stack>
              </>
            )}

            {/* Conditional Rendering for UPI Fields */}
            {paymentMethod === "upi" && (
              <>
                {/* Buttons for each UPI provider */}
                {upiProviders.map((provider) => (
                  <Button
                    key={provider.value}
                    variant="outlined"
                    onClick={() => handleUpiRedirect(provider.link)}
                    fullWidth
                  >
                    {provider.label}
                  </Button>
                ))}
              </>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={handleAddPayment}
              size="large"
              sx={{ mt: 3 }}
            >
              Pay {paymentMethod === "card" ? "" : "UPI"}
            </Button>
          </Stack>
        </CardContent>
      </StyledCard>

      {/* Snackbar for Alerts */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

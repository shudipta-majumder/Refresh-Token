import { Box, Typography } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";

const SessionModal = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px 150px",
          gap: "20px",
        }}
      >
        <Typography>Session Name</Typography>
        <TextField
          sx={{ backgroundColor: "#F8F7FA", border: 0, borderRadius: "10px" }}
          border="none"
          className="max-w-[400px]"
          fullWidth
          size="small"
          placeholder="Type Here"
        />
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          size="small"
          type="submit"
          sx={{
            background: "linear-gradient(45deg, #786CF1 50%, #978DF3 80%)",
            ":hover": {
              bgcolor: "#796EF1",
            },
            padding: "5px 30px",
            fontWeight: "700",
          }}
        >
          ADD NEW
        </Button>
      </Box>
    </Box>
  );
};

export default SessionModal;

"use client";
import { IconButton, TextField, InputAdornment, Backdrop } from "@mui/material";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import ExamRoutineTable from "../../../../Components/Pagecomponents/Exam/AllTable/ExamRoutineTable";
import Icon from "../../../../Components/icon/page";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@mui/styles";
import ExamRoutineModal from "../../../../Components/Pagecomponents/Exam/AllModal/ExamRoutineModal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  p: 4,
};

const useStyles = makeStyles((theme) => ({
  blurBackdrop: {
    backdropFilter: "blur(5px)",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
}));

const page = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "0px 30px",
          mt: "10px",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "600" }}>
          All Exam Routine
        </Typography>
        <Button
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
          onClick={handleOpen}
        >
          Genarate New
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ExamRoutineModal />
          </Box>
        </Modal>
        <Backdrop
          className={classes.blurBackdrop}
          open={open}
          onClick={handleClose}
        />
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "20px 10px",
          mt: "10px",
        }}
      >
        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", p: "0px 20px", mb: "10px" }}>
          <TextField
            sx={{ backgroundColor: "#F8F7FA", border: 0, borderRadius: "10px" }}
            border="none"
            className="max-w-[400px]"
            fullWidth
            size="small"
            margin="dense"
            placeholder="Search Here"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <Icon icon="ion:search-outline" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{display: "flex", flexDirection: "row",gap: "8px"}}>
            <Icon className="text-[#766AF0] text-[30px]" icon="eva:file-outline" />
            <Icon className="text-[#766AF0] text-[30px]"  icon="ph:file-x-duotone" />
            <Icon className="text-[#766AF0] text-[30px]"  icon="teenyicons:pdf-outline" />
            <Icon className="text-[#766AF0] text-[30px]"  icon="teenyicons:print-solid" />
          </Box>
        </Box>
        <ExamRoutineTable />
      </Box>
    </Box>
  );
};

export default page;

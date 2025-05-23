"use client";
import { Backdrop } from "@mui/material";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@mui/styles";
import StaffModal from "./StaffModal";
import { useOnlyIcon } from "../../../Layout/NavContext";
import Link from "next/link";

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
    backdropFilter: "blur(2px)",
    backgroundColor: "transparent",
    zIndex: 500,
  },
}));

const page = ({session}) => {
  const accessToken = session?.user?.data?.token?.access;
  const menuData = session.user.data.menus;
  const { color, colorX } = useOnlyIcon();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Extracting permissions for the "Staff" submenu
  const academicMenu = menuData
    ? menuData.find((menu) => menu.name === "Human Resource")
    : null;
  const StaffSubMenu = academicMenu?.sub_menu
    ? academicMenu.sub_menu.find(
        (subMenu) => subMenu.name === "Staff Directory"
      )
    : null;
  const StaffPermissions = StaffSubMenu?.permission || [];

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
          Staff List
        </Typography>
        {StaffPermissions && StaffPermissions.includes("create") ? (
          <Link href={`/human-resource/staff-directory/create`}>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              size="small"
              type="submit"
              sx={{
                background: `${`linear-gradient(45deg, ${color} 30%, ${colorX} 90%)`}`,
                ":hover": {
                  bgcolor: "#796EF1",
                },
                padding: "5px 30px",
                fontWeight: "700",
              }}
            >
              ADD NEW
            </Button>
          </Link>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default page;

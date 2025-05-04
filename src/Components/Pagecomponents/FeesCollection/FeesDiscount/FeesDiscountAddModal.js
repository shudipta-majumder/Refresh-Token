"use client";
import { Box, Typography } from "@mui/material";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Grid from "@mui/material/Grid";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { makeStyles } from "@mui/styles";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
// import { styled } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  labelContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#F8F7FA",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 10px",
    border: "2px dashed #cccccc",
    borderRadius: "4px",
    cursor: "pointer",
  },
  labelContainerActive: {
    border: "2px dashed green",
    backgroundColor: "#f0f0f0",
  },
  labelContainerErroe: {
    border: "2px dashed #FF0000",
    backgroundColor: "#560319",
  },
  icon: {
    fontSize: 40,
    marginBottom: 3,
    color: "#786CF1",
  },
  text: {
    fontSize: "10px",
  },
  avatar: {
    width: 100,
    height: 100,
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const subjectSchema = yup.object().shape({
  name: yup.string().required("This field may not be blank."),
  percentage: yup.string(),
  description: yup.string(),
  remarks: yup.string(),
});

const FeesDiscountAddModal = ({
  handleAddModalClose,
  setAddFeeTypes,
  accessToken,
}) => {
  console.log("add modal click");
  const classes = useStyles();

  //   const [sectionRowData, setSectionRowData] = useState(editingRow);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      percentage: "",
      amount: "",
      description: "",
      remarks: "",
    },
    resolver: yupResolver(subjectSchema),
    // validateCriteriaMode: "all",
  });

  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };

  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };

  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );

  const onSubmit = async (data) => {
    const convertToLowerCase = data.name.toLowerCase();
    const convertCode = convertToLowerCase.replace(/\s+/g, "-");
    console.log("space", convertCode);
    const feesTypeData = {
      name: data?.name,
      code: convertCode,
      percentage: data?.percentage,
      amount: data?.amount,
      description: data?.description,
      remarks: data?.remarks,
    };

    let response;
    let responseData;
    try {
      response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/fees/api/fees-discount`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(feesTypeData),
        }
      );
      console.log("object", response);

      responseData = await response.json();
      setAddFeeTypes(responseData);
      console.log("fees data:", responseData);

      if (responseData.code == 400) {
        toast.error(`${responseData.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        throw new Error("Network response was not ok");
      }
      if (responseData.code == 401) {
        toast.error("Permission denied", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        throw new Error("Network response was not ok");
      }
      if (responseData.code == 200) {
        handleAddModalClose();
        // setSubjectSaved();
        toast.success(
          `Successfully ${responseData.data.class_name.name} Board Saved`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box
      sx={{
        boxShadow:
          " 1px 1px 3px rgba(0, 0, 0, 0.1), -1px -1px 3px rgba(0, 0, 0, 0.1)",
        p: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ textAlign: "center" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography sx={{ ml: "15px" }}>Name</Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      label="Write Name"
                      helperText={error?.message}
                      //   autoComplete="new-password"
                      fullWidth
                      size="small"
                      placeholder="Type Here"
                    ></TextField>
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography sx={{ ml: "15px" }}>Percentage</Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="percentage"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      label="Write Percentage"
                      helperText={error?.message}
                      //   autoComplete="new-password"
                      fullWidth
                      size="small"
                      placeholder="Type Here"
                    ></TextField>
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography sx={{ ml: "15px" }}>Amount</Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="amount"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      label="Write Amount"
                      helperText={error?.message}
                      //   autoComplete="new-password"
                      fullWidth
                      size="small"
                      placeholder="Type Here"
                    ></TextField>
                  )}
                />
              </Box>
            </Grid>
            <Grid item md={12}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography sx={{ ml: "15px" }}>Remarks</Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="remarks"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      error={!!error}
                      label="Write Remarks"
                      helperText={error?.message}
                      //   autoComplete="new-password"
                      fullWidth
                      size="small"
                      placeholder="Type Here"
                    ></TextField>
                  )}
                />
              </Box>
            </Grid>
            <Grid item md={12}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                  <Typography sx={{ ml: "15px" }}>Description</Typography>
                  <Typography sx={{ color: "#786CF1", fontSize: "20px" }}>
                    *
                  </Typography>
                </Box>
                <Controller
                  name="description"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <Textarea
                      {...field}
                      minRows={3}
                      aria-label="maximum height"
                      error={!!error}
                      label="Wrtie Description"
                      sx={{ textAlign: "left" }}
                      helperText={error?.message}
                      //   fullWidth
                      size="small"
                      placeholder="Type Here"
                    ></Textarea>
                  )}
                />
              </Box>
            </Grid>
            <Grid
              item
              // sm={6}
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                mt: "10px",
              }}
            >
              <Button
                variant="contained"
                size="small"
                type="submit"
                sx={{
                  background:
                    "linear-gradient(45deg, #786CF1 50%, #978DF3 80%)",
                  ":hover": {
                    bgcolor: "#796EF1",
                  },
                  padding: "5px 30px",
                  marginRight: "10px",
                  fontWeight: "700",
                }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={handleAddModalClose}
                color="error"
                sx={{
                  padding: "5px 30px",
                  fontWeight: "700",
                }}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default FeesDiscountAddModal;

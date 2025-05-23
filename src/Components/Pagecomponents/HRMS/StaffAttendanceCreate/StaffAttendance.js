"use client";
import {
  Box,
  MenuItem,
  Typography,
  Backdrop,
  Divider,
  IconButton,
} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@mui/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Icon } from "@iconify/react";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: "600",
    color: theme.palette.common.black,
    backgroundColor: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: "500",
    padding: "5px 10px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#E8E7FD",
  },
  "&:last-of-type td, &:last-of-type th": {
    border: 0,
  },
}));

const pagenationStyle = {
  "& .MuiTablePagination-spacer": {
    order: 2,
  },
  "& .MuiTablePagination-selectLabel": {
    order: 0,
  },
  "& .MuiTablePagination-select": {
    order: 1,
  },
  "& .MuiTablePagination-displayedRows": {
    order: 3,
  },
  "& .MuiTablePagination-actions": {
    order: 4,
  },
};

const menuItemStyle = {
  MenuProps: {
    sx: {
      ".MuiTablePagination-menuItem": {
        ml: "3px",
        mr: "3px",
        mb: "3px",
        borderRadius: "5px",
      },
      ".MuiTablePagination-menuItem.Mui-selected": {
        ml: "3px",
        mr: "3px",
        color: "white",
        borderRadius: "5px",
        backgroundColor: "#7367F0",
        ":hover": {
          backgroundColor: "#7367F1",
        },
      },
    },
  },
};

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
  datePicker: {
    "& .MuiIconButton-root": {
      color: "#7A6EF1",
    },
  },
}));

const StaffAttendance = ({
  isLoading,
  error,
  count,
  employeesData,
  page,
  handleChangeRowsPerPage,
  handleChangePage,
  rowsPerPage,
  rows,
  columns,
  collectionofID,
  employeeID,
  selectedDate,
  accessToken,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [remarksSchema, setRemarksSchema] = useState(null);

  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event, newValue) => {
    setPersonName(newValue);
  };

  useEffect(() => {
    if (collectionofID.length > 0) {
      const generateRemarksScema = (idall) => {
        const schema = {};
        console.log("vfr", idall);
        idall.forEach((entry) => {
          schema[`outtime_${entry}`] = yup.string();
          schema[`intime_${entry}`] = yup.string();
          schema[`remarks_${entry}`] = yup
            .string()
            .required("This field may not be blank.");
        });

        return yup.object().shape(schema);
      };

      const personalInfoSchema = [generateRemarksScema(collectionofID)];
      setRemarksSchema(personalInfoSchema[0]);
    }
  }, [collectionofID]);

  const defaultValues = {
    remarks: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(remarksSchema),
  });

  const onSubmit = async (data) => {
    const dataToSend = {
      raw_atten: collectionofID.flatMap((entry) => [
        {
          staff: entry,
          attn_date: dayjs(selectedDate).format("YYYY-MM-DD"),
          trnsc_time: dayjs(data[`intime_${entry}`]).format(
            "YYYY-MM-DDTHH:mm:ss"
          ),
          src_type: "MANUAL",
          attn_type: "IN",
          remarks: data[`remarks_${entry}`],
        },
        {
          staff: entry,
          attn_date: dayjs(selectedDate).format("YYYY-MM-DD"),
          trnsc_time: dayjs(data[`outtime_${entry}`]).format(
            "YYYY-MM-DDTHH:mm:ss"
          ),
          src_type: "MANUAL",
          attn_type: "OUT",
          remarks: data[`remarks_${entry}`],
        },
      ]),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/staff/api/raw/attendance/entry`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      }
    );
    const responseData = await response.json();
    console.log("responseData", responseData);
    if (responseData.code == 200) {
      toast.success(`${responseData.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: { marginTop: "70px" },
      });
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Box sx={{ backgroundColor: "white", p: 2 }}>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : employeesData ? (
          <Box
            sx={{
              backgroundColor: "white",
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ textAlign: "center" }}
            >
              <Table stickyHeader aria-label="sticky table" size="small">
                <TableHead>
                  <StyledTableRow>
                    {columns.map((column) => (
                      <StyledTableCell
                        key={column.id}
                        align={column.align}
                        sx={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                </TableHead>
                <TableBody size="small">
                  {rows &&
                    rows.map((row) => (
                      <StyledTableRow
                        sx={{
                          "&:hover": {
                            backgroundColor: "#eed3ff",
                          },
                        }}
                        tabIndex={-1}
                        key={row.ids}
                      >
                        {columns.map((column) => (
                          <StyledTableCell key={column.id} align={column.align}>
                            { column.id === "intime" ? (
                              <>
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <DemoContainer
                                    components={[
                                      "TimePicker",
                                      "MobileTimePicker",
                                      "DesktopTimePicker",
                                      "StaticTimePicker",
                                    ]}
                                  >
                                    <DemoItem>
                                      <Controller
                                        name={`intime_${row.ids}`}
                                        control={control}
                                        render={({
                                          field,
                                          fieldState: { error },
                                        }) => (
                                          <TimePicker
                                            minutesStep={1}
                                            {...field}
                                            error={!!error}
                                            helperText={error?.message}
                                            className={classes.datePicker}
                                            sx={{ backgroundColor: "#F8F7FA" }}
                                            fullWidth
                                            slotProps={{
                                              textField: { size: "small" },
                                            }}
                                            defaultValue={dayjs(
                                              "2022-04-17T09:00"
                                            )}
                                          />
                                        )}
                                      />
                                    </DemoItem>
                                  </DemoContainer>
                                </LocalizationProvider>
                              </>
                            ) : column.id === "outtime" ? (
                              <>
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <DemoContainer
                                    components={[
                                      "TimePicker",
                                      "MobileTimePicker",
                                      "DesktopTimePicker",
                                      "StaticTimePicker",
                                    ]}
                                  >
                                    <DemoItem>
                                      <Controller
                                        name={`outtime_${row.ids}`}
                                        control={control}
                                        render={({
                                          field,
                                          fieldState: { error },
                                        }) => (
                                          <TimePicker
                                            {...field}
                                            error={!!error}
                                            helperText={error?.message}
                                            className={classes.datePicker}
                                            sx={{ backgroundColor: "#F8F7FA" }}
                                            fullWidth
                                            slotProps={{
                                              textField: { size: "small" },
                                            }}
                                            defaultValue={dayjs(
                                              "2022-04-17T18:00"
                                            )}
                                          />
                                        )}
                                      />
                                    </DemoItem>
                                  </DemoContainer>
                                </LocalizationProvider>
                              </>
                            ) : column.id === "remarks" ? (
                              <>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "6px",
                                  }}
                                >
                                  <Controller
                                    name={`remarks_${row.ids}`}
                                    control={control}
                                    render={({
                                      field,
                                      fieldState: { error },
                                    }) => (
                                      <TextField
                                        {...field}
                                        error={!!error}
                                        helperText={error?.message}
                                        fullWidth
                                        size="small"
                                        placeholder="Type Here"
                                        sx={{
                                          ".MuiSelect-icon": {
                                            color: "#786CF1",
                                          },
                                          backgroundColor: "#F8F7FA",
                                        }}
                                      />
                                    )}
                                  />
                                </Box>
                              </>
                            ) : (
                              row[column.id]
                            )}
                          </StyledTableCell>
                        ))}
                      </StyledTableRow>
                    ))}

                  {console.log("table all rows changed", rows)}
                </TableBody>
              </Table>

              <TablePagination
                sx={pagenationStyle}
                SelectProps={menuItemStyle}
                rowsPerPageOptions={[10, 20, 30, 50, 500]}
                component="div"
                count={count}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
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
                  fontWeight: "700",
                }}
              >
                Save
              </Button>
            </Box>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default StaffAttendance;

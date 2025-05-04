"use client";
import { Box, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { makeStyles } from "@mui/styles";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import { styled } from "@mui/system";
import Link from "next/link";

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
  employeesTableData,
  page,
  handleChangeRowsPerPage,
  handleChangePage,
  rowsPerPage,
  rows,
  columns,
}) => {
  const classes = useStyles();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Box sx={{ backgroundColor: "white", p: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            padding: "0px 30px",
            mb: "10px",
          }}
        >
          <Link href="/human-resource/staff-attendance/create">
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
              NEW
            </Button>
          </Link>
        </Box>
        <Divider />

        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : employeesTableData ? (
          <Box
            sx={{
              backgroundColor: "white",
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box>
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
                            {row[column.id]}
                          </StyledTableCell>
                        ))}
                      </StyledTableRow>
                    ))}
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

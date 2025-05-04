"use client";
// ** React Imports
import { useState } from "react";

// ** MUI Imports
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TablePagination from "@mui/material/TablePagination";
import { Pagination, PaginationItem } from "@mui/material";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import ICON from "../../../icon/page";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: "600",
    color: theme.palette.common.black,
    backgroundColor: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: "500",
    padding: "0px 10px",
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

const columns = [
  { id: "hash", label: "#", align: "center" },
  { id: "subject", label: "Subject", align: "center" },
  {
    id: "exam",
    label: "Exam",
    align: "center",
  },
  {
    id: "examdate",
    label: "Exam Date",
    align: "center",
  },
  {
    id: "version",
    label: "Version",
    align: "center",
  },
  {
    id: "classe",
    label: "Class",
    align: "center",
  },
  {
    id: "section",
    label: "Section",
    align: "center",
  },
  {
    id: "room",
    label: "Room",
    align: "center",
  },
  {
    id: "gurd",
    label: "Gurd",
    align: "center",
  },
  {
    id: "starttime",
    label: "Start Time",
    align: "center",
  },
  {
    id: "endtime",
    label: "End Time",
    align: "center",
  },
  {
    id: "duration",
    label: "Duration",
    align: "center",
  },
  {
    id: "action",
    label: "Action",
    align: "center",
  },
];
function createData(
  hash,
  subject,
  exam,
  examdate,
  version,
  classe,
  section,
  room,
  gurd,
  starttime,
  endtime,
  duration,
  action
) {
  //another return const add
  return {
    hash,
    subject,
    exam,
    examdate,
    version,
    classe,
    section,
    room,
    gurd,
    starttime,
    endtime,
    duration,
    action,
  };
}

const rows = [
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
  createData(
    "01",
    "Bangla",
    "Mid",
    "14/12/2023",
    "A",
    "112",
    "TEN",
    "B",
    "1412",
    "Shudipta Mazumdar",
    "11:30",
    "04:30",
    "2 Hours"
  ),
];

const StudentsDetailsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
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
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => {
              return (
                <StyledTableRow
                  sx={{
                    "&:hover": {
                      backgroundColor: "#E0B0FF",
                    },
                  }}
                  tabIndex={-1}
                  key={row.code}
                >
                  {columns.map((column) => {
                    const value = row[column.id];

                    return (
                      <StyledTableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          fontWeight:
                            column.id === "firstname" ||
                            column.id === "admissionno"
                              ? 700
                              : "normal",
                        }}
                      >
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}

                        {column.id === "action" ? (
                          <>
                            <IconButton>
                              <ICON className="text-[#8E84F3]" icon="ep:edit" />
                            </IconButton>
                            <span className="text-pink-300">|</span>
                            <IconButton>
                              <ICON
                                className="text-rose-700"
                                icon="uiw:delete"
                              />
                            </IconButton>
                          </>
                        ) : (
                          ""
                        )}
                        {column.id === "thumbail" ? (
                          <>
                            <Image
                              src="/images/book.webp"
                              width={50}
                              height={50}
                              alt="Picture of the author"
                            />
                          </>
                        ) : (
                          ""
                        )}
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
        </TableBody>
      </Table>

      <TablePagination
        // rowsPerPageOptions={[8, 16, 32, 48]}
        component="div"
        count={100}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default StudentsDetailsTable;

"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TablePagination from "@mui/material/TablePagination";
import { Box, Pagination, TableSortLabel } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { TextField, InputAdornment, Backdrop } from "@mui/material";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Modal from "@mui/material/Modal";
import { makeStyles } from "@mui/styles";
import { Icon } from "@iconify/react";
const MySwal = withReactContent(Swal);

const swalWithMuiButtons = MySwal.mixin({
  customClass: {
    confirmButton:
      "MuiButtonBase-root MuiButton-contained MuiButton-containedSuccess",
    cancelButton:
      "MuiButtonBase-root MuiButton-contained MuiButton-containedError",
  },
  buttonsStyling: true,
});

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
    backdropFilter: "blur(1px)",
    backgroundColor: "transparent",
    zIndex: 500,
    "& .MuiModal-backdrop": {
      backgroundColor: "transparent",
    },
  },
}));

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

const columns = [
  { id: "serial", label: "SL", align: "center" },
  // { id: "ids", label: "ID", align: "center" },
  { id: "section", label: "Section", align: "center", sortable: true },
  { id: "classname", label: "Class Name", align: "center", sortable: true },
  {
    id: "day",
    label: "Day",
    align: "center",
    sortable: true,
  },
  {
    id: "teachername",
    label: "Teacher Name",
    align: "center",
  },
  {
    id: "action",
    label: "Action",
    align: "center",
  },
];
function createData(
  serial,
  ids,
  section,
  classname,
  day,
  districtId,
  teachername,
  permissions,
  RoutineDetails,
  action
) {
  return {
    serial,
    ids,
    section,
    classname,
    day,
    districtId,
    teachername,
    permissions,
    RoutineDetails,
    action,
  };
}

const ThanaTable = ({ session }) => {
  const accessToken = session?.user?.data?.token?.access;
  const menuData = session.user.data.menus;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  const [ThanaData, setThanaData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState("asc");
  const [editingRow, setEditingRow] = useState(null);
  const [editedThanaName, setEditedThanaName] = useState("");
  const [beforeThanaName, setBeforeThanaName] = useState(null);
  const [count, setCount] = useState(0);
  const [deleteTrigered, setDeleteTrigered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noPermission, setNoPermission] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [editRowData, setEditRowData] = useState(null);

  const academicMenu = menuData
    ? menuData.find((menu) => menu.name === "Academic")
    : null;
  const ThanaSubMenu = academicMenu?.sub_menu
    ? academicMenu.sub_menu.find((subMenu) => subMenu.name === "Class Routine")
    : null;
  const ThanaPermissions = ThanaSubMenu?.permission || [];

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    // console.log("page number", page + 1);
    fetch(
      `${
        process.env.NEXT_PUBLIC_HOST
      }/academic/api/v2/class-routine?page_number=${
        page + 1
      }&page_size=${rowsPerPage}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        if (responseData.code == 200) {
          setThanaData(responseData);
          setCount(responseData.pagination.count);
          setDeleteTrigered(false);
          setIsLoading(false);
        }
        if (responseData.code == 401) {
          setIsLoading(false);
          setNoPermission(true);
        }
      })
      .catch((fetchError) => {
        setError(fetchError);
        setIsLoading(false);
      });
  }, [deleteTrigered, page, rowsPerPage, editingRow]);

  console.log("classRoutinetabledata", ThanaData);
  const rows = ThanaData?.data.map((item, index) => {
    const permissions = ThanaPermissions || [];
    const currentIndex = page * rowsPerPage + index + 1;

    const RoutineDetails = item.routine_dtl.map((routineitem, index) => {
      return routineitem?.day?.long_name;
    });
    // console.log("item", item)
    console.log("RoutineDetails", RoutineDetails);

    return createData(
      currentIndex.toString(),
      item.id,
      item.section?.section,
      item.class_name?.name || "N/A",
      item.district?.name || "N/A",
      item.district?.id,
      item.updated_by,
      permissions,
      RoutineDetails
    );
  });

  const handleSort = (columnId) => {
    if (columnId === orderBy) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setOrderBy(columnId);
      setOrder("asc");
    }
  };

  const sortedRows = orderBy
    ? rows.slice().sort((a, b) => {
        const isAsc = order === "asc";

        if (orderBy === "Thananame") {
          const yearA = parseInt(a[orderBy].match(/\d+/));
          const yearB = parseInt(b[orderBy].match(/\d+/));

          if (yearA !== yearB) {
            // If years are different, sort by year
            return isAsc ? yearA - yearB : yearB - yearA;
          } else {
            // If years are the same, sort by row index to maintain stability
            return rows.indexOf(a) - rows.indexOf(b);
          }
        } else if (orderBy === "startdate") {
          const dateA = new Date(a[orderBy]);
          const dateB = new Date(b[orderBy]);

          return isAsc ? dateA - dateB : dateB - dateA;
        }
        return isAsc
          ? a[orderBy].localeCompare(b[orderBy])
          : b[orderBy].localeCompare(a[orderBy]);
      })
    : rows;

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (id, deletedThanaName) => {
    swalWithMuiButtons
      .fire({
        title: "Are you sure?",
        html: `You won't be able to revert <b>${deletedThanaName}!</b>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(
            `${process.env.NEXT_PUBLIC_HOST}/setup/api/thana/delete/${id}`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                // Authorization: `Bearer ${refreshToken}`,
              },
            }
          )
            .then((response) => {
              return response.json();
            })
            .then((responseData) => {
              if (responseData.code == 200) {
                const filterdData = ThanaData.data.filter(
                  (Thana) => Thana.id !== id
                );
                setThanaData({ ...ThanaData, data: filterdData });
                setDeleteTrigered(true);
                swalWithMuiButtons.fire(
                  "Deleted!",
                  `Thana <b>${deletedThanaName}</b> has been deleted.`,
                  "success"
                );
              }
              if (responseData.code == 401) {
                toast.error(`Permission Denied`, {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              } else {
                // Handle errors here
              }
            })
            .catch((error) => {
              console.error("Error deleting data:", error);
            });
        } else if (result.dismiss === MySwal.DismissReason.cancel) {
          swalWithMuiButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };

  const handleEdit = (rowids, ThanaName) => {
    setEditingRow(rowids);
    setEditedThanaName(ThanaName);
    setBeforeThanaName(ThanaName);
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
    setEditedThanaName("");
  };

  const filteredRows = (sortedRows || []).filter((row) => {
    return row.classname.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : noPermission ? (
        <h1>you have no permission to view</h1>
      ) : ThanaData ? (
        <>
          <Box>
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "20px 10px",
                mt: "10px",
              }}
            >
              <Box sx={{ ml: "20px", mb: "10px" }}>
                <TextField
                  color="secondary"
                  sx={{
                    backgroundColor: "#F8F7FA",
                    "& input::placeholder": {
                      fontSize: "13px",
                    },
                  }}
                  className="max-w-[400px]"
                  fullWidth
                  size="small"
                  margin="dense"
                  placeholder="Search Here"
                  onChange={handleSearch}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end" sx={{ color: "#7367f0" }}>
                          <Icon icon="ion:search-outline" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Table stickyHeader aria-label="sticky table" size="small">
                <TableHead>
                  <StyledTableRow>
                    {columns.map((column) => (
                      <StyledTableCell
                        key={column.id}
                        align={column.align}
                        sx={{ minWidth: column.minWidth }}
                      >
                        {column.sortable ? (
                          <TableSortLabel
                            active={orderBy === column.id}
                            direction={orderBy === column.id ? order : "asc"}
                            onClick={() => handleSort(column.id)}
                          >
                            {column.label}
                          </TableSortLabel>
                        ) : (
                          column.label
                        )}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                </TableHead>
                <TableBody size="small">
                  {filteredRows.map((row) => (
                    <>
                      <>{console.log("rows", row)}</>
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
                            {column.id === "Thananame" &&
                            editingRow === row.ids ? (
                              <TextField
                                width="200px"
                                size="small"
                                value={editedThanaName}
                                onChange={(e) =>
                                  setEditedThanaName(e.target.value)
                                }
                                sx={{
                                  border: "none",
                                  "& input": {
                                    textAlign: "center",
                                    "&:focus": {
                                      outline: "none",
                                    },
                                    height: "18px",
                                  },
                                }}
                              />
                            ) : (
                              row[column.id]
                            )}

                            {column.id === "action" ? (
                              <>
                                {editingRow === row.ids ? (
                                  <>
                                    <IconButton
                                      onClick={() => handleSave(row.ids)}
                                    >
                                      <Icon
                                        className="text-[#8E84F3]"
                                        icon="ion:checkmark-outline"
                                      />
                                    </IconButton>
                                    <span className="text-pink-300">|</span>
                                    <IconButton
                                      onClick={() => handleCancelEdit(row.ids)}
                                    >
                                      <Icon
                                        className="text-rose-700"
                                        icon="ion:close-outline"
                                      />
                                    </IconButton>
                                  </>
                                ) : (
                                  <>
                                    {row.permissions &&
                                    row.permissions.includes("update") ? (
                                      <IconButton
                                        onClick={() => {
                                          setEditRowData(row); // Pass the row data to the state
                                          handleOpen(); // Open the modal
                                        }}
                                      >
                                        <Icon
                                          className="text-[#8E84F3]"
                                          icon="ep:edit"
                                        />
                                      </IconButton>
                                    ) : (
                                      ""
                                    )}

                                    <span className="text-pink-300">|</span>

                                    {row.permissions &&
                                    row.permissions.includes("delete") ? (
                                      <IconButton
                                        onClick={(e) =>
                                          handleDelete(row.ids, row.Thananame)
                                        }
                                      >
                                        <Icon
                                          className="text-rose-700"
                                          icon="uiw:delete"
                                        />
                                      </IconButton>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                )}
                              </>
                            ) : null}
                          </StyledTableCell>
                        ))}
                      </StyledTableRow>
                    </>
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
        </>
      ) : null}
    </>
  );
};

export default ThanaTable;

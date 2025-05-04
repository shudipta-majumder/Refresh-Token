"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Backdrop,
  Divider,
  InputAdornment,
  TextField,
  TableSortLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Modal,
} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Icon from "../../../icon/page";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import { styled } from "@mui/system";
import { useClassTeacherContext } from "./ClassTeacherContext";
import ClassTeacherModal from "./ClassTeacherModal";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
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
    backdropFilter: "blur(1px)",
    backgroundColor: "transparent",
    zIndex: 500,
    "& .MuiModal-backdrop": {
      backgroundColor: "transparent",
    },
  },
}));

const columns = [
  { id: "serial", label: "SL", align: "center", sortable: true },
  { id: "version", label: "Version", align: "center", sortable: true },
  { id: "class_name", label: "Class", align: "center", sortable: true },
  { id: "section", label: "Section", align: "center", sortable: true },
  { id: "session", label: "Session", align: "center", sortable: true },
  { id: "group", label: "Group", align: "center", sortable: true },
  { id: "teacher", label: "Teacher", align: "center", sortable: true },
  { id: "action", label: "Action", align: "center", sortable: true },
];

function createData(
  serial,
  id,
  version,
  versionId,
  class_name,
  classNameId,
  section,
  sectionId,
  session,
  sessionId,
  group,
  groupId,
  teacher,
  teacherId,
  permissions,
  action
) {
  return {
    serial,
    id,
    version,
    versionId,
    class_name,
    classNameId,
    section,
    sectionId,
    session,
    sessionId,
    group,
    groupId,
    teacher,
    teacherId,
    permissions,
    action,
  };
}

const ClassTeacherTable = ({
  session,
  versionData,
  classData,
  sessionData,
  sectionData,
  groupData,
  teacherData,
}) => {
  const accessToken = session?.user?.data?.token?.access;
  const menuData = session.user.data.menus;

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [teachersData, setTeachersData] = useState([]);
  const [editingRowData, setEditingRowData] = useState(null);
  const [editedVersionName, setEditedVersionName] = useState("");
  const [deleteTrigered, setDeleteTrigered] = useState(false);
  const [versionUpdateData, setVersionUpdateData] = useState(null);
  const { isClassTeacherSaved, resetClassTeacherSaved } =
    useClassTeacherContext();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Extracting permissions for the "Assign Class Teacher" submenu
  const academicMenu = menuData
    ? menuData.find((menu) => menu?.name === "Academic")
    : null;
  const classTeacherSubmenu = academicMenu?.sub_menu
    ? academicMenu.sub_menu.find(
        (subMenu) => subMenu.name === "Assign Class Teacher"
      )
    : null;
  const classTeacherPermission = classTeacherSubmenu?.permission || [];

  useEffect(() => {
    try {
      const getData = async () => {
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_HOST
          }/academic/api/class-teacher?page_number=${
            page + 1
          }&page_size=${rowsPerPage}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const result = await res.json();
        if (result.code === 200) {
          setTeachersData(result?.data);
          setCount(result?.pagination?.count);
          setIsLoading(false);
          resetClassTeacherSaved();
          setDeleteTrigered(false);
        }
        if (result.code === 400) {
          setError("Data not found");
        }
      };
      getData();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
      setError(null);
    }
  }, [isClassTeacherSaved, page, rowsPerPage, deleteTrigered]);

  const rows = teachersData?.map((item, index) => {
    const permissions = classTeacherPermission || [];
    const currentIndex = page * rowsPerPage + index + 1;
    return createData(
      currentIndex.toString(),
      item?.id,
      item?.version?.version || "N/A",
      item?.version?.id || "N/A",
      item?.class_name?.name || "N/A",
      item?.class_name?.id || "N/A",
      item?.section?.section || "N/A",
      item?.section?.id || "N/A",
      item?.session?.session || "N/A",
      item?.session?.id || "N/A",
      item?.group?.name || "N/A",
      item?.group?.id || "N/A",
      `${item?.teacher?.first_name} ${item?.teacher?.last_name}` || "N/A",
      item?.teacher?.id || "N/A",
      permissions
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

        if (orderBy === "") {
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

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredRows = (sortedRows || []).filter((row) => {
    return row.teacher.toLowerCase().includes(searchText.toLowerCase());
  });

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleDelete = (id, teacherName) => {
    try {
      swalWithMuiButtons
        .fire({
          title: "Are you sure?",
          html: `You won't be able to revert <b>${teacherName}</b> data!`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            fetch(
              `${process.env.NEXT_PUBLIC_HOST}/academic/api/class-teacher/delete/${id}`,
              {
                method: "PATCH",
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            )
              .then((response) => {
                return response.json();
              })
              .then((responseData) => {
                if (responseData.code == 200) {
                  const filterdData = teachersData.filter(
                    (teacher) => teacher.id !== id
                  );
                  setTeachersData(filterdData);
                  setDeleteTrigered(true);
                  swalWithMuiButtons.fire(
                    "Deleted!",
                    `Teacher <b>${teacherName}</b> data has been deleted.`,
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
    } catch (error) {}
  };

  //Edit data handling
  const handleChange = (e) => {
    setVersionUpdateData(e.target.value);
  };

  return (
    <section>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : teachersData ? (
        <Box>
          <Box
            sx={{
              backgroundColor: "white",
              p: 2,
              display: "flex",
              flexDirection: "column",
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
                  {filteredRows.length > 0 &&
                    filteredRows.map((row) => (
                      <StyledTableRow
                        sx={{
                          "&:hover": {
                            backgroundColor: "#eed3ff",
                          },
                        }}
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => (
                          <StyledTableCell key={column.id} align={column.align}>
                            {column.id === "version" &&
                            editingRowData === row.id ? (
                              <>
                                <FormControl>
                                  <InputLabel
                                    size="small"
                                    id="version-select-label"
                                  >
                                    {editedVersionName}
                                  </InputLabel>
                                  <Select
                                    size="small"
                                    labelId="version-select-label"
                                    id="version-select"
                                    label={editedVersionName}
                                    onChange={handleChange}
                                  >
                                    {versionData.map((item) => (
                                      <MenuItem key={item.id} value={item.id}>
                                        {item.version}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </>
                            ) : (
                              <>{row[column.id]}</>
                            )}

                            {/* Action */}
                            {column.id === "action" && (
                              <>
                                {row.permissions &&
                                  row.permissions.includes("update") && (
                                    <IconButton
                                      onClick={() => {
                                        setEditingRowData(row);
                                        handleOpen();
                                      }}
                                    >
                                      <Icon
                                        className="text-[#8E84F3]"
                                        icon="ep:edit"
                                      />
                                    </IconButton>
                                  )}

                                <Modal
                                  open={open}
                                  onClose={handleClose}
                                  className={classes.blurBackdrop}
                                  aria-labelledby="modal-modal-title"
                                  aria-describedby="modal-modal-description"
                                >
                                  <Box sx={style}>
                                    <ClassTeacherModal
                                      accessToken={accessToken}
                                      versionData={versionData}
                                      classData={classData}
                                      sessionData={sessionData}
                                      sectionData={sectionData}
                                      groupData={groupData}
                                      teacherData={teacherData}
                                      handleClose={handleClose}
                                      editingRowData={editingRowData}
                                    />
                                  </Box>
                                </Modal>

                                <span className="text-pink-300">|</span>
                                {row?.permissions &&
                                  row?.permissions.includes("delete") && (
                                    <IconButton
                                      onClick={() =>
                                        handleDelete(row.id, row.teacher)
                                      }
                                    >
                                      <Icon
                                        className="text-rose-700"
                                        icon="uiw:delete"
                                      />
                                    </IconButton>
                                  )}
                              </>
                            )}
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
        </Box>
      ) : (
        ""
      )}
    </section>
  );
};

export default ClassTeacherTable;

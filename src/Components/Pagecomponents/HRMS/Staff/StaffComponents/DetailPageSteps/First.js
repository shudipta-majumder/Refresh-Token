import { Box, Typography } from "@mui/material";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import { Scrollbars } from "react-custom-scrollbars-2";

const First = ({ PersonalDetails }) => {
  const { staff_education, bank_info, social_media } = PersonalDetails;

  return (
    <Box
      sx={{
        backgroundColor: "white",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      <Scrollbars
        style={{ height: "77vh" }}
        autoHide
        autoHideTimeout={100}
        autoHideDuration={100}
      >
        {/* personal details */}
        <Box sx={{ border: "1px solid #bcbcc34a", p: 1 }}>
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      borderBottom: "0.1px solid #FBFBFC",
                    },
                  }}
                >
                  <TableCell sx={{ p: "5px  5px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography sx={{ color: "#726969", fontSize: "15px" }}>
                          Phone
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Typography sx={{ fontSize: "15px" }}>
                          {PersonalDetails?.mobile_no}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      borderBottom: "0.1px solid #FBFBFC",
                    },
                  }}
                >
                  <TableCell sx={{ p: "5px  5px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography sx={{ color: "#726969", fontSize: "15px" }}>
                          Emergency Contact Number
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Typography sx={{ fontSize: "15px" }}>
                          {PersonalDetails?.emergency_number}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      borderBottom: "0.1px solid #FBFBFC",
                    },
                  }}
                >
                  <TableCell sx={{ p: "5px  5px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography sx={{ color: "#726969", fontSize: "15px" }}>
                          Email
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Typography sx={{ fontSize: "15px" }}>
                          {PersonalDetails?.email}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      borderBottom: "0.1px solid #FBFBFC",
                    },
                  }}
                >
                  <TableCell sx={{ p: "5px  5px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography sx={{ color: "#726969", fontSize: "15px" }}>
                          Gender
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Typography sx={{ fontSize: "15px" }}>
                          {PersonalDetails?.gender?.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      borderBottom: "0.1px solid #FBFBFC",
                    },
                  }}
                >
                  <TableCell sx={{ p: "5px  5px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography sx={{ color: "#726969", fontSize: "15px" }}>
                          Date Of Birth
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Typography sx={{ fontSize: "15px" }}>
                          {PersonalDetails?.dob}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      borderBottom: "0.1px solid #FBFBFC",
                    },
                  }}
                >
                  <TableCell sx={{ p: "5px  5px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography sx={{ color: "#726969", fontSize: "15px" }}>
                          Marital Status
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Typography sx={{ fontSize: "15px" }}>
                          {PersonalDetails?.marital_status?.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {/* Address */}
        <Box sx={{ border: "1px solid #bcbcc34a" }}>
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table aria-label="simple table">
              <TableHead sx={{ backgroundColor: "#EDEBFF" }}>
                <TableRow>
                  <TableCell sx={{ p: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography>Address Details</Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      borderBottom: "0.1px solid #FBFBFC",
                    },
                  }}
                >
                  <TableCell sx={{ p: "5px  5px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography sx={{ color: "#726969", fontSize: "15px" }}>
                          Current Address
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Typography sx={{ fontSize: "15px" }}>
                          {PersonalDetails?.present_address}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      borderBottom: "0.1px solid #FBFBFC",
                    },
                  }}
                >
                  <TableCell sx={{ p: "5px  5px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography sx={{ color: "#726969", fontSize: "15px" }}>
                          Permanent Address
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Typography sx={{ fontSize: "15px" }}>
                          {PersonalDetails?.permanent_address}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {/* Education */}
        <Box sx={{ border: "1px solid #bcbcc34a" }}>
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table aria-label="simple table">
              <TableHead sx={{ backgroundColor: "#EDEBFF" }}>
                <TableRow>
                  <TableCell sx={{ p: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography>Education Details</Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staff_education.length > 0 ? (
                  staff_education.map((edu, i) => (
                    <>
                      <Typography>Institute {i + 1}</Typography>
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            borderBottom: "0.1px solid #FBFBFC",
                          },
                        }}
                      >
                        <TableCell sx={{ p: "5px  5px" }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography
                                sx={{ color: "#726969", fontSize: "15px" }}
                              >
                                Board
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                              }}
                            >
                              <Typography sx={{ fontSize: "15px" }}>
                                {edu.edu_board?.name}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            borderBottom: "0.1px solid #FBFBFC",
                          },
                        }}
                      >
                        <TableCell sx={{ p: "5px  5px" }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography
                                sx={{ color: "#726969", fontSize: "15px" }}
                              >
                                Institution Name
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                              }}
                            >
                              <Typography sx={{ fontSize: "15px" }}>
                                {edu?.institution_name}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            borderBottom: "0.1px solid #FBFBFC",
                          },
                        }}
                      >
                        <TableCell sx={{ p: "5px  5px" }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography
                                sx={{ color: "#726969", fontSize: "15px" }}
                              >
                                Registration No
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                              }}
                            >
                              <Typography sx={{ fontSize: "15px" }}>
                                {edu?.registration_no}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            borderBottom: "0.1px solid #FBFBFC",
                          },
                        }}
                      >
                        <TableCell sx={{ p: "5px  5px" }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography
                                sx={{ color: "#726969", fontSize: "15px" }}
                              >
                                Start Date
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                              }}
                            >
                              <Typography sx={{ fontSize: "15px" }}>
                                {edu?.start_date}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            borderBottom: "0.1px solid #FBFBFC",
                          },
                        }}
                      >
                        <TableCell sx={{ p: "5px  5px" }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography
                                sx={{ color: "#726969", fontSize: "15px" }}
                              >
                                End Date
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                              }}
                            >
                              <Typography sx={{ fontSize: "15px" }}>
                                {edu?.end_date}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            borderBottom: "0.1px solid #FBFBFC",
                          },
                        }}
                      >
                        <TableCell sx={{ p: "5px  5px" }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography
                                sx={{ color: "#726969", fontSize: "15px" }}
                              >
                                Passing Year
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                              }}
                            >
                              <Typography sx={{ fontSize: "15px" }}>
                                {edu?.passing_year}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            borderBottom: "0.1px solid #FBFBFC",
                          },
                        }}
                      >
                        <TableCell sx={{ p: "5px  5px" }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography
                                sx={{ color: "#726969", fontSize: "15px" }}
                              >
                                Result
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                              }}
                            >
                              <Typography sx={{ fontSize: "15px" }}>
                                {edu?.result} Out of {edu?.result_out_of}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    </>
                  ))
                ) : (
                  <Typography sx={{ textAlign: "center" }}>Empty</Typography>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {/* Bank INfo */}
        <Box sx={{ border: "1px solid #bcbcc34a" }}>
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table aria-label="simple table">
              <TableHead sx={{ backgroundColor: "#EDEBFF" }}>
                <TableRow>
                  <TableCell sx={{ p: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography>Bank Account Details</Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bank_info.length > 0 ? (
                  bank_info.map((bank, i) => (
                    <>
                      {/* <Typography>Bank {i + 1}</Typography> */}
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            borderBottom: "0.1px solid #FBFBFC",
                          },
                        }}
                      >
                        <TableCell sx={{ p: "5px  5px" }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography
                                sx={{ color: "#726969", fontSize: "15px" }}
                              >
                                Bank Name
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                              }}
                            >
                              <Typography sx={{ fontSize: "15px" }}>
                                {bank.bank_name.name}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            borderBottom: "0.1px solid #FBFBFC",
                          },
                        }}
                      >
                        <TableCell sx={{ p: "5px  5px" }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography
                                sx={{ color: "#726969", fontSize: "15px" }}
                              >
                                Account Title
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                              }}
                            >
                              <Typography sx={{ fontSize: "15px" }}>
                                {bank?.account_title}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            borderBottom: "0.1px solid #FBFBFC",
                          },
                        }}
                      >
                        <TableCell sx={{ p: "5px  5px" }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography
                                sx={{ color: "#726969", fontSize: "15px" }}
                              >
                                Account Number
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                              }}
                            >
                              <Typography sx={{ fontSize: "15px" }}>
                                {bank?.account_number}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            borderBottom: "0.1px solid #FBFBFC",
                          },
                        }}
                      >
                        <TableCell sx={{ p: "5px  5px" }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography
                                sx={{ color: "#726969", fontSize: "15px" }}
                              >
                                Branch Name
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                              }}
                            >
                              <Typography sx={{ fontSize: "15px" }}>
                                {bank?.branch_name}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    </>
                  ))
                ) : (
                  <Typography sx={{ textAlign: "center" }}>Empty</Typography>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {/* Social INfo */}
        <Box sx={{ border: "1px solid #bcbcc34a" }}>
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table aria-label="simple table">
              <TableHead sx={{ backgroundColor: "#EDEBFF" }}>
                <TableRow>
                  <TableCell sx={{ p: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography>Social Media Link</Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {social_media.length > 0 ? (
                  social_media.map((social, i) => (
                    <>
                      <Typography sx={{ textAlign: "center" }}>
                        {social?.name}
                      </Typography>
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            borderBottom: "0.1px solid #FBFBFC",
                          },
                        }}
                      >
                        <TableCell sx={{ p: "5px  5px" }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography
                                sx={{ color: "#726969", fontSize: "15px" }}
                              >
                                Username
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                              }}
                            >
                              <Typography sx={{ fontSize: "15px" }}>
                                {social?.username}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            borderBottom: "0.1px solid #FBFBFC",
                          },
                        }}
                      >
                        <TableCell sx={{ p: "5px  5px" }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography
                                sx={{ color: "#726969", fontSize: "15px" }}
                              >
                                URL
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                              }}
                            >
                              <Link href={social?.url}>{social?.url}</Link>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    </>
                  ))
                ) : (
                  <Typography sx={{ textAlign: "center" }}>Empty</Typography>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Scrollbars>
    </Box>
  );
};

export default First;

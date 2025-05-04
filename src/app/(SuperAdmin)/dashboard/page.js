
import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import FirstGrid from "../../../Components/Pagecomponents/Dashboard/FirstGrid";
import SecondGrid from "../../../Components/Pagecomponents/Dashboard/SecondGrid";
import ThirdGrid from "../../../Components/Pagecomponents/Dashboard/ThirdGrid";
import BarChart from "../../../Components/Pagecomponents/Dashboard/Chart/BarChart";
import BarChartTwo from "../../../Components/Pagecomponents/Dashboard/Chart/BarChart2";
import PieChart from "../../../Components/Pagecomponents/Dashboard/Chart/PieChart";
import { withAuth } from "@/authHoc/withAuth";
import UserInstitteDetail from "@/Components/Pagecomponents/Dashboard/User&InstitituteDetail/UserInstitteDetail";

const MyServerComponent = ({ session }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
    <UserInstitteDetail session={session}/>
      <FirstGrid />
      <SecondGrid />
      <ThirdGrid />
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item xs={6} sm={12} md={12} lg={6} xl={4.5}>
            <PieChart />
          </Grid>
          <Grid item xs={6} sm={12} md={12} lg={6} xl={4.5}>
            <BarChart />
          </Grid>
          <Grid item xs={6} sm={12} md={12} lg={12} xl={3}>
            <BarChartTwo />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default withAuth(MyServerComponent);

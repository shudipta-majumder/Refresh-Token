import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  FaGroup,
  LineMdCalendar,
  MdiGoogleClassroom,
  UisWindowSection,
} from "@/Components/utility/useIconifyIcon";
import FeesEntryFields from "@/Components/Pagecomponents/FeesCollection/FeesEntry/FeesEntryFields";

const session = await getServerSession(authOptions);
const accessToken = session?.user?.data?.token?.access;

const FeesEntryCreatePage = async ({ searchParams: { id } }) => {
  //fetching specific fees entry details api
  const feesEntryDetailsApi = async (accessToken) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/fees/api/fees-entry/detail/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );
    const feesEntryDataResponse = await res.json();
    return feesEntryDataResponse;
  };
  //fetching specific fees entry details api
  const feesTypeListApi = async (accessToken) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/fees/api/fees-type/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const feesTypeDataResponse = await res.json();
    return feesTypeDataResponse;
  };

  const feesEntryData = await feesEntryDetailsApi(accessToken);
  const feesTypeData = await feesTypeListApi(accessToken);
  return (
    <>
      <Box sx={{ width: "100%", marginBottom: "10px" }}>
        <Grid container rowSpacing={1} columnSpacing={1}>
          <Grid item xs={6} md={4} lg={2.4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "#2f3349" }} aria-label="recipe">
                    <Box
                      sx={{
                        fontSize: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <LineMdCalendar sx={{ color: "white" }} />
                    </Box>
                  </Avatar>
                }
                title="Session"
                subheader={feesEntryData.data.session.session}
              />
            </Card>
          </Grid>
          <Grid item xs={6} md={4} lg={2.4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "#2f3349" }} aria-label="recipe">
                    <Box
                      sx={{
                        fontSize: "20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      EB
                    </Box>
                  </Avatar>
                }
                title="Version"
                subheader={feesEntryData.data.version.version}
              />
            </Card>
          </Grid>
          <Grid item xs={6} md={4} lg={2.4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "#2f3349" }} aria-label="recipe">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <MdiGoogleClassroom sx={{ color: "white" }} />
                    </Box>
                  </Avatar>
                }
                title="Class Name"
                subheader={feesEntryData?.data?.class_name?.name}
              />
            </Card>
          </Grid>
          <Grid item xs={6} md={4} lg={2.4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "#2f3349" }} aria-label="recipe">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <UisWindowSection sx={{ color: "white" }} />
                    </Box>
                  </Avatar>
                }
                title="Section"
                subheader={feesEntryData?.data?.section?.section}
              />
            </Card>
          </Grid>
          <Grid item xs={6} md={4} lg={2.4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "#2f3349" }} aria-label="recipe">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <FaGroup sx={{ color: "white" }} />
                    </Box>
                  </Avatar>
                }
                title="Group"
                subheader={feesEntryData?.data?.group?.group}
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
      <FeesEntryFields
        feesTypeData={feesTypeData}
        feesEntryData={feesEntryData}
        accessToken={accessToken}
        feesEntryId={id}
      />
    </>
  );
};

export default FeesEntryCreatePage;

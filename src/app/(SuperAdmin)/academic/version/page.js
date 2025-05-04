import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Box, Typography } from "@mui/material";
import BasicStructure from "@/Components/Pagecomponents/Academic/Version/BasicStructure";

const getProfile = async (accessToken) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const ProfileFetchingData = await res.json();
  return ProfileFetchingData;
};

const StudnetAdmissionPage = async () => {
  const session = await getServerSession(authOptions);
  const accessToken = session?.user?.accessToken;
  const refreshToken = session?.user?.refreshToken;
  try {
    const profileData = await getProfile(accessToken);

    return (
      <Box>
        <Typography>Server</Typography>
        <Typography>{profileData?.user?.name}</Typography>
        <Typography>Client</Typography>
        <Box>
          <BasicStructure initialAccessToken={accessToken} refreshToken={refreshToken}/>
        </Box>
      </Box>
    );
  } catch (error) {
    console.error("Error in StudnetAdmissionPage:", error.message);
  }
};

export default StudnetAdmissionPage;

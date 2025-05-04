"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Box, Button, Typography } from "@mui/material";

const BasicStructure = ({ initialAccessToken, refreshToken }) => {
  console.log("initialAccessToken", initialAccessToken);
  const { data: session, update } = useSession();
  const [ProfileData, setProfileData] = useState({});
  const [accessToken, setAccessToken] = useState(initialAccessToken);
  const [error, setError] = useState(null);

  const updateSession = async (newAccessToken, newExp) => {
    await update({
      ...session,
      user: {
        ...session?.user,
        accessToken: newAccessToken,
        backend_exp: newExp,
      },
    });
  };

  const fetchProfileData = async (token) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/profile`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();
      console.log("fetch profile responseData", responseData);
      if (responseData.code === 400) {
        console.log("profile 400");
        await refreshAccessToken();
      } else {
        setProfileData(responseData);
      }
    } catch (fetchError) {
      setError(fetchError);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/refresh-access-token`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${refreshToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to refresh access token");
      }

      const responseData = await response.json();

      const newAccessToken = responseData.accessToken;
      const newExp = responseData.backend_exp;

      setAccessToken(newAccessToken);
      await updateSession(newAccessToken, newExp);
      fetchProfileData(newAccessToken);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchProfileData(accessToken);
  }, [accessToken]);

  return (
    <Box>
      <Typography>{ProfileData?.user && ProfileData?.user?.name}</Typography>
      verssion client
      <Button onClick={() => fetchProfileData(accessToken)}>Name</Button>
    </Box>
  );
};

export default BasicStructure;

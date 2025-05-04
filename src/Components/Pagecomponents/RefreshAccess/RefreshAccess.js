"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

// ** MUI Components
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// ** Styled Components
const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "90vw",
  },
}));

const Img = styled("img")(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    height: 450,
    marginTop: theme.spacing(10),
  },
  [theme.breakpoints.down("md")]: {
    height: 400,
  },
  [theme.breakpoints.up("lg")]: {
    marginTop: theme.spacing(20),
  },
}));

const Error401 = ({ serverSession }) => {
  const refreshToken = serverSession?.user?.refreshToken;
  const { data: session, update } = useSession();

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

      await updateSession(newAccessToken, newExp);
      fetchProfileData(newAccessToken);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box className="content-center">
      <Box
        sx={{
          p: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <BoxWrapper>
          <Typography variant="h4" sx={{ mb: 1.5 }}>
            RefreshAccess
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Please check with the site admin if you believe this is a mistake.
          </Typography>
          <Typography sx={{ mb: 3, color: "text.secondary" }}>
            Otherwise Login again
          </Typography>
          <Button
            href="/academic/version"
            component={Link}
            variant="contained"
            onClick={refreshAccessToken}
          >
            Refresh tokens
          </Button>
        </BoxWrapper>
        <Img height="500" alt="error-illustration" src="/images/403/403.png" />
      </Box>
    </Box>
  );
};

export default Error401;

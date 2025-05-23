import React from "react";
import { Box, Button, Link, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NextImage from "next/image";
import { signOut } from "next-auth/react"

const UserClick = () => {
  const buttonStyles = {
    textTransform: "none",
  };

  return (
    <Box>
      <Link style={{ textDecoration: "none" }} href="/admin-profile">
        <Button
          style={buttonStyles}
          fullWidth
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
            borderRadius: "5px",
            mb: "10px",
            ":hover": {
              bgcolor: "#E5E5E5",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <Box>
              <NextImage
                src="/images/topnav/profile/profile.png"
                width={24}
                height={24}
                alt="Picture of the author"
              />
            </Box>

            <Typography sx={{ color: "black" }}>My Profile</Typography>
          </Box>

          <Box sx={{ alignItems: "center" }}>
            <ChevronRightIcon sx={{ color: "black" }} />
          </Box>
        </Button>
      </Link>

      <Link style={{ textDecoration: "none" }} href="/settings">
        <Button
          style={buttonStyles}
          fullWidth
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
            borderRadius: "5px",
            mb: "10px",
            ":hover": {
              bgcolor: "#E5E5E5",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <Box>
              <NextImage
                src="/images/topnav/profile/setting.png"
                width={24}
                height={24}
                alt="Picture of the author"
              />
            </Box>

            <Typography sx={{ color: "black" }}>Settings</Typography>
          </Box>

          <Box sx={{ alignItems: "center" }}>
            <ChevronRightIcon sx={{ color: "black" }} />
          </Box>
        </Button>
      </Link>
      <Link style={{ textDecoration: "none" }} href="/admin-profile">
        <Button
          style={buttonStyles}
          fullWidth
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
            borderRadius: "5px",
            mb: "10px",
            ":hover": {
              bgcolor: "#E5E5E5",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <Box>
              <NextImage
                src="/images/topnav/profile/help.png"
                width={24}
                height={24}
                alt="Picture of the author"
              />
            </Box>

            <Typography sx={{ color: "black" }}>Help</Typography>
          </Box>

          <Box sx={{ alignItems: "center" }}>
            <ChevronRightIcon sx={{ color: "black" }} />
          </Box>
        </Button>
      </Link>

      <Button
        onClick={() => signOut({ redirect: true, callbackUrl: "/login" })}
        style={buttonStyles}
        fullWidth
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
          borderRadius: "5px",
          mb: "10px",
          ":hover": {
            bgcolor: "#E5E5E5",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Box>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="11.5211"
                cy="11.5211"
                r="11.0211"
                fill="white"
                stroke="url(#paint0_linear_1687_5)"
              />
              <path
                d="M13.4465 18H10.4465V16.2435C9.92513 16.059 9.44223 15.78 9.022 15.4205L7.5 16.3L6 13.7L7.5215 12.8225C7.42155 12.2787 7.42155 11.7213 7.5215 11.1775L6 10.3L7.5 7.7L9.022 8.5795C9.44223 8.21996 9.92513 7.94097 10.4465 7.7565V6H13.4465V7.7565C13.9679 7.94097 14.4508 8.21996 14.871 8.5795L16.393 7.7L17.893 10.3L16.3715 11.1775C16.4714 11.7213 16.4714 12.2787 16.3715 12.8225L17.893 13.7L16.393 16.3L14.871 15.421C14.4507 15.7804 13.9678 16.0592 13.4465 16.2435V18ZM11.4465 17H12.4465V15.4865L12.822 15.3895C13.438 15.2299 13.9987 14.9051 14.4435 14.45L14.715 14.1735L16.0265 14.931L16.5265 14.065L15.2165 13.3085L15.3195 12.9355C15.4888 12.322 15.4888 11.674 15.3195 11.0605L15.2165 10.6875L16.5265 9.931L16.0265 9.065L14.715 9.8245L14.4435 9.55C13.9985 9.09567 13.4378 8.77151 12.822 8.6125L12.4465 8.5135V7H11.4465V8.5135L11.071 8.6105C10.455 8.77008 9.8943 9.09494 9.4495 9.55L9.178 9.8265L7.8665 9.067L7.3665 9.933L8.6765 10.6895L8.5735 11.0625C8.40418 11.676 8.40418 12.324 8.5735 12.9375L8.6765 13.3105L7.3665 14.067L7.8665 14.933L9.178 14.1755L9.4495 14.452C9.89454 14.9063 10.4552 15.2305 11.071 15.3895L11.4465 15.4865V17ZM11.9465 14C11.5509 14 11.1643 13.8827 10.8354 13.6629C10.5065 13.4432 10.2501 13.1308 10.0987 12.7654C9.94737 12.3999 9.90776 11.9978 9.98493 11.6098C10.0621 11.2219 10.2526 10.8655 10.5323 10.5858C10.812 10.3061 11.1684 10.1156 11.5563 10.0384C11.9443 9.96126 12.3464 10.0009 12.7119 10.1522C13.0773 10.3036 13.3897 10.56 13.6094 10.8889C13.8292 11.2178 13.9465 11.6044 13.9465 12C13.9465 12.5304 13.7358 13.0391 13.3607 13.4142C12.9856 13.7893 12.4769 14 11.9465 14ZM11.9465 11C11.7487 11 11.5554 11.0586 11.3909 11.1685C11.2265 11.2784 11.0983 11.4346 11.0226 11.6173C10.9469 11.8 10.9271 12.0011 10.9657 12.1951C11.0043 12.3891 11.0995 12.5673 11.2394 12.7071C11.3792 12.847 11.5574 12.9422 11.7514 12.9808C11.9454 13.0194 12.1465 12.9996 12.3292 12.9239C12.5119 12.8482 12.6681 12.72 12.778 12.5556C12.8879 12.3911 12.9465 12.1978 12.9465 12C12.9465 11.7348 12.8411 11.4804 12.6536 11.2929C12.4661 11.1054 12.2117 11 11.9465 11Z"
                fill="url(#paint1_linear_1687_5)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1687_5"
                  x1="1.66193e-07"
                  y1="10.7716"
                  x2="23.0428"
                  y2="10.7936"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#7367F0" />
                  <stop offset="1" stop-color="#9D94F4" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_1687_5"
                  x1="6"
                  y1="11.6097"
                  x2="17.8934"
                  y2="11.6209"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#7367F0" />
                  <stop offset="1" stop-color="#9D94F4" />
                </linearGradient>
              </defs>
            </svg> */}

            <NextImage
              src="/images/topnav/profile/logout.png"
              width={24}
              height={24}
              alt="Picture of the author"
              // style={{ filter: "brightness(0) invert(1)" }}
            />
          </Box>

          <Typography sx={{ color: "red" }}>Logout</Typography>
        </Box>
      </Button>
    </Box>
  );
};

export default UserClick;

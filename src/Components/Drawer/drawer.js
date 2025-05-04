import { Box, Button, Radio, RadioGroup, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import React, { useState } from "react";
import { useOnlyIcon } from "../../Components/Layout/NavContext";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";

const Drawer = () => {
  const {
    onlyIcon,
    setOnlyIcon,
    setHovering,
    color,
    handleRedColor,
    handleBlueColor,
    handleColorSet,
    handleMood,
    palette,
    storedMode,
    handleColorThree,
    handleColorFour,
    handleColorFive,
  } = useOnlyIcon();

  const set = () => {
    setOnlyIcon(true);
    setHovering(true);
  };
  const out = () => {
    setOnlyIcon(false);
    setHovering(false);
  };

  const ColorBox = styled(Box)(({ theme }) => ({
    width: 45,
    height: 45,
    cursor: "pointer",
    margin: theme.spacing(2.5, 1.75, 1.75),
    borderRadius: theme.shape.borderRadius,
    transition:
      "margin .25s ease-in-out, width .25s ease-in-out, height .25s ease-in-out, box-shadow .25s ease-in-out",
    "&:hover": {
      boxShadow: theme.shadows[4],
    },
  }));

  return (
    <>
      <Box
        sx={{
          borderBottom: "1px solid #45495e",
          position: "fixed",
          width: "100%",
          zIndex: 1,
        }}
      >
        <Typography
          sx={{
            color: palette.text.secondary,
            fontWeight: "600",
            fontSize: "27px",
          }}
        >
          THEME CUSTOMIZER
        </Typography>
        <Typography sx={{ color: palette.text.modarate }}>
          Customize & Preview in Real Time
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px 20px 20px 20px",
          gap: "10px",
          marginTop: "80px",
        }}
      >
        <Button onClick={set}>hh</Button>
        <Button onClick={out}>gg</Button>

        <div>
          <Typography>Primary Color</Typography>
          <Box sx={{ display: "flex" }}>
            <ColorBox
              onClick={handleRedColor}
              sx={{
                backgroundColor: "#7367F0",
                ...(color === "#7367F0"
                  ? {
                      width: 53,
                      height: 53,
                      m: (theme) => theme.spacing(1.5, 0.75, 0),
                    }
                  : {}),
              }}
            />
            <ColorBox
              onClick={handleBlueColor}
              sx={{
                backgroundColor: "#a8aaae",
                ...(color === "#a8aaae"
                  ? {
                      width: 53,
                      height: 53,
                      m: (theme) => theme.spacing(1.5, 0.75, 0),
                    }
                  : {}),
              }}
            />
            <ColorBox
              onClick={handleColorThree}
              sx={{
                backgroundColor: "#28c76f",
                ...(color === "#28c76f"
                  ? {
                      width: 53,
                      height: 53,
                      m: (theme) => theme.spacing(1.5, 0.75, 0),
                    }
                  : {}),
              }}
            />
            <ColorBox
              onClick={handleColorFour}
              sx={{
                backgroundColor: "#ea5455",
                ...(color === "#ea5455"
                  ? {
                      width: 53,
                      height: 53,
                      m: (theme) => theme.spacing(1.5, 0.75, 0),
                    }
                  : {}),
              }}
            />
            <ColorBox
              onClick={handleColorFive}
              sx={{
                backgroundColor: "#ff9f43",
                ...(color === "#ff9f43"
                  ? {
                      width: 53,
                      height: 53,
                      m: (theme) => theme.spacing(1.5, 0.75, 0),
                    }
                  : {}),
              }}
            />
          </Box>
        </div>

        <input type="color" onChange={handleColorSet}></input>
        <Typography>{color}</Typography>
        {/* <Button
          sx={{ height: "30px", width: "10px", backgroundColor: "black" }}
          onClick={handleDeviceTheme}
        ></Button> */}

        <Box sx={{ mb: 5 }}>
          <Typography>Mode</Typography>
          <RadioGroup
            row
            value={storedMode}
            onChange={(e) => handleMood(e.target.value)}
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: ".875rem",
                color: "text.secondary",
              },
            }}
          >
            <FormControlLabel value="light" label="Light" control={<Radio />} />
            <FormControlLabel value="dark" label="Dark" control={<Radio />} />
            <FormControlLabel value="semiDark" label="Semi Dark" control={<Radio />} />
          </RadioGroup>
        </Box>

        <Typography
          component="p"
          variant="caption"
          sx={{ mb: 5, color: "text.disabled", textTransform: "uppercase" }}
        >
          Theming
        </Typography>
      </Box>
    </>
  );
};

export default Drawer;

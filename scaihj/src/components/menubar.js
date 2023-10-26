import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";

import { Link } from "react-router-dom";

const pages = ["home", "about"];

export default function MenuBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "grey" }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: { xs: "flex" },
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              // display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SYNERGYCAP
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              flexGrow: 1, // 영역을 늘려 전체 폭을 차지하도록 설정
              // 추가 스타일을 필요에 따라 정의할 수 있습니다.
            }}
          >
            {pages.map((page) => (
              <Button
                component={Link}
                to={page}
                key={page}
                onClick={handleCloseNavMenu}
                justifyContent="flex-end"
                alignItems="flex-end"
                display="flex"
                sx={{
                  my: 2,
                  // flexGrow: 1,
                  color: "white",
                  // display: { xs: "block", md: "none" },
                  // marginRight: index < pages.length - 1 ? 5 : 0, // 간격 조절
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

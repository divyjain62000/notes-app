import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import React from "react";

const Header = styled(AppBar)`
  z-index: 1201;
  background: #202124;
  height: 70px;
  box-shadow: inset 0 -1px 0 0 #5f6368;
  color: #ffe;
`;

const Heading = styled(Typography)`
  color: #ffe;
  font-size: 24px;
  margin-left: 25px;
`;

const HeaderBar = ({ open, handleDrawer }: { open: boolean, handleDrawer: () => void }) => {
  const logo =
    "https://seeklogo.com/images/G/google-keep-logo-0BC92EBBBD-seeklogo.com.png";

  return (
    <React.Fragment>
      {open && <Header>
        <Toolbar style={{ background: "#202124" }}>
          <IconButton
            onClick={() => handleDrawer()}
            sx={{ marginRight: "20px", color: "#ffe" }}
            edge="start"
          >
            <Menu />
          </IconButton>
          <img src={logo} alt="logo" style={{ width: 30 }} />
          <Heading>Keep</Heading>
        </Toolbar>
      </Header>
      }
    </React.Fragment>
  );
};

export default HeaderBar;

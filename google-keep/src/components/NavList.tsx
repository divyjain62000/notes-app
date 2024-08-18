import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import {
  LightbulbOutlined as Lightbulb,
  ArchiveOutlined as Archive,
  DeleteOutlineOutlined as Delete,
  NotificationsOutlined as Notifications,
  EditOutlined as Edit,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import "../App.css";
import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";

const CustomLink = styled(Link)`
  background-color: transparent;

  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 0 30px 30px 0;
  cursor: pointer;
  margin-top: 5px;
  font-size: small;

  &:hover {
    background-color: #28292c;
  }
`;

const NavList = () => {
  const navList = [
    { id: 1, name: "Notes", icon: <Lightbulb />, route: "/" },
    { id: 2, name: "Reminders", icon: <Notifications />, route: "/reminder" },
    { id: 3, name: "Edit Labels", icon: <Edit />, route: "/edit-labels" },
    { id: 4, name: "Archives", icon: <Archive />, route: "/archive" },
    { id: 5, name: "Bin", icon: <Delete />, route: "/delete" },
  ];

  const location = useLocation();

  return (
    <List
      component="nav"
      style={{
        background: "#202124",
        height: "100%",
        border: "1px solid #202124",
        paddingTop: "15px",
      }}
    >
      {navList.map((list) => (
        <React.Fragment>
          {location.pathname === list.route ? (
            // <CustomListItem key={list.id} style={{ background: "#41331C" }}>
            <CustomLink
              to={`${list.route}`}
              style={{ background: "#41331C" }}
              className="nav-menu-item-link"
            >
              <ListItemIcon style={{ alignItems: "center", color: "#ffe" }}>
                {list.icon}
              </ListItemIcon>
              <ListItemText primary={list.name} />
            </CustomLink>
          ) : (
            // </CustomListItem>
            // <CustomListItem key={list.id}>
            <CustomLink to={`${list.route}`} className="nav-menu-item-link">
              <ListItemIcon style={{ alignItems: "center", color: "#5f6368" }}>
                {list.icon}
              </ListItemIcon>
              <ListItemText primary={list.name} />
            </CustomLink>
            // </CustomListItem>
          )}
        </React.Fragment>
      ))}
    </List>
  );
};

export default NavList;

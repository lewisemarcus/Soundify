import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  QuestionCircleOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Avatar, Menu, Dropdown, Space, message, Modal } from "antd";
import Button from "../components/Button";
import logo from "../assets/soundify9-logo.png";

const Navbar = () => {
  let navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const username = localStorage.getItem("username");

  const onLogout = () => {
    logout();
  };

  function modal() {
    Modal.confirm({
      title: "Confirm",
      icon: <QuestionCircleOutlined style={{ color: "red" }} />,
      content: "Are you sure you want to logout?",
      okText: "Yes",
      cancelText: "No",
      className: "logout",
      onOk() {
        message.success("Successfully logged out");
        setTimeout(() => {
          onLogout();
        }, 500);
      },
    });
  }

  const menu = (
    <Menu
      className="menu"
      items={[
        {
          label: (
            <Link to="/">
              <li className="menu-item">Home</li>
            </Link>
          ),
        },
        {
          label: (
            <Link to="/uploads">
              <li className="menu-item">Songs</li>
            </Link>
          ),
        },
        {
          label: (
            <Link to="/playlists">
              <li className="menu-item">My Playlists</li>
            </Link>
          ),
        },
        {
          danger: true,
          label: (
            <li onClick={modal} className="menu-item">
              Logout
            </li>
          ),
        },
      ]}
    />
  );

  return (
    <nav className="navMain">
      <div className="logo">
        <Link to="/">
          <img src={logo} width={100} height={100}></img>
        </Link>
      </div>
      {user ? (
        <div className="ul-container">
          <li className="upload">
            <Link to="/uploads">Upload</Link>
          </li>
          <li className="profile">
            <Dropdown overlay={menu} trigger={["hover"]} className="dropdown">
              <div onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar
                    style={{
                      backgroundColor: "var(--dark)",
                      color: "var(--dark)",
                    }}
                    size={30}
                    icon={<UserOutlined />}
                  />
                  {username}
                  <DownOutlined />
                </Space>
              </div>
            </Dropdown>
          </li>
        </div>
      ) : (
        <Link to="/register" className="link">
          <Button className="solid-btn nav-btn">Create account</Button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;

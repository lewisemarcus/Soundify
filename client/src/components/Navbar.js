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

const Navbar = () => {
  let navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const username = localStorage.getItem("username");

  const onLogout = () => {
    logout();
    window.location.reload();
    localStorage.removeItem("username");
    navigate("/");
  };

  function modal() {
    Modal.confirm({
      title: "Confirm",
      icon: <QuestionCircleOutlined style={{ color: "red" }} />,
      content: "Are you sure you want to logout?",
      okText: "Yes",
      cancelText: "No",
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
            <Link to="/songs">
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
    <nav>
      <Link to="/">
        <h3 className="logo">
          <span className="logo-s">S</span>oundify
        </h3>
      </Link>
      {user ? (
        <ul className="nav-items">
          <li className="upload">
            <Link to="/songs">Upload</Link>
          </li>
          <li className="profile">
            <Dropdown overlay={menu} trigger={["hover"]} className="dropdown">
              <div onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar
                    style={{
                      backgroundColor: "var(--navy)",
                      color: "var(--light)",
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
        </ul>
      ) : (
        <Link to="/register" className="link">
          <Button className="solid-btn nav-btn">Create account</Button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;

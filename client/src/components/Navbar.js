import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { UserOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Avatar, Menu, Dropdown, Space, message, Modal } from "antd";
import Button from "../components/Button";

const Navbar = () => {
  let navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const onLogout = () => {
    logout();
    window.location.reload();
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
            <Link to="/playlists">
              <li className="menu-item">View Playlists</li>
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
        <h3 className="logo">SoundClone</h3>
      </Link>
      <div className="button-wrapper">
        {user ? (
          <Dropdown overlay={menu} trigger={["click"]}>
            <div onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar
                  style={{
                    backgroundColor: "var(--navy)",
                    color: "var(--light)",
                  }}
                  size={50}
                  icon={<UserOutlined />}
                />
                {/* <DownOutlined /> */}
              </Space>
            </div>
          </Dropdown>
        ) : (
          <>
            {" "}
            <Link to="/register" className="link">
              <Button className="solid-btn nav-btn">Create account</Button>
            </Link>
          </>
          // ""
        )}
      </div>
    </nav>
  );
};

export default Navbar;

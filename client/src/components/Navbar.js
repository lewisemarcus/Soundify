import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { UserOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Avatar, Menu, Dropdown, Space, Popconfirm, message } from "antd";
import Button from "../components/Button";

const Navbar = () => {
  let navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const onLogout = () => {
    logout();
    window.location.reload();
    navigate("/");
  };

  function confirm(e) {
    console.log(e);
    message.success("Successfully logged out");
    setTimeout(() => {
      onLogout();
    }, 500);
  }

  function cancel(e) {
    console.log(e);
    // message.error("Click on No");
  }

  const menu = (
    <Menu
      items={[
        {
          label: <Link to="/playlists">View Playlists</Link>,
        },
        {
          danger: true,
          label: (
            <Popconfirm
              title="Are you sure you want to logout？"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">Logout</a>
            </Popconfirm>
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
            <a onClick={(e) => e.preventDefault()}>
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
            </a>
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

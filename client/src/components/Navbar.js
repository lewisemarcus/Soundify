import React, { useState, useContext } from "react";
import { useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";
import { AuthContext } from "../context/authContext";
import { useNavigate, NavLink } from "react-router-dom";
import { SearchBarContext } from "../context/searchBarContext";
import { GET_SONGS } from "../utils/queries/songQueries";
import SearchIcon from "@mui/icons-material/Search";
import { ReactComponent as Hamburger } from "../assets/hamburger.svg";

import {
  UserOutlined,
  QuestionCircleOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Avatar, Menu, Dropdown, Space, message, Modal, Drawer } from "antd";
import Button from "../components/Button";
import logo from "../assets/soundify9-logo.png";
import Media from "react-media";
import { ReactComponent as Close } from "../assets/close.svg";

const Navbar = ({ setDashSearchResults }) => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(!visible);
  };
  let navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const username = localStorage.getItem("username");
  const { searchBar, setSearchBar } = useContext(SearchBarContext);

  const [song, { loading, error, data: songData }] = useLazyQuery(GET_SONGS, {
    onCompleted: (songData) => {
      return songData;
    },
  });

  const onLogout = () => {
    logout();
  };

  const onChange = (event) => {
    const { value } = event.target;
    setSearchBar(value);
  };

  const handleSearchClick = (songList) => {
    localStorage.setItem("searchResult", searchBar);
    navigate("./DashResults", { songList });
    window.location.reload();
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
        // {
        //   label: (
        //     <Link to="/">
        //       <li className="menu-item">Home</li>
        //     </Link>
        //   ),
        // },
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
              <li className="menu-item">Playlists</li>
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
        <Media query={{ maxWidth: 1000 }}>
          {(matches) =>
            matches ? (
              <>
                <div to="#" className="hamburger-menu">
                  <Hamburger style={{ width: "2rem" }} onClick={showDrawer} />
                </div>
                <Drawer
                  closeIcon={<Close style={{ width: "1.5rem" }} />}
                  width="280px"
                  placement="right"
                  onClose={showDrawer}
                  visible={visible}
                >
                  <div className="drawer-links">
                    <div style={{ display: "flex", margin: "0 0 2rem" }}>
                      <input
                        type="text"
                        placeholder="Search by song or artist"
                        name="searchBar"
                        id="searchBarHamburger"
                        onChange={onChange}
                      ></input>
                      <button
                        onClick={async (e) => {
                          showDrawer();
                          if (searchBar !== "") {
                            let { data } = await song({
                              variables: { title: searchBar },
                            });

                            let songList = Object.values(
                              Object.values(data)[0]
                            );
                            if (setDashSearchResults !== undefined) {
                              setDashSearchResults(songList);
                              localStorage.setItem(
                                "searchResults",
                                JSON.stringify(songList)
                              );
                            }
                            handleSearchClick(songList, e);
                          }
                        }}
                        id="searchBtnHamburger"
                      >
                        <SearchIcon />
                      </button>
                    </div>
                    <NavLink to="/" className="nav-link" onClick={showDrawer}>
                      Home
                    </NavLink>
                    <NavLink
                      to="/uploads"
                      className="nav-link"
                      onClick={showDrawer}
                    >
                      Upload
                    </NavLink>
                    <NavLink
                      to="/playlists"
                      className="nav-link"
                      onClick={showDrawer}
                    >
                      Playlist
                    </NavLink>
                    <div className="hamburger-logout" onClick={modal}>
                      Logout
                    </div>
                  </div>
                </Drawer>
              </>
            ) : (
              <div className="ul-container">
                <div className="searchContainer">
                  <input
                    type="text"
                    placeholder="Search by song or artist"
                    name="searchBar"
                    id="searchBar"
                    onChange={onChange}
                  ></input>
                  <button
                    onClick={async (e) => {
                      if (searchBar !== "") {
                        let { data } = await song({
                          variables: { title: searchBar },
                        });

                        let songList = Object.values(Object.values(data)[0]);
                        if (setDashSearchResults !== undefined) {
                          setDashSearchResults(songList);
                          localStorage.setItem(
                            "searchResults",
                            JSON.stringify(songList)
                          );
                        }
                        handleSearchClick(songList, e);
                      }
                    }}
                    id="searchBtn"
                  >
                    <SearchIcon />
                  </button>
                </div>
                <li className="upload">
                  <Link to="/">Home</Link>
                </li>
                <li className="upload">
                  <Link to="/uploads">Upload</Link>
                </li>
                <li className="profile">
                  <Dropdown
                    overlay={menu}
                    trigger={["hover"]}
                    className="dropdown"
                  >
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
            )
          }
        </Media>
      ) : (
        <Link to="/register" className="link">
          <Button className="solid-btn nav-btn">Create account</Button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;

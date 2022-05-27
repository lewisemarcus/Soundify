// import { Carousel } from "antd";
import { Row, Col } from "antd"
import { useLazyQuery } from "@apollo/client"
import { GET_SONGS } from "../../utils/queries/songQueries"
import React, { useState } from "react"
import DashboardPlayer from "./DashboardPlayer"
import "./styles/Dashboard.css"

const DashCarousel = () => {
    const [searchBar, setSearchBar] = useState("")
    const [song, { loading, error, data: myData }] = useLazyQuery(GET_SONGS)

    if (loading) return <p>Loading ...</p>

    if (error) return `Error! ${error}`

    const onChange = (event) => {
        const { value } = event.target
        setSearchBar(value)
        console.log(searchBar)
    }
    const username = localStorage.getItem("username")
    console.log(">>>>>>>>>", myData)
    return (
        <div className="main-container">
            <div className="main-header">
                <h2>
                    Welcome,{" "}
                    {username.charAt(0).toUpperCase() + username.slice(1)}
                </h2>
            </div>
            <div className="searchContainer">
                <input
                    typeof="text"
                    placeholder="Search Songs"
                    name="searchBar"
                    id="searchBar"
                    onChange={onChange}
                ></input>
                <button
                    onClick={() => song({ variables: { title: searchBar } })}
                    id="searchBtn"
                >
                    Search
                </button>
            </div>
            <div className="musicPlayer">
                <div className="main-items">
                    {" "}
                    <DashboardPlayer sdata={myData} />{" "}
                </div>
                <div className="main-items">
                    {" "}
                    <DashboardPlayer sdata={myData} />{" "}
                </div>
                <div className="main-items">
                    {" "}
                    <DashboardPlayer sdata={myData} />{" "}
                </div>

                {/* <Row>
      <Col span={8} className="main-items"> <DashboardPlayer /> </Col>
      <Col span={8} className="main-items"> <DashboardPlayer /> </Col>
      <Col span={8} className="main-items"> <DashboardPlayer /> </Col>
    </Row> */}

                {/* <div className="carousel-items">
          <DashMusicCard />
        </div>
        <div className="carousel-items">
          <DashMusicCard />
        </div>
        <div className="carousel-items">
          <DashMusicCard />
        </div> */}
            </div>

            <div className="genreContainer">
                <button className="genre1">Rock</button>
                <button className="genre1">R&B</button>
                <button className="genre1">Hiphop</button>
                <button className="genre1">EDM</button>
                <button className="genre1">Pop</button>
                <button className="genre1">Classical</button>
            </div>
        </div>
    )
}

export default DashCarousel

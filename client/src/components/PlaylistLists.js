import { Divider, List, Skeleton } from "antd"
import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { AiFillCloseCircle } from "react-icons/ai"
import "./styles/PlaylistList.css"

const PlaylistList = ({ data, handleClick }) => {
    return (
        <div
            id="scrollableDiv"
            style={{
                height: 600,
                width: 400,
                overflow: "auto",
                padding: "0 16px",
                border: "1px solid rgba(140, 140, 140, 0.35)",
            }}
        >
            <InfiniteScroll
                dataLength={data.length}
                hasMore={data.length < 50}
                loader={
                    <Skeleton
                        paragraph={{
                            rows: 1,
                        }}
                        active
                    />
                }
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item className="" key={item._id}>
                            <List.Item.Meta
                                style={{
                                    textAlign: "left",
                                    flexDirection: "row",
                                }}
                                name={item.link}
                                onClick={handleClick}
                                songTitle={item.title}
                                songArtist={item.artist}
                                title={
                                    <p className="playlist-head">
                                        Title: {item.title}
                                    </p>
                                }
                                description={
                                    <p className="playlist-head">
                                        Artist: {item.artist}
                                    </p>
                                }
                            />

                            <button id="removeBtn">
                                <div>
                                    <span
                                        className="trashcan"
                                        style={{
                                            color: "red",
                                            marginTop: "7px",
                                        }}
                                    >
                                        <AiFillCloseCircle />
                                    </span>
                                </div>
                            </button>
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
    )
}

export default PlaylistList

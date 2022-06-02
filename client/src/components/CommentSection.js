import React, { useState, useEffect } from "react"
import { List, Avatar, Skeleton, Divider } from "antd"
import InfiniteScroll from "react-infinite-scroll-component"

const CommentSection = ({ comments }) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    const loadMoreData = () => {
        if (loading) {
            return
        }

        setLoading(true)
        //TODO: create a function to load more data once you reach bottom of page
        setData([...comments])
        setLoading(false)
    }

    useEffect(() => {
        loadMoreData()
    }, [comments.length])
    return (
        <div
            id="scrollableDiv"
            style={{
                height: 400,
                overflow: "auto",
                padding: "0 16px",
                border: "1px solid rgba(140, 140, 140, 0.35)",
            }}
        >
            <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                hasMore={data.length < 50}
                loader={
                    <Skeleton
                        avatar
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
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="" />}
                                title={
                                    <a href="https://ant.design">
                                        {item.commentAuthor}
                                    </a>
                                }
                            />
                            <div>{item.commentText}</div>
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
    )
}

export default CommentSection

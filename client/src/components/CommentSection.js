import React, { useState, useEffect } from "react"
import { List, Avatar, Skeleton, Divider } from "antd"
import InfiniteScroll from "react-infinite-scroll-component"
import { DELETE_COMMENT } from "../utils/mutations/commentMutations"
import { useMutation } from "@apollo/client"
import { FaTrashAlt } from "react-icons/fa"

const CommentSection = ({ comments, songId }) => {
    const username = localStorage.getItem("username")
    const token = localStorage.getItem("token")
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [removeComment, { error }] = useMutation(DELETE_COMMENT)
    const loadMoreData = () => {
        if (loading) {
            return
        }

        setLoading(true)
        //TODO: create a function to load more data once you reach bottom of page
        setData([...comments])
        setLoading(false)
    }

    const removeCommentHandler = async (event) => {
        event.preventDefault()
        try {
            await removeComment({
                variables: {
                    songId: songId,
                    commentId: event.currentTarget.id,
                    token: token,
                },
            })
        } catch (err) {
            //TODO: Add error handling.
            console.log(err)
        }
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
                                style={{ width: "10%" }}
                                avatar={<Avatar src="" />}
                                title={
                                    <a href="https://ant.design">
                                        {item.commentAuthor}
                                    </a>
                                }
                            />
                            <div style={{ marginRight: 10, width: "70%" }}>
                                {item.commentText}
                            </div>
                            <button
                                id={item._id}
                                onClick={removeCommentHandler}
                            >
                                <FaTrashAlt />
                            </button>
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
    )
}

export default CommentSection

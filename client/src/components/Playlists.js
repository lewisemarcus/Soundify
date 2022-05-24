import React from "react";
import { Row, Col } from "antd"
import { AiFillCloseCircle } from "react-icons/ai";

const PlaylistCard = (props) => {
    const {id, title, artist, audioSrc} = props.playlist;
    
    return (
        <Row>
            <Col span={8}><a src={audioSrc}><h2 className="playlist-header">{title}</h2></a></Col>
            <Col span={8}><h2 className="playlist-header">{artist}</h2></Col>
            <Col span={8}><i className="trashcan" style={{color:'red', marginTop: '7px'}}><AiFillCloseCircle /></i></Col>
        </Row>
    )
}

export default PlaylistCard;
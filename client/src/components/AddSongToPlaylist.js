import React from "react";

class AddSongToPlaylist extends React.Component {
    state = {
        id: "",
        title: "",
        artist: "",
        audioSrc: "",
    }

    add = (e) => {
        e.preventDefault();
        this.props.addSongHandler(this.state);
        this.setState({ id: '', title: '', artist: '', audioSrc: '' })
    }
}
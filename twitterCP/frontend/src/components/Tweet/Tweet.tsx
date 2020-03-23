import React, { Component } from "react";
import api from '../../services/api'

import like from "../../like.svg";
import "./Tweet.css";

interface Props {
  tweet: ITweet;
}
interface ITweet {
  _id: string;
  author: string;
  content: string;
  likes: Number;
  createdAt: Date;
}

export default class Tweet extends Component<Props> {
  handleLike = async (): Promise<void> => {
    const { _id } = this.props.tweet

    await api.post(`likes/${_id}`)
  }

  render() {
    const { tweet } = this.props;
    return (
      <li className="tweet">
        <strong>{tweet.author}</strong>
        <p>{tweet.content}</p>
        <button type="button" onClick={this.handleLike}>
          <img src={like} alt="Like" />
          {tweet.likes}
        </button>
      </li>
    );
  }
}

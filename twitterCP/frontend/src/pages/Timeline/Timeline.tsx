import React, { Component, Props } from "react";
import api from "../../services/api";
import socket from "socket.io-client";

import twitterlogo from "../../twitter.svg";
import "./Timeline.css";
import Tweet from "../../components/Tweet/Tweet";

interface ITimeline {
  tweets: ITweet[];
  newTweet: string;
}

interface ITweet {
  _id: string;
  author: string;
  content: string;
  likes: Number;
  createdAt: Date;
}

export default class Timeline extends Component<Props<any>, ITimeline, ITweet> {
  public state: ITimeline;
  constructor(props: Props<any>) {
    super(props);
    this.state = {
      tweets: [],
      newTweet: ""
    };
  }

  async componentDidMount(): Promise<void> {
    this.subscribeToEvents();

    const response = await api.get<ITweet[]>("tweets");

    this.setState({ tweets: response.data });
  }

  subscribeToEvents = (): void => {
    const io = socket("http://localhost:3000");

    io.on("tweet", (data: ITweet) => {
      this.setState({ tweets: [data, ...this.state.tweets] });
    });

    io.on("like", (data: ITweet) => {
      this.setState({
        tweets: this.state.tweets.map(tweet =>
          tweet._id === data._id ? data : tweet
        )
      });
    });
  };

  handleNewTweet = async (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ): Promise<void> => {
    if (e.keyCode !== 13) return;

    const content = this.state.newTweet;
    const author = localStorage.getItem("@GoTwitter:username");

    await api.post("tweets", { content, author });

    this.setState({ newTweet: "" });
  };

  handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({ newTweet: e.target.value });
  };

  render() {
    return (
      <div className="timeline-wrapper">
        <img height={24} src={twitterlogo} alt="GoTwitter" />

        <form>
          <textarea
            value={this.state.newTweet}
            onChange={this.handleInputChange}
            onKeyDown={this.handleNewTweet}
            placeholder="O que está acontecendo?"
          />
        </form>

        <ul className="tweet-list">
          {this.state.tweets.map(tweet => (
            <Tweet key={tweet._id} tweet={tweet}></Tweet>
          ))}
        </ul>
      </div>
    );
  }
}

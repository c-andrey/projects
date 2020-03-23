import React, { Component } from "react";
import { History } from 'history';

import twitterlogo from "../../twitter.svg";
import "./Login.css";

interface IState {
  username: string 
}

interface IProps {
  history: History
}


export default class Login extends Component<IProps, IState> {
  public state: IState;

  constructor(props: IProps) {
    super(props);
    this.state = {
      username: ''
    }
  }

  handleInputChange = (e: any) => {
    this.setState({ username: e.target.value });
  };

  handleSubmit = (e: any) => {
    e.preventDefault();

    const { username } = this.state

    if (!username.length) return;

    localStorage.setItem('@GoTwitter:username', username)

    this.props.history.push('/timeline')
  };

  render() {
    return (
      <div className="login-wrapper">
        <img src={twitterlogo} alt="GotTwitter" />

        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.username}
            onChange={this.handleInputChange}
            placeholder="Nome do Usuário"
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }
}

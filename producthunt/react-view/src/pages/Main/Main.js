import React, { Component } from "react";

import "./styles.css";

import Button from "../../components/Utils/Button/Button";
import api from "../../services/api";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.store = this.store.bind(this);
    this.inputTitle = React.createRef();
    this.inputDescription = React.createRef();
    this.inputUrl = React.createRef();
  }

  store = async event => {
    event.preventDefault();
    const product = {
      title: this.inputTitle.current.value,
      description: this.inputDescription.current.value,
      url: this.inputUrl.current.value
    };

    const response = await api.post('/products', product)

    console.log(response)
  };

  alertar = () => {
    console.log("asd");
  };

  render() {
    return (
      <div className="product-store">
        <form onSubmit={this.store}>
          <h2>Cadastrar Produto</h2>
          <div>
            <label>Título:</label>
            <input
              className="input"
              type="text"
              name="title"
              ref={this.inputTitle}
              id="title"
            ></input>
          </div>
          <div>
            <label>Descrição:</label>
            <textarea
              className="input"
              type="textarea"
              rows="4"
              cols="40"
              name="description"
              ref={this.inputDescription}
              id="description"
            ></textarea>
          </div>
          <div>
            <label>URL:</label>
            <input
              className="input"
              type="text"
              name="url"
              ref={this.inputUrl}
              id="url"
            ></input>
          </div>

          <Button type="submit" value="Store Product"></Button>
        </form>
      </div>
    );
  }
}

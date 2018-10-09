import React, { Component } from 'react';
import { Route } from "react-router-dom";

import Layout from "./Layout";
import Movie from "../movie/Movie";
import Popular from "../movie/Popular";


class Content extends Component {
  render() {
    return (
        <div className="content">
            <Route exact path="/" component={Layout} />
            <Route exact path="/popular" component={Popular} />
            <Route exact path="/movie/:id" component={Movie} />
        </div>      
    );
  }
}

export default Content;

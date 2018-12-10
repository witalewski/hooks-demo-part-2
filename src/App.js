import React, { Component } from "react";
import { GitReposFeed } from "./components/GitReposFeed";

class App extends Component {
  render() {
    return (
      <div className="App">
        <GitReposFeed />
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import axios from "axios";
import { GitRepo } from "./GitRepo";
import { WithInfiniteScroll } from "../lib/WithInfiniteScroll";

export class GitReposFeed extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], lastLoadedItem: 0, isLoading: false };
  }
  loadMoreItems = () => {
    this.setState({ isLoading: true });
    axios
      .get("https://api.github.com/repositories", {
        params: {
          since: this.state.lastLoadedItem
        }
      })
      .then(({ data }) =>
        this.setState({
          items: [...this.state.items, ...data],
          lastLoadedItem: data[data.length - 1].id,
          isLoading: false
        })
      );
  };

  render() {
    return (
      <WithInfiniteScroll loadMoreItems={this.loadMoreItems} isLoading={this.state.isLoading}>
        {this.state.items.length ? (
          <ul className="repos-list" ref={this.listRef}>
            {this.state.items.map(item => (
              <li className="repos-list__item" key={item.id}>
                <GitRepo repo={item} />
              </li>
            ))}
          </ul>
        ) : (
          "Loading..."
        )}
      </WithInfiniteScroll>
    );
  }
}

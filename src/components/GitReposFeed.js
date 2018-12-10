import React, { Component, createRef } from "react";
import axios from "axios";
import { GitRepo } from "./GitRepo";

export class GitReposFeed extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], lastLoadedItem: 0, isLoading: false };
    this.listRef = createRef();
  }

  shouldLoadMoreItems = () =>
    !this.state.isLoading &&
    this.listRef.current &&
    this.listRef.current.getBoundingClientRect().bottom <
      window.innerHeight + window.pageYOffset;

  loadMoreItems = () =>
    this.setState({ isLoading: true }) ||
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

  onScroll = () => this.shouldLoadMoreItems() && this.loadMoreItems();
  onResize = () => this.shouldLoadMoreItems() && this.loadMoreItems();

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll);
    window.addEventListener("resize", this.onResize);
    this.loadMoreItems();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.onResize);
  }

  render() {
    return this.state.items.length ? (
      <ul className="repos-list" ref={this.listRef}>
        {this.state.items.map(item => (
          <li className="repos-list__item" key={item.id}>
            <GitRepo repo={item} />
          </li>
        ))}
      </ul>
    ) : (
      "Loading..."
    );
  }
}

import React, { Component } from "react";

export class WithInfiniteScroll extends Component {
  shouldLoadMoreItems = () =>
    !this.props.isLoading &&
    this.props.forwardedRef.current &&
    this.props.forwardedRef.current.getBoundingClientRect().bottom <
      window.innerHeight + window.pageYOffset;

  onWindowEvent = () =>
    this.shouldLoadMoreItems() && this.props.loadMoreItems();

  componentDidMount() {
    window.addEventListener("scroll", this.onWindowEvent);
    window.addEventListener("resize", this.onWindowEvent);
    this.props.loadMoreItems();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onWindowEvent);
    window.removeEventListener("resize", this.onWindowEvent);
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

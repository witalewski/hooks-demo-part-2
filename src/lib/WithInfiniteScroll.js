import React, { Component, createRef } from "react";

export class WithInfiniteScroll extends Component {
  constructor(props) {
    super(props);
    this.selfRef = createRef();
  }

  shouldLoadMoreItems = () =>
    !this.props.isLoading &&
    this.selfRef.current &&
    this.selfRef.current.getBoundingClientRect().bottom <
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
    return <div ref={this.selfRef}>{this.props.children}</div>;
  }
}

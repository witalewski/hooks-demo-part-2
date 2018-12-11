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

  onScroll = () => this.shouldLoadMoreItems() && this.props.loadMoreItems();
  onResize = () => this.shouldLoadMoreItems() && this.props.loadMoreItems();

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll);
    window.addEventListener("resize", this.onResize);
    this.props.loadMoreItems();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.onResize);
  }

  render() {
    return <div ref={this.selfRef}>{this.props.children}</div>;
  }
}

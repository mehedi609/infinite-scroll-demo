import React, { Component } from "react";
import axios from "axios";
import { DATA } from "./data";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
  height: 200,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

class ScrollComponent extends Component {
  state = {
    posts: [],
    // page: 10,
    hasMore: true,
    per: 3,
    page: 0,
  };

  componentDidMount() {
    // this.setState({ posts: DATA.slice(0, this.state.page) });
    this.loadUser();
  }

  loadUser = () => {
    const { per, page, posts } = this.state;
    const url = `https://reqres.in/api/users?per_page=${per}&page=${page + 1}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) =>
        this.setState({
          posts: [...posts, ...json.data],
          // scrolling: false,
          // total_pages: json.total_pages,
        })
      );
  };

  loadMore = () => {
    this.setState(
      (prevState) => ({
        page: prevState.page + 1,
        // scrolling: true,
      })
      // this.loadUser
    );
  };

  // fetchMoreData = () => {
  //   if (this.state.posts.length >= 500) {
  //     this.setState({ hasMore: false });
  //     return;
  //   }
  //   // a fake async api call like which sends
  //   // 20 more records in .5 secs
  //   setTimeout(() => {
  //     this.setState((prevState) => ({
  //       posts: [
  //         ...prevState.posts,
  //         ...DATA.slice(prevState.page, prevState.page + 10),
  //       ],
  //       page: prevState.page + 10,
  //     }));
  //   }, 1500);
  // };

  fetchMoreData = () => {
    if (this.state.posts.length >= 500) {
      this.setState({ hasMore: false });
      return;
    }

    this.loadUser();
    this.setState((prevS) => ({ page: prevS.page + 1 }));

    // const { per, page, posts } = this.state;
    // const url = `https://reqres.in/api/users?per_page=${per}&page=${page + 1}`;
    // fetch(url)
    //   .then((response) => response.json())
    //   .then((json) =>
    //     this.setState((prevState) => ({
    //       posts: [...posts, ...json.data],
    //       page: prevState.page + 1,
    //       // scrolling: false,
    //       // total_pages: json.total_pages,
    //     }))
    //   ); // this.setState(prevState => ({page: prevState.page + 1}));
    // const url = `https://reqres.in/api/users?per_page=${per}&page=${page+1}`;
    // axios.get(url).then((res) => this.setState({ posts: res.data }));
  };

  render() {
    const { posts } = this.state;
    return (
      <div>
        <h1>Scroll Component</h1>
        <InfiniteScroll
          dataLength={posts.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {posts.map(({ id, email }) => (
            <div style={style} key={id}>
              <p>ID - {id}</p>
              <p>{email}</p>
            </div>
          ))}
        </InfiniteScroll>
        {/*{posts.map(({ id, email }) => (*/}
        {/*  <div style={style} key={id}>*/}
        {/*    <p>ID - {id}</p>*/}
        {/*    <p>{email}</p>*/}
        {/*  </div>*/}
        {/*))}*/}
      </div>
    );
  }
}

export default ScrollComponent;

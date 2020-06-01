import React, { Component } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
  height: 80,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

class InfiniteScrollComponent extends Component {
  state = {
    photos: [],
    page: 0,
  };

  getPhotos() {
    const { page, photos } = this.state;

    // this.setState({ loading: true });
    axios
      .get(
        `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`
      )
      .then((res) => {
        this.setState({ photos: [...photos, ...res.data] });
      });
  }

  componentDidMount() {
    this.getPhotos();
  }

  fetchMoreData = () => {
    // this.getPhotos(this.state.page + 1);
    this.setState((prevS) => ({ page: prevS.page + 1 }), this.getPhotos);
  };

  render() {
    const { photos } = this.state;

    return (
      <div>
        <InfiniteScroll
          dataLength={photos.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {photos.map(({ id, title }) => (
            <div style={style} key={id}>
              <p>ID - {id}</p>
              <p>{title}</p>
            </div>
          ))}
        </InfiniteScroll>

        {/*{photos.map(({ id, title }) => (*/}
        {/*  <div style={style} key={id}>*/}
        {/*    <p>ID - {id}</p>*/}
        {/*    <p>{title}</p>*/}
        {/*  </div>*/}
        {/*))}*/}
      </div>
    );
  }
}

export default InfiniteScrollComponent;

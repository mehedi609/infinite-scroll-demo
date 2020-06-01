import React from "react";
import "./App.css";
import ScrollComponent from "./ScrollComponent";
import InfiniteScrollComponent from "./InfiniteScrollComponent";

function App() {
  return (
    <div className="App">
      {/*<ScrollComponent/>*/}
      <InfiniteScrollComponent />
    </div>
  );
}

export default App;

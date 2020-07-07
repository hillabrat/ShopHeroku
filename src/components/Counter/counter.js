import React, { Component } from "react";

class Counter extends Component {
  //state = { name: "Shuki" };
  state = { count: this.props.initialCount };
  render() {
    console.log(this.props);

    return (
      <div>
        {/* {this.props.counterTitle}
        {this.props.num === 1 ? "COUNTER" : "ELSE"}
        {this.state.name} */}
        <div style={{ color: this.props.color }}>{this.state.count}</div>

        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          change my name
        </button>
      </div>
    );
  }
}

export default Counter;

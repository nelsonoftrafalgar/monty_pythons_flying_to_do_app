import React, { Component } from 'react'

export default class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.update)
  }
  
  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.update)
  }

  update = () => localStorage.setItem("hui", JSON.stringify(this.state))

  increment = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.increment}>plus</button>
      </div>
    )
  }
}

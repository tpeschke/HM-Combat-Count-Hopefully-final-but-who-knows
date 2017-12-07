import React, {Component} from "react"


export default class Counter extends Component {
constructor() {
    super() 

    this.state = {
        count: 1
    }
    this.decreaseSpeed = this.decreaseSpeed.bind(this)
    this.increaseSpeed = this.increaseSpeed.bind(this)
    this.resetCount = this.resetCount.bind(this)
}

    increaseSpeed() {
        this.setState( { count: this.state.count +1} )
    }

    decreaseSpeed() {
        if (this.state.count > 1) {
        this.setState( { count: this.state.count -1} )
        }
    }

    resetCount() {
        this.setState( { count: 1} )
    }

    render() {
        return (
            <div>
                <h1>{this.state.count}</h1>
                <button onClick={this.increaseSpeed}>+</button>
                <button onClick={this.decreaseSpeed}>-</button>
                <button onClick={this.resetCount}>reset</button>
            </div>
        )
    }
}
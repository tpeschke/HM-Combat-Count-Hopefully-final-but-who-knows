import React, { Component } from 'react';

export default class Acting extends Component {
    constructor(props) {
        super(props)

        this.state = {
            autoTimer1: function() {setInterval(props.increaseSpeed, 1000)}
        }

        // this.autoTimer1 = this.autoTimer1.bind(this)
        this.stopTime = this.stopTime.bind(this)
    }

    stopTime() {
        clearInterval(this.state.autoTimer1);
    }

    // autoTimer1() {
        
    // }

    render() {

        return (
            <div className="counter">
                <h1>COUNTER</h1>
                <h1>{this.props.count}</h1>
                <button
                    onClick={this.props.increaseSpeed}>+</button>
                <button
                    onClick={this.props.decreaseSpeed}>-</button>
                <button
                    onClick={this.props.resetCount}>reset</button>
                <button
                    onClick={this.stopTime}>X</button>
                <button
                    onClick={this.state.autoTimer1}>></button>
            </div>
        )
    }
}
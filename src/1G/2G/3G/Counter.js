import React, { Component } from 'react';

export default class Acting extends Component {
    constructor(props) {
        super(props)

        this.state = {
            autoTimer1: function () { setInterval(props.increaseSpeed, 1000) }
        }

        // this.autoTimer1 = this.autoTimer1.bind(this)
        this.stopTime = this.stopTime.bind(this)
    }

    stopTime() {
        console.log(this.state.autoTimer1)
        clearInterval(this.state.autoTimer1);
    }

    // autoTimer1() {

    // }

    render() {

        return (
            <div className="counter">
                <div className="counterSide">
                    <button id="button"
                        //should be the reset symbol instead of 0
                        onClick={this.props.resetCount}>0</button>
                    <button id="button"
                        //figure out how to get < in there without breaking it
                        onClick={this.stopTime}>&lt;</button>
                    <button id="button"
                        onClick={this.props.decreaseSpeed}>-</button>
                </div>

                <div className="counterMain">
                    <h1>The Count</h1>

                    <span className="border"></span>

                    <h1 id="button">{this.props.count}</h1>

                </div>

                <div className="counterSide">
                    <button id="button"
                        onClick={this.props.increaseSpeed}>+</button>
                    <button id="button"
                        onClick={this.state.autoTimer1}>></button>
                    <button id="button"
                        onClick={this.state.autoTimer1}>>></button>
                </div>
            </div>
        )
    }
}
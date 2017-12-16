import React, { Component } from 'react';

export default class Acting extends Component {
    constructor(props) {
        super(props)

        this.state = {
            timeId: 0
        }

        this.stopTime = this.stopTime.bind(this)
    }
        
    stopTime() {
        clearInterval(this.state.timeId);
    }

    autoTimer1 = () => {
        
        this.setState( { timeId: setInterval(this.props.increaseSpeed, 1000) } )
    }

    autoTimer2 = () => {
        
        this.setState( { timeId: setInterval(this.props.increaseSpeed, 500) } )
    }

    render() {

        return (
            <div className="counter">
                <div className="counterSide">
                    <button id="button"
                        //should be the reset symbol instead of 0
                        onClick={this.props.resetCount}>0</button>
                    <button id="button"
                        //figure out how to get < in there without breaking it
                        onClick={this.stopTime}>X</button>
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
                        onClick={this.autoTimer1}>></button>
                    <button id="button"
                        onClick={this.autoTimer2}>>></button>
                </div>
            </div>
        )
    }
}
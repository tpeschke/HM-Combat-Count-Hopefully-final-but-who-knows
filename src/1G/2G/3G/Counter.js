import React, { Component } from 'react';

import { connect } from 'react-redux';
import { increaseCount, decreaseCount, resetCount } from '../../../ducks/reducer'

class Counter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            timeId: 0
        }

    }
 
    stopTime = () => {
        clearInterval(this.state.timeId);
    }

    autoTimer1 = () => {
        clearInterval(this.state.timeId) 
        this.setState( { timeId: setInterval(this.props.increaseCount, 1000) } )
    }

    autoTimer2 = () => {
        clearInterval(this.state.timeId)
        this.setState( { timeId: setInterval(this.props.increaseCount, 500) } )
    }

    render() {

        const { increaseCount, decreaseCount, resetCount } = this.props

        return (
            <div className="counter">
                <div className="counterSide">
                    <button id="button"
                        //should be the reset symbol instead of 0
                        onClick={resetCount}>0</button>
                    <button id="button"
                        onClick={this.stopTime}>X</button>
                    <button id="button"
                        onClick={decreaseCount}>-</button>
                </div>

                <div className="counterMain">
                    <h1>The Count</h1>

                    <span className="border"></span>

                    <h1 id="button">{this.props.count}</h1>

                </div>

                <div className="counterSide">
                    <button id="button"
                        onClick={increaseCount}>+</button>
                    <button id="button"
                        onClick={this.autoTimer1}>></button>
                    <button id="button"
                        onClick={this.autoTimer2}>>></button>
                </div>
            </div>
        )
    }
}

function mapStateToProps ( state ) {

    var { count } = state

    return {
        count
    }
}

let actionBuilers = {
    increaseCount, 
    decreaseCount, 
    resetCount
}


export default connect( mapStateToProps, actionBuilers )( Counter )
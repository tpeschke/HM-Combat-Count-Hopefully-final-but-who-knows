import React, { Component } from 'react';

export default class StatusTimer extends Component {
    constructor() {
        super()

        this.state = {
            status: [{ name: 'BLINDNESS', time: 30 },
            { name: 'FIRE', time: 15 }],
        }
    }

    componentWillReceiveProps() {
        this.state.status.map((d, i) => {
            d.time = d.time - this.props.count
        })
    }

    render() {

        var statuses = this.state.status.map((d, i) => {

            return <div key={d.name + i + 'status'} className="statusInner">

                <h5>{d.name}</h5>

                <h6>{d.time}</h6>

            </div>
        })

        return (
            <div className='statusOuter'>
                {statuses}
            </div>
        )
    }
}
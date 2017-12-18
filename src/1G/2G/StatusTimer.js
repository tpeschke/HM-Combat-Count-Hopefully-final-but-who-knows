import React, { Component } from 'react';
import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css';
import axios from 'axios';

export default class StatusTimer extends Component {
    constructor() {
        super()

        this.state = {
            status: [],
        }
    }

    componentDidMount() {
        axios.get('/api/statuses').then(res => {
            this.setState( { status: res.data } )
        })
    }


    componentWillReceiveProps() {
        this.state.status.map((d, i) => {

            if ( (d.time - this.props.count ) === 0) {
                var tempArr = this.state.status;

                tempArr.splice(i, 1)

                this.setState( { status: tempArr } )
            }
        })
        
    }



    render() {

        var statuses = this.state.status.map((d, i) => {

            return <button key={d.name + i + 'status'} className="statusInner">

                <h5>{d.name}</h5>

                <h6>{d.time - this.props.count}</h6>

            </button>
        })

        return (
            <div className='statusOuter'>
                {statuses}
            </div>
        )
    }
}
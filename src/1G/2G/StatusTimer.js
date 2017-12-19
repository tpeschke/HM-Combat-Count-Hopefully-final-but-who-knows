import React, { Component } from 'react';
import axios from 'axios';

export default class StatusTimer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            status: []
        }
    }

    componentDidMount() {
        axios.get('/api/statuses').then(res => {
            this.setState( { status: res.data } )
        })
    }


    componentWillReceiveProps() {

        this.state.status.map((d, i) => {

            if ( d.time === 0) {
                var tempArr = this.state.status;

                tempArr.splice(i, 1)

                this.setState( { status: tempArr } )
            }
        })
        
    }

    onOpenStatus = () => {
        this.setState({ openStatus: true });
    };

    onCloseStatus = () => {
        this.setState({ openStatus: false });
    };

    handleName = (e) => {
        this.setState( { nameHold: e } )
    }

    handleStatus = (e) => {
        this.setState( { timeHold: +e + 1 } )
    }

    submitStatus = _ => {

        var newId = Math.floor(Math.random() * 1000)

        var newStatus = {
            statId: newId,
            name: this.state.nameHold,
            time: +this.state.timeHold - 1
        }

        axios.post('/api/statuses', newStatus).then( res => {
            this.setState( { status: res.data } )
        })

        this.onCloseStatus()
    }

    deleteStatus = (id) => {

        axios.delete(`/api/statuses/${id}`).then( res => {
            this.setState( { status: res.data } )
        })

    }

    render() {

        var statuses = this.state.status.map((d, i) => {

            return <button key={d.name + i + 'status'} className="statusInner" onClick={_ => this.deleteStatus(d.statId)}>

                <h5>{d.name}</h5>

                <h6>{d.time}</h6>

            </button>
        })

        return (
            <div className='statusOuter'>
                {statuses}
            </div>
        )
    }
}
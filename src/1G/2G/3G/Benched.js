import React, { Component } from 'react';

export default class Benched extends Component {


    render() {

        var fightersBenched = this.props.benched.map(d => {
            return <div className='fighter'>
                <p key={d.name} className="input">{d.name}</p>
                <p key={d.action} className="input">{d.action}</p>
            </div>
        })
            
        return (
            <div>
                <h2>BENCHED</h2>
                <div>
                    <p className="input"> Name</p>
                    <p className="input"> Action</p>
                </div>
                {fightersBenched}
            </div >
        )
    }
}
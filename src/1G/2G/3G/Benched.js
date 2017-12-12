import React, { Component } from 'react';

export default class Benched extends Component {


    render() {

        var fightersBenched = this.props.benched.map(d => {
            return <div key={d.name} className='fighter'>

                <p className="input">
                    {d.name}</p>

                <button className="input"
                    onClick={_ => this.props.fighterSpeed(d)} >
                    {d.speed}</button>

                <input className="input"
                    placeholder={d.action}
                    onChange={e => this.props.handleHoldAction(e.target.value)}
                    onBlur={_ => this.props.matchAction(d)} />

                <button className="input"
                    onClick={_ => this.props.ToP(d)} >
                    :(</button>

                <button className="input"
                    onClick={_ => this.props.murder(d)} >
                    X</button>
            </div>
        })

        return (
            <div>
                <h2>BENCHED</h2>
                <div>
                    <p className="input"> Name</p>
                    <p className="input"> Speed</p>
                    <p className="input"> Action</p>
                    <p className="input"> ToP</p>
                    <p className="input"> Kill</p>
                </div>
                {fightersBenched}
            </div >
        )
    }
}
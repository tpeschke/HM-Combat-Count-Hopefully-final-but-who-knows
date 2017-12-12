import React, { Component } from 'react';

export default class Acting extends Component {


    render() {

        var fightersActive = this.props.active.map(d => {
            console.log(d)
            return <div className='fighter'>

                <p key={d.name} className="input">{d.name}</p>

                <button 
                    onClick={_=> this.props.fighterSpeed(d)} 
                    className="input">
                    {d.speed}</button>

                <input  className="input" 
                    placeholder={d.action}
                    onChange={e => this.props.handleHoldAction(e.target.value)}
                    onBlur={_ => this.props.matchAction(d)} />

                <button 
                    onClick={_=> this.props.murder(d)} 
                    className="input">
                    X</button>
            </div>
        })
            
        return (
            <div>
                <h2>ACTING</h2>
                <div>
                    <p className="input"> Name</p>
                    <p className="input"> Speed</p>
                    <p className="input"> Action</p>
                    <p className="input"> Kill</p>
                </div>
                {fightersActive}
            </div >
        )
    }
}
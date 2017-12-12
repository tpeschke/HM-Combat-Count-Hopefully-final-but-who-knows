import React, { Component } from 'react';

export default class Graveyard extends Component {


    render() {

        var fightersGraveyard = this.props.graveyard.map(d => {
            return <div key={d.name} className='fighter'>
                <p 
                    className="input">
                        {d.name}</p>
                <button 
                    onClick={_=> this.props.resurrect(d)} 
                    className="input">
                        :)</button>
            </div>
        })
            
        return (
            <div>
                <h2>The Dead</h2>
                <div>
                    <p className="input">Name</p>
                    <p className="input">Resurrect</p>
                </div>
                {fightersGraveyard}
            </div >
        )
    }
}
import React, { Component } from 'react';

export default class Graveyard extends Component {


    render() {

        var fightersGraveyard = this.props.graveyard.map(d => {
            return <div key={d.name} className='fighter'>


                <p className="input graveyard" id="inputName" >
                        {d.name}</p>
                <button 
                    onClick={_=> this.props.resurrect(d)} 
                    className="input graveyard">
                        :)</button>
            </div>
        })
            
        return (
            <div>
                <h2>The Dead</h2>
                <div className="fighters">
                    <h3 className="input graveyard" id="inputName">Name</h3>
                    <h3 className="input graveyard">Resurrect</h3>
                </div>
                {fightersGraveyard}
            </div >
        )
    }
}
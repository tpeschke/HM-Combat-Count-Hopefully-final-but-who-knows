import React, { Component } from 'react';

export default class Graveyard extends Component {

    removeFighterG = (e) => {
        this.props.removeFighter(e)
    }


    render() {

        var fightersGraveyard = this.props.graveyard.map(d => {
            return <div key={d.name} className='fighter'>


                <p className="input" id="inputName graveyard" >
                    {d.name}</p>
                <button
                    onClick={_ => this.props.resurrect(d)}
                    className="input" id="graveyard">
                    :)</button>

                <button
                    onClick={_ => this.removeFighterG(d.fighterId)}
                    className="input" id="graveyard">
                    D:</button>
            </div>
        })

        return (
            <div>
                <h2>The Dead</h2>
                <div className="fighters">
                    <h3 className="input" id="inputName graveyard">Name</h3>
                    <h3 className="input" id="graveyard">Resurrect</h3>
                    <h3 className="input" id="graveyard">Remove</h3>
                </div>
                {fightersGraveyard}
            </div >
        )
    }
}
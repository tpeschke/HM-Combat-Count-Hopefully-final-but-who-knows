import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

export default class Benched extends Component {
    constructor() {
        super()

        this.state = {
            topAmount: 0,
            open: false,
            fighterCell: {}
        }
        this.topStyle = this.topStyle.bind(this)
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
        this.props.benched.forEach(val => {
            if (val.name === this.state.fighterCell.name) {
                val.action = val.action + (this.state.topAmount * 3)
                val.top = true
            }
        })
        this.props.sort()
    };

    handleToP(d) {
        this.onOpenModal()
        this.setState({ fighterCell: d })
    }

    topStyle(d) {
        var divStyle = {}
        if (d.top === true) {
            divStyle = { background: 'radial-gradient(#da0404, #da040400, #da040400)' }
        } else {
            divStyle = {}
        }
        return divStyle
    }

    render() {

        const { open } = this.state;

        var fightersBenched = this.props.benched.map((d, i) => {

            let divStyle = this.topStyle(d)
            let color = { background: d.color }

            return <div key={d.name + i + "benched"} className='fighter' style={divStyle}>

                <p className="input" id="color" style={color}></p>

                <p className="input" id="inputName">
                    {d.name}</p>

                <button className="input"
                    onClick={_ => this.props.fighterSpeed(d)} >
                    {d.speed}</button>

                <input className="input"
                    placeholder={d.action}
                    onBlur={(e) => this.props.matchAction(d, e.target.value)} />

                <button className="input"
                    onClick={_ => this.handleToP(d)} >
                    :(</button>

                <button className="input"
                    onClick={_ => this.props.murder(d)} >
                    X</button>
            </div>
        })

        return (

            <div>
                <h2>BENCHED</h2>
                <div className="fighters">
                    <h3 className='input' id='colorhead'></h3>
                    <h3 className="input" id="inputName"> Name</h3>
                    <h3 className="input"> Speed</h3>
                    <h3 className="input"> Action</h3>
                    <h3 className="input"> ToP</h3>
                    <h3 className="input"> Kill</h3>
                </div>
                {fightersBenched}


                <Modal open={open} onClose={this.onCloseModal} little>
                    <p>Enter how much combatant failed by</p>
                    <input
                        onChange={e => this.setState({ topAmount: e.target.value })} />
                </Modal>
            </div >
        )
    }
}
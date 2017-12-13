import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

export default class Acting extends Component {
    constructor() {
        super()

        this.state = {
            topAmount: 0,
            open: false,
            fighterCell: {}
        }
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
        this.props.active.forEach(val => {
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

    updateAction = (e, d) => {
        this.props.matchAction(d, e.target.value)
        e.target.value = ''
    }

    render() {

        const { open } = this.state;

        var fightersActive = this.props.active.map((d, i) => {
            return <div className='fighter' key={d.name + i + "acting"}>

                <p key={d.name} className="input">{d.name}</p>

                <button
                    onClick={_ => this.props.fighterSpeed(d)}
                    className="input">
                    {d.speed}</button>

                <input className="input"
                    placeholder={d.action}
                    onBlur={(e) => this.props.matchAction(d, e.target.value)} />

                <button className="input"
                    onClick={_ => this.handleToP(d)} >
                    :(</button>

                <button
                    onClick={_ => this.props.murder(d)}
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
                    <p className="input"> ToP</p>
                    <p className="input"> Kill</p>
                </div>
                {fightersActive}

                <Modal open={open} onClose={this.onCloseModal} little>
                    <p>Enter how much combatant failed by</p>
                    <input
                        onChange={e => this.setState({ topAmount: e.target.value })} />
                </Modal>
            </div >
        )
    }
}
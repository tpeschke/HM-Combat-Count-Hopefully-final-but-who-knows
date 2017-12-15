import React, { Component } from 'react';
import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css';

export default class Acting extends Component {
    constructor() {
        super()

        this.state = {
            topAmount: 0,
            open: false,
            fighterCell: {},
            innerModal: {
                background: "lightcoral"
            }
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

            let color = { background: d.color }

            return <div className='fighter' key={d.name + i + "acting"}>

                <p className="input" id="color" style={color}></p>

                <p key={d.name} className="input" id="inputName">
                    {d.name}</p>

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
            </div >
        })

        return (
            <div>
                <h2>ACTING</h2>
                <div className="fighters">
                    <h3 className='input' id='colorhead'></h3>
                    <h3 className="input" id="inputName"> Name</h3>
                    <h3 className="input"> Speed</h3>
                    <h3 className="input"> Action</h3>
                    <h3 className="input"> ToP</h3>
                    <h3 className="input"> Kill</h3>
                </div>
                {fightersActive}

                <Modal open={open} onClose={this.onCloseModal} little className={this.state.innerModal}>
                    <div className="modalOuter">
                        <div className="modalInner">
                            <p id="modalWord">Enter how much combatant failed by</p>
                            <input id="modalInput"
                                onChange={e => this.setState({ topAmount: e.target.value })} />
                        </div>
                    </div>
                </Modal>
            </div >
        )
    }
}
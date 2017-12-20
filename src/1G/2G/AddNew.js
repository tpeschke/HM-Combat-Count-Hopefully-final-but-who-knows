import React, { Component } from 'react';
import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css';
import { SketchPicker } from 'react-color';

import StatusTimer from './StatusTimer';

export default class AddNew extends Component {
    constructor() {
        super()

        this.state = {
            open: false,
            color: '#fff',
            name: '',
            speed: 0,
            action: 0,

            openStatus: false,
            nameHold: '',
            timeHold: 0,
        }
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    handleChange = (color, event) => {
        this.setState({ color: color.hex });
    }

    handleName = (name) => {
        this.setState({ name: name })
    }

    handleSpeed = (speed) => {
        this.setState({ speed: speed })
    }

    handleAction = (action) => {
        this.setState({ action: action })
    }

    handleSubmit = () => {
        this.props.createFighter(
            this.state.color, this.state.name, this.state.speed, this.state.action);
        this.onCloseModal()
    }

    killAll = () => {
        this.props.clearField()
    }

    openStatus = () => {
        
    }
    


    render() {

        const { open } = this.state;

        const { openStatus } = this.state;

        return (
            <div className="addNew">
                <h1>Combat Workspace</h1>
                <div className="workspace">
                    <button
                        onClick={_ => this.onOpenModal()}
                    >Add New Combatant</button>
                    <button
                        onClick={_ => this.killAll()}
                    >Clear Field</button>
                    <button
                        onClick={_ => this.openStatus()}
                    >Status Timer</button>
                </div>

                <Modal open={open} onClose={this.onCloseModal} little>
                    <div className="outModalNew">
                        <div className="modalBanner">
                        </div >
                        <div className="inModalNew">

                            <div className="modalLeft">
                                <SketchPicker
                                    color={this.state.color}
                                    onChange={this.handleChange} />
                            </div>
                            <div className="modalRight">
                                <h1 id="newCombat">Add New Combatant</h1>
                                <input placeholder="Name" id="modalNewInput"
                                    onChange={e => this.handleName(e.target.value)} />
                                <input placeholder="Speed"id="modalNewInput"
                                    onChange={e => this.handleSpeed(e.target.value)} />
                                <input placeholder="Initiative" id="modalNewInput"
                                    onChange={e => this.handleAction(e.target.value)} />
                                <button id="modalNewButton"
                                    onClick={_ => this.handleSubmit()}>SUBMIT</button>
                            </div>
                        </div>
                    </div>
                </Modal>

                <div>
                    <Modal open={openStatus} onClose={this.onCloseStatus} little>
                        <input placeholder="Status Name" onChange={e=>this.handleName(e.target.value)} />
                        <input placeholder="Status Time" onChange={e=>this.handleStatus(e.target.value)} />
                        <button onClick={_=>this.submitStatus()}>Submit</button>
                    </Modal>
                </div>

                <StatusTimer
                    count={this.state.count} />
                
            </div>
        )
    }
}
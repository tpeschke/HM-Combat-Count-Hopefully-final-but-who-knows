import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import { SketchPicker } from 'react-color';

export default class AddNew extends Component {
    constructor() {
        super()

        this.state = {
            open: false,
            color: '#fff',
            name: '',
            speed: 0,
            action: 0
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

    render() {

        const { open } = this.state;

        return (
            <div className="addNew">
                <h1>Combat Workspace</h1>
                <button
                    onClick={_ => this.onOpenModal()}
                >Add New Combatant</button>


                <Modal open={open} onClose={this.onCloseModal} little>
                    <h1>Add New Combatant</h1>
                    <SketchPicker
                        color={this.state.color}
                        onChange={this.handleChange} />
                    <input placeholder="Name"
                        onChange={e => this.handleName(e.target.value)} />
                    <input placeholder="Speed"
                        onChange={e => this.handleSpeed(e.target.value)} />
                    <input placeholder="Starting Initiative"
                        onChange={e => this.handleAction(e.target.value)} />
                    <button
                        onClick={_ => this.handleSubmit()}>Submit</button>
                </Modal>
            </div>
        )
    }
}
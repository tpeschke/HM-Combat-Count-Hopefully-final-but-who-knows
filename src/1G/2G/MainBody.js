import React, { Component } from 'react';
import axios from 'axios';
import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css';
import { SketchPicker } from 'react-color';

import Acting from "./3G/Acting";
import Benched from "./3G/Benched";
import Graveyard from "./3G/Graveyard";
import Counter from "./3G/Counter";

import AddNew from "./AddNew"
import StatusTimer from './StatusTimer';

export default class MainBody extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fighterTotal: [],
            fighterActive: [],
            fighterBench: [],
            graveyard: [],

            count: 1,
            actionHold: 0,
            topAmount: 0,
            open: false,

            tempId: 0,
            tempColor: '#fff',
            tempName: '',
            tempSpeed: 0,
            tempAction: 0

        }

        this.sort = this.sort.bind(this)
        this.decreaseSpeed = this.decreaseSpeed.bind(this)
        this.increaseSpeed = this.increaseSpeed.bind(this)
        this.resetCount = this.resetCount.bind(this)
        this.fighterSpeed = this.fighterSpeed.bind(this)
        this.murder = this.murder.bind(this)
        this.resurrect = this.resurrect.bind(this)
        this.matchAction = this.matchAction.bind(this)
        this.handleHoldAction = this.handleHoldAction.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
        this.onOpenModal = this.onOpenModal.bind(this)
        this.collectCombatants = this.collectCombatants.bind(this)
        this.createFighter = this.createFighter.bind(this)
    }


    //===============================================================================================================
    //                                     SERVER THINGS
    //===============================================================================================================
    componentDidMount() {
        this.collectCombatants();
    }

    collectCombatants() {
        axios.get('/api/fighters').then(res => {
            this.setState({ fighterTotal: res.data }, this.sort)
        })
    }

    removeFighter = (e) => {
        axios.delete(`/api/fighters/${e}`).then((res, req) => {
            this.setState({ fighterTotal: res.data }, this.sort)
        })
    }

    clearField = () => {
        axios.delete(`/api/fighters`).then((res, req) => {
            this.setState({ fighterTotal: res.data }, this.sort)
        })
    }

    handleEdit = () => {

        var updatedFighter = {
            fighterId: this.state.tempId,
            color: this.state.tempColor,
            name: this.state.tempName,
            speed: this.state.tempSpeed,
            action: this.state.tempAction,
        }

        axios.post(`/api/fighters/`, updatedFighter).then((res, req) => {

            this.setState({ fighterTotal: res.data }, this.sort)
        })
        this.onCloseModal()
    }


    //===============================================================================================================
    //                                 SORT
    //===============================================================================================================
    sort() {

        let sortedFigh = this.state.fighterTotal.sort((a, b) => a.action - b.action);
        this.setState({ fighterTotal: sortedFigh });

        this.state.fighterTotal.forEach(val => {
            if (val.action > this.state.count) {
                val.acting = false
            } else {
                val.acting = true
                val.top = false
            }
        })

        var newBench = [];
        var newActing = [];
        var newGrave = [];


        this.state.fighterTotal.forEach(val => {
            if (val.acting === true && val.dead === false) {
                newActing.push(val)
            } else if (val.acting === false && val.dead === false) {
                newBench.push(val)
            } else (
                newGrave.push(val)
            )
        })

        this.setState({ fighterActive: newActing })
        this.setState({ fighterBench: newBench })
        this.setState({ graveyard: newGrave })

    }

    // ==================================================================================================
    //          COUNT
    //===================================================================================================

    increaseSpeed() {
        this.setState({ count: this.state.count + 1 }, this.sort)
    }

    decreaseSpeed() {
        if (this.state.count > 1) {
            this.setState({ count: this.state.count - 1 }, this.sort)
        }
    }

    resetCount() {
        this.setState({ count: 1 }, this.sort)
    }

    // ==================================================================================================
    //                              FIGHTER SPEED
    //===================================================================================================

    fighterSpeed(f) {
        this.state.fighterTotal.forEach(val => {
            if (val.name === f.name) {
                val.action = val.speed + val.action;
            }
        })
        this.sort();
    }

    handleHoldAction(e) {
        this.setState({ actionHold: e })
    }

    matchAction(f, input) {
        this.state.fighterTotal.forEach(val => {
            if (val.name === f.name) {
                val.action = +input
            }
        })
        this.sort();
    }

    //===================================================================================================
    //                                      ToP
    //===================================================================================================

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };


    //====================================================================================================
    //                              Kill/Resurrect
    //====================================================================================================

    murder(f) {
        this.state.fighterTotal.forEach(val => {
            if (val.name === f.name) {
                val.dead = true;
            }
        })
        this.sort()
    }

    resurrect(f) {
        this.state.fighterTotal.forEach(val => {
            if (val.name === f.name) {
                val.dead = false;
            }
        })
        this.sort()
    }

    //=====================================================================================================
    //                                  ADD NEW/EDIT OLD
    //=====================================================================================================

    createFighter(c, n, s, a) {

        var newId = Math.floor(Math.random() * 1000)

        var newFighter =
            {
                fighterId: newId,
                color: c,
                name: n,
                speed: s,
                action: +a + this.state.count,
                top: false,
                acting: true,
                dead: false
            }

        axios.post('/api/fighter', newFighter).then((res, req) => {

            this.setState({ fighterTotal: res.data })

        })

        setTimeout(this.sort, 1000)

        this.onCloseModal()
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    modifyFighter = (i, c, n, s, a) => {

        this.setState({
            tempId: i,
            tempColor: c,
            tempName: n,
            tempSpeed: s,
            tempAction: a
        })

        this.onOpenModal()
    }

    handleChange = (color) => {
        this.setState({ tempColor: color.hex })
    }

    handleName = (name) => {
        this.setState({ tempName: name })
    }

    handleSpeed = (speed) => {
        this.setState({ tempSpeed: speed })
    }

    //=====================================================================================================
    //
    //=====================================================================================================
    render() {

        const { open } = this.state;

        return (

            <div className="mainBody" img src="./img/Woodbackground.png">
                <div className="overlay">
                    <div className="top">
                        <Counter
                            increaseSpeed={this.increaseSpeed}
                            decreaseSpeed={this.decreaseSpeed}
                            resetCount={this.resetCount}
                            count={this.state.count} />
                    </div>

                    <div className="bottom">

                        <div className="left">
                            <h1>The Quick</h1>
                            <Acting
                                active={this.state.fighterActive}
                                fighterSpeed={this.fighterSpeed}
                                murder={this.murder}
                                handleHoldAction={this.handleHoldAction}
                                matchAction={this.matchAction}
                                sort={this.sort}
                                modifyFighter={this.modifyFighter} />

                            <Benched
                                benched={this.state.fighterBench}
                                fighterSpeed={this.fighterSpeed}
                                murder={this.murder}
                                handleHoldAction={this.handleHoldAction}
                                matchAction={this.matchAction}
                                sort={this.sort}
                                modifyFighter={this.modifyFighter} />
                        </div>

                        <div className="right">
                            <AddNew
                                createFighter={this.createFighter}
                                clearField={this.clearField} />
                            <Graveyard
                                graveyard={this.state.graveyard}
                                resurrect={this.resurrect}
                                removeFighter={this.removeFighter} />
                        </div>
                    </div>

                </div>
                <Modal open={open} onClose={this.onCloseModal} little>
                    <div className="outModalNew">
                        <div className="modalBannerEdit">
                        </div >
                        <div className="inModalNew">

                            <div className="modalLeft">
                                <SketchPicker
                                    color={this.state.tempColor}
                                    onChange={this.handleChange} />
                            </div>

                            <div className="modalRight">
                                <h1 id="newCombat">Edit Combatant</h1>
                                <p id="editSubtitle">You may leave a field blank, if you'd like</p>

                                <p id="editmark">Name</p>
                                <input placeholder={this.state.tempName} id="editinput"
                                    onChange={e => this.handleName(e.target.value)} />

                                <p id="editmark">Speed</p>
                                <input placeholder={this.state.tempSpeed} id="editinput"
                                    onChange={e => this.handleSpeed(e.target.value)} />

                                <button id="modalNewButton"
                                    onClick={_ => this.handleEdit()}>EDIT</button>
                            </div>
                        </div>
                    </div>
                </Modal>

                <StatusTimer
                    count={this.state.count} />
            </div>
        )
    }
}


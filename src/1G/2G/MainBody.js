import React, { Component } from 'react';
import axios from 'axios';

import Acting from "./3G/Acting";
import Benched from "./3G/Benched";
import Graveyard from "./3G/Graveyard"
import Counter from "./3G/Counter"

import AddNew from "./AddNew"

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
    //                                     SERVER IMPORT
    //===============================================================================================================
    componentDidMount() {
        this.collectCombatants();
    }

    collectCombatants() {
        axios.get('/api/fighters').then(res => {
            this.setState({ fighterTotal: res.data }, this.sort)
        })
    }


    //===============================================================================================================
    //
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
    //                                  Add New
    //=====================================================================================================

    createFighter(c, n, s, a) {
        var tempArr = this.state.fighterTotal
        tempArr.push(
            {
                color: c,
                name: n,
                speed: s,
                action: a,
                top: false,
                acting: true,
                dead: false
            }
        )
        this.setState({ fighterTotal: tempArr })
        setTimeout(this.sort(), 1000)
        this.onCloseModal()
    }


    //=====================================================================================================
    //
    //=====================================================================================================
    render() {

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
                                sort={this.sort} />
                    
                            <Benched
                                benched={this.state.fighterBench}
                                fighterSpeed={this.fighterSpeed}
                                murder={this.murder}
                                handleHoldAction={this.handleHoldAction}
                                matchAction={this.matchAction}
                                sort={this.sort} />
                        </div>

                        <div className="right">
                            <AddNew
                                createFighter={this.createFighter} />
                            <Graveyard
                                graveyard={this.state.graveyard}
                                resurrect={this.resurrect} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


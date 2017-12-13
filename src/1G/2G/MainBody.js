import React, { Component } from 'react';

import Acting from "./3G/Acting";
import Benched from "./3G/Benched";
import Graveyard from "./3G/Graveyard"
import Counter from "./3G/Counter"

export default class MainBody extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fighterTotal:
                [{ name: "Ragnar", speed: 5, action: 17, top: true, acting: true, dead: false },
                { name: "Robert", speed: 7, action: 10, top: false, acting: true, dead: false },
                { name: "Sir William", speed: 15, action: 25, top: true, acting: true, dead: true },
                { name: "Ulrich VonLichstein", speed: 10, action: 1, top: false, acting: true, dead: false }],
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
    }

    componentDidMount() {
        this.sort();
    }

    sort() {

        let sortedFigh = this.state.fighterTotal.sort((a, b) => a.action - b.action);
        this.setState({ fighterTotal: sortedFigh });

        this.state.fighterTotal.forEach(val => {
            if (val.action > this.state.count) {
                val.acting = false
                val.top = false
            } else {val.acting = true}
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
    //
    //=====================================================================================================
    render() {

        return (

            <div>
                <Counter
                    increaseSpeed={this.increaseSpeed}
                    decreaseSpeed={this.decreaseSpeed}
                    resetCount={this.resetCount}
                    count={this.state.count} />
                <div>
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
                    <Graveyard
                        graveyard={this.state.graveyard}
                        resurrect={this.resurrect} />

                </div>
            </div>
        )
    }
}


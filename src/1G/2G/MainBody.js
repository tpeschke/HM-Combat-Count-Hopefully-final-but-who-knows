import React, { Component } from 'react';
import axios from 'axios';
import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css';
import { SketchPicker } from 'react-color';

import { connect } from 'react-redux';

// import Acting from "./3G/Acting";
// import Benched from "./3G/Benched";
// import Graveyard from "./3G/Graveyard";
import Counter from "./3G/Counter";
import AddNew from "./AddNew"

import { sort } from './3G/sort'
import { collectCombat } from '../../ducks/reducer'
import { setTimeout } from 'timers';

class MainBody extends Component {
    constructor(props) {
        super(props)

        this.fighterSpeed = this.fighterSpeed.bind(this)
        this.murder = this.murder.bind(this)
        this.resurrect = this.resurrect.bind(this)
        this.matchAction = this.matchAction.bind(this)
        this.handleHoldAction = this.handleHoldAction.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
        this.onOpenModal = this.onOpenModal.bind(this)
        this.createFighter = this.createFighter.bind(this)
    }


    componentDidMount() {
        this.props.collectCombat()
        setTimeout( this.props.sort(), 1000)
    }

    removeFighter = (e) => {
        axios.delete(`/api/fighters/${e}`).then((res, req) => {
            this.setprops({ fighterTotal: res.data }, this.sort)
        })
    }

    clearField = () => {
        axios.delete(`/api/fighters`).then((res, req) => {
            this.setprops({ fighterTotal: res.data }, this.sort)
        })
    }

    handleEdit = () => {

        var updatedFighter = {
            fighterId: this.props.tempId,
            color: this.props.tempColor,
            name: this.props.tempName,
            speed: this.props.tempSpeed,
            action: this.props.tempAction,
        }

        axios.post(`/api/fighters/`, updatedFighter).then((res, req) => {

            this.setprops({ fighterTotal: res.data }, this.sort)
        })
        this.onCloseModal()
    }

    // ==================================================================================================
    //                              FIGHTER SPEED
    //===================================================================================================

    fighterSpeed(f) {
        this.props.fighterTotal.forEach(val => {
            if (val.name === f.name) {
                val.action = val.speed + val.action;
            }
        })
        this.sort();
    }

    handleHoldAction(e) {
        this.setprops({ actionHold: e })
    }

    matchAction(f, input) {
        this.props.fighterTotal.forEach(val => {
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
        this.setprops({ open: true });
    };

    onCloseModal = () => {
        this.setprops({ open: false });
    };


    //====================================================================================================
    //                              Kill/Resurrect
    //====================================================================================================

    murder(f) {
        this.props.fighterTotal.forEach(val => {
            if (val.name === f.name) {
                val.dead = true;
            }
        })
        this.sort()
    }

    resurrect(f) {
        this.props.fighterTotal.forEach(val => {
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
                action: +a + this.props.count,
                top: false,
                acting: true,
                dead: false
            }

        axios.post('/api/fighter', newFighter).then((res, req) => {

            this.setprops({ fighterTotal: res.data })

        })

        setTimeout(this.sort, 1000)

        this.onCloseModal()
    }

    onOpenModal = () => {
        this.setprops({ open: true });
    };

    onCloseModal = () => {
        this.setprops({ open: false });
    };

    modifyFighter = (i, c, n, s, a) => {

        this.setprops({
            tempId: i,
            tempColor: c,
            tempName: n,
            tempSpeed: s,
            tempAction: a
        })

        this.onOpenModal()
    }

    handleChange = (color) => {
        this.setprops({ tempColor: color.hex })
    }

    handleName = (name) => {
        this.setprops({ tempName: name })
    }

    handleSpeed = (speed) => {
        this.setprops({ tempSpeed: speed })
    }


    //=====================================================================================================
    //
    //=====================================================================================================
    render() {

        const { open } = this.props;
        

        return (

            <div className="mainBody" img src="./img/Woodbackground.png">
                <div className="overlay">
                    <div className="top">
                        <Counter
                            sort = {this.sort} />
                    </div>

                    <div className="bottom">

                        <div className="left">
                            <h1>The Quick</h1>
                            {/* <Acting
                                active={this.props.fighterActive}
                                fighterSpeed={this.fighterSpeed}
                                murder={this.murder}
                                handleHoldAction={this.handleHoldAction}
                                matchAction={this.matchAction}
                                sort={this.sort}
                                modifyFighter={this.modifyFighter} /> */}

                            {/* <Benched
                                benched={this.props.fighterBench}
                                fighterSpeed={this.fighterSpeed}
                                murder={this.murder}
                                handleHoldAction={this.handleHoldAction}
                                matchAction={this.matchAction}
                                sort={this.sort}
                                modifyFighter={this.modifyFighter} /> */}
                        </div>

                        <div className="right">
                            {/* <AddNew
                                createFighter={this.createFighter}
                                clearField={this.clearField}
                                onOpenStatus={this.onOpenStatus}
                                newStatuses={this.props.statuses}
                                count={this.props.count} />
                            <Graveyard
                                graveyard={this.props.graveyard}
                                resurrect={this.resurrect}
                                removeFighter={this.removeFighter} /> */}
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
                                    color={this.props.tempColor}
                                    onChange={this.handleChange} />
                            </div>

                            <div className="modalRight">
                                <h1 id="newCombat">Edit Combatant</h1>
                                <p id="editSubtitle">You may leave a field blank, if you'd like</p>

                                <p id="editmark">Name</p>
                                <input placeholder={this.props.tempName} id="editinput"
                                    onChange={e => this.handleName(e.target.value)} />

                                <p id="editmark">Speed</p>
                                <input placeholder={this.props.tempSpeed} id="editinput"
                                    onChange={e => this.handleSpeed(e.target.value)} />

                                <button id="modalNewButton"
                                    onClick={_ => this.handleEdit()}>EDIT</button>
                            </div>
                        </div>
                    </div>
                </Modal>

                
            </div>
        )
    }
}



function moveFrompropsToProps ( props ) {
    
    var { count, actionHold, topAmount, open, tempId, tempColor, tempName, tempSpeed, tempAction } = props
    
    return {
        count, 
        actionHold, 
        topAmount, 
        open, 
        tempId, 
        tempColor, 
        tempName, 
        tempSpeed, 
        tempAction
    } 
}

let actionBuilder = {
    collectCombat
}


let connectApp = connect( moveFrompropsToProps, actionBuilder )

export default connectApp(MainBody)
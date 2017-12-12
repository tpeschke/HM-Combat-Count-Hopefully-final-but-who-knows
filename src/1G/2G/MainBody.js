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
                [{ name: "Ragnar", speed: 5, action: 17, top: false, acting: true, dead: false },
                { name: "Robert", speed: 7, action: 10, top: false, acting: true, dead: false },
                { name: "Sir William", speed: 15, action: 25, top: false, acting: true, dead: false },
                { name: "Ulrich VonLichstein", speed: 10, action: 34, top: false, acting: true, dead: false }],
            fighterActive: [],
            fighterBench: [],
            count: 1
        }
        this.sort = this.sort.bind(this)
        this.decreaseSpeed = this.decreaseSpeed.bind(this)
        this.increaseSpeed = this.increaseSpeed.bind(this)
        this.resetCount = this.resetCount.bind(this)
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
            } else (val.acting = true)
        })

        var newBench = [];
        var newActing = [];

        this.state.fighterTotal.forEach(val => {
            if (val.acting === true) {
                newActing.push(val)
            } else { newBench.push(val) }
        })

        this.setState({ fighterActive: newActing })
        this.setState({ fighterBench: newBench })

    }

    // ==================================================================================================
    //          COUNT
    //===================================================================================================
   
    increaseSpeed() {
        this.setState({ count: this.state.count + 1 }, this.sort)
        // setTimeout(this.sort,500);
    }

    decreaseSpeed() {
        if (this.state.count > 1) {
            this.setState({ count: this.state.count - 1 })
            setTimeout(this.sort,500);
        }
    }

    resetCount() {
        this.setState({ count: 1 })
        setTimeout(this.sort,500);
    }

    // ==================================================================================================

    render() {
        return (
            <div>
                <Counter 
                    increaseSpeed = {this.increaseSpeed}
                    decreaseSpeed = {this.decreaseSpeed}
                    resetCount = {this.resetCount}
                    count = {this.state.count}/>
                <div>
                    <h1>COMBATANTS</h1>
                    <Benched
                        benched={this.state.fighterBench} />
                    <Acting
                        active={this.state.fighterActive} />

                    <button onClick={this.sort}>Test</button>
                </div>
            </div>
        )
    }
}


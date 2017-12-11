import React, { Component } from 'react';

import Acting from "./3G/Acting";
import Benched from "./3G/Benched";
import Graveyard from "./3G/Graveyard"

export default class Counter extends Component {
    constructor(props) {
        super(props) 
    
        this.state = {
            fighterTotal: 
            [{ "name": "test1", "speed": 5, "action": 17, top: false, acting: true, dead: false },
            { "name": "test2", "speed": 7, "action": 10, top: false, acting: true, dead: false  },
            { "name": "test3", "speed": 15, "action": 25, top: false, acting: true, dead: false  },
            { "name": "test4", "speed": 10, "action": 34, top: false, acting: true, dead: false  }],
            fighterActive: [],
            fighterBench: [],
            count: props.count
        }
        this.sort = this.sort.bind(this)
    }

    componentDidMount() {
        this.sort();
    }

    sort() {

        let sortedFigh = this.state.fighterTotal.sort((a, b) => a.action - b.action);
        this.setState({ fighterTotal: sortedFigh });

        this.state.fighterTotal.forEach(val => {
            if (val.action >= this.props.count) {
                val.acting = false
            }})

        var newBench = [];
        var newActing = [];
    
        this.state.fighterTotal.forEach(val => {
          if (val.acting === true) {
            newActing.push(val)
          } else { newBench.push(val) }
        })

        this.setState( { fighterActive: newActing } )
        this.setState( { fighterBench: newBench } )
            
    }
    
        render() {
            return (
                <div>
                    <h1>COMBATANTS</h1>
                    <Benched 
                        benched= {this.state.fighterBench}/>
                    <Acting 
                        active = {this.state.fighterActive}/>
                        
                        <button onClick={this.sort}>Test</button>
                </div>
            )
        }
    }
 

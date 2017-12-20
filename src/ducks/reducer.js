import axios from 'axios'

const initialState = {
    fighters: {
        total: [],
        active: [],
        bench: [],
        grave: []
    },

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

//================================
//TYPES
//================================

const INCREASE_COUNT = 'INCREASE_COUNT'
const DECREASE_COUNT = 'DECREASE_COUNT'
const RESET_COUNT = 'RESET_COUNT'

const COLLECT_COMBAT = 'COLLECT_COMBAT'

//================================
//ACTION BUILDERS
//================================


//=========Count==================

export function increaseCount() {
    return {
        type: INCREASE_COUNT,
    }
}
export function decreaseCount() {
    return {
        type: DECREASE_COUNT,
    }
}
export function resetCount() {
    return {
        type: RESET_COUNT,
        payload: 1
    }
}

//===========Axios Calls=============

export function collectCombat() {
    return {
        type: COLLECT_COMBAT,
        payload: axios.get('/api/fighters').then()
    }
}

//===================================
//REDUCER
//===================================

export default function reducer(state = initialState, action) {

    switch (action.type) {

        case INCREASE_COUNT:
            return Object.assign({}, state, { count: state.count + 1 })
        case DECREASE_COUNT:
            return Object.assign({}, state, { count: state.count - 1 })
        case RESET_COUNT:
            return Object.assign({}, state, { count: action.payload })

        //===========================================================\\

        case COLLECT_COMBAT + '_FULFILLED':
            return Object.assign({}, state, { fighters: action.payload } )

        default: return state;
    }

}
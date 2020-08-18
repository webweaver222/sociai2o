import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducers'

const stringMdw = () => (dispatch) => (action) => {
    console.log(action.type)
    if (typeof action === 'string')
    return dispatch({
        type: action
    })

    return dispatch(action)
}


const store = createStore(reducer, applyMiddleware(thunk, stringMdw))


export default store
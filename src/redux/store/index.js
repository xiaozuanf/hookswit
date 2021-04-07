import { createStore, compose, applyMiddleware  } from 'redux'
import reducers from '../reducers'
import thunk from 'redux-thunk'
const fn = store => next => action => {
    next(action)
}
const configureStore = preloadedState => createStore(
    reducers,
    preloadedState,
    compose(
        applyMiddleware(thunk, fn)
    ) 
)
export default configureStore

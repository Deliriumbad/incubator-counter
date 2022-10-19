import {combineReducers, compose, legacy_createStore, applyMiddleware} from 'redux';
import {counterReducer} from "./counterReducer";
import thunk from "redux-thunk";


/*declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}*/
export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    counter: counterReducer
})

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//export const store = legacy_createStore(rootReducer, composeEnhancers(), applyMiddleware(thunk));
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));


// @ts-ignore
window.store = store;
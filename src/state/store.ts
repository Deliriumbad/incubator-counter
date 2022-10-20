import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {counterReducer} from "./counterReducer";
import thunk from "redux-thunk";
import {loadState, saveState} from "../utils/localstorage-utils";

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    counter: counterReducer
})

export const store = legacy_createStore(rootReducer, loadState(), applyMiddleware(thunk));

store.subscribe( ()=> {
    saveState({
        counter: store.getState().counter
    })
})

// @ts-ignore
window.store = store;
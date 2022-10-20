import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {counterReducer} from "./counterReducer";
import thunk from "redux-thunk";

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    counter: counterReducer
})

//export const store = legacy_createStore(rootReducer, composeEnhancers(), applyMiddleware(thunk));
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;
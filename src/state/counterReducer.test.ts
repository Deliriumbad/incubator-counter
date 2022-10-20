import {
    counterReducer,
    increaseValueAC,
    InitStateType,
    setCounterInfoAC,
    setInputModeAC,
    setSwitchModeAC
} from './counterReducer'

const startState: InitStateType = {
    minValue: 0,
    currentValue: 0,
    maxValue: 5,
    counterInfo: '',
    isOnInputMode: false,
    isOnSwitchMode: false,
    isActiveButton: true
};

test('counter should increment by one value', ()=> {
    const action = increaseValueAC(1)
    const endState = counterReducer(startState, action)
    expect(endState.currentValue).toBe(1)
})

test('input mode switching', ()=> {
    const action = setInputModeAC()
    const endState = counterReducer(startState, action)
    expect(endState.isOnInputMode).toBe(true)
})

test('counter mode switching', ()=> {
    const action = setSwitchModeAC()
    const endState = counterReducer(startState, action)
    expect(endState.isOnSwitchMode).toBe(true)
})

test('counter info should be changed', ()=> {
    const action = setCounterInfoAC('Banana!')
    const endState = counterReducer(startState, action)
    expect(endState.counterInfo).toBe('Banana!')
    expect(endState.counterInfo.length).toBe(7)
})

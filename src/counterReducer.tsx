type actionType =
    ReturnType<typeof setMinValueAC> |
    ReturnType<typeof setMaxValueAC> |
    ReturnType<typeof increaseValueAC> |
    ReturnType<typeof setCounterInfoAC> |
    ReturnType<typeof resetValueAC> |
    ReturnType<typeof setInputModeAC> |
    ReturnType<typeof setSwitchModeAC> |
    ReturnType<typeof setActiveButtonAC>

const initState = {
    minValue: 0,
    currentValue: 0,
    maxValue: 5,
    counterInfo: '',
    isOnInputMode: false,
    isOnSwitchMode: false,
    isActiveButton: true
};
type InitStateType = typeof initState;


export const counterReducer = (state: InitStateType = initState, action: actionType): InitStateType => {

    switch (action.type) {
        case 'SET-MIN-VALUE':
            return {...state, minValue: action.minValue}
        case 'SET-MAX-VALUE':
            return {...state, maxValue: action.maxValue}
        case 'SET-INCREASE-VALUE':
            if (action.counterStep) {
                return {...state, currentValue: state.currentValue + action.counterStep}
            }
            return {...state, currentValue: state.minValue}
        case 'RESET-VALUE':
            return {...state, currentValue: state.minValue}
        case 'SET-COUNTER-INFO':
            if (action.counterInfo) {
                return {...state, counterInfo: action.counterInfo}
            }
            return {...state, counterInfo: ''}
        case 'SET-INPUT-MODE':
            return {...state, isOnInputMode: !state.isOnInputMode}
        case 'SET-SWITCH-MODE':
            return {...state, isOnSwitchMode: !state.isOnSwitchMode}
        case 'SET-ACTIVE-BUTTON':
                return {...state, isActiveButton: action.isActiveButton}
        default:
            return state
    }
}

export const setMinValueAC = (minValue: number) => ({type: 'SET-MIN-VALUE', minValue} as const);
export const setMaxValueAC = (maxValue: number) => ({type: 'SET-MAX-VALUE', maxValue} as const);
export const increaseValueAC = (counterStep?: number) => ({type: 'SET-INCREASE-VALUE', counterStep} as const);
export const resetValueAC = () => ({type: 'RESET-VALUE'} as const);
export const setCounterInfoAC = (counterInfo?: string) => ({type: 'SET-COUNTER-INFO', counterInfo} as const);
export const setInputModeAC = () => ({type: 'SET-INPUT-MODE'} as const);
export const setSwitchModeAC = () => ({type: 'SET-SWITCH-MODE'} as const);
export const setActiveButtonAC = (isActiveButton:boolean) => ({type: 'SET-ACTIVE-BUTTON', isActiveButton} as const);

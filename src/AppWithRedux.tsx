import React, {useEffect} from 'react';
import {Counter} from "./components/counter/Counter";
import style from './app.module.css';
import {Button} from "./components/button/Button";
import {Input} from "./components/input/Input";
import {v1} from 'uuid';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {
    increaseValueAC,
    resetValueAC,
    setActiveButtonAC,
    setCounterInfoAC,
    setInputModeAC,
    setMaxValueAC,
    setMinValueAC,
    setSwitchModeAC
} from "./state/counterReducer";

export const AppWithRedux = () => {

    const minValue = useSelector<AppRootStateType, number>(state => state.counter.minValue);
    const maxValue = useSelector<AppRootStateType, number>(state => state.counter.maxValue);
    const currentValue = useSelector<AppRootStateType, number>(state => state.counter.currentValue);
    const counterInfo = useSelector<AppRootStateType, string>(state => state.counter.counterInfo);
    const isOnInputMode = useSelector<AppRootStateType, boolean>(state => state.counter.isOnInputMode);
    const isOnSwitchMode = useSelector<AppRootStateType, boolean>(state => state.counter.isOnSwitchMode);
    const isActiveButton = useSelector<AppRootStateType, boolean>(state => state.counter.isActiveButton);

    const dispatch = useDispatch();

    const counterStep = 1;

    const maxInputValueId = v1();
    const minInputValueId = v1();

    const incButtonDisabledMode = currentValue === maxValue || !isActiveButton || maxValue <= minValue;
    const resetButtonDisabledMode = currentValue === minValue || !isActiveButton || maxValue <= minValue;

    const buttons = [
        {
            id: v1(),
            name: 'Inc',
            isDisabled: incButtonDisabledMode
        },
        {
            id: v1(),
            name: 'Reset',
            isDisabled: resetButtonDisabledMode
        },
    ]

    const inputs = [
        {
            id: maxInputValueId,
            name: 'Max',
            value: maxValue,
        },
        {
            id: minInputValueId,
            name: 'Min',
            value: minValue,
        }
    ]

    const fontStyle = currentValue === maxValue ? style.white : '';
    const inputStyle = counterInfo === 'Incorrect value!' ? style.red : '';
    const switchButtonStyle = !isOnSwitchMode ? style.switchButtonOff : `${style.switchButtonOff} ${style.switchButtonOn}`;
    const switchMode = !isOnSwitchMode ? 'Switcher is off' : 'Switcher is on';


    const onCounterHandler = (name: string) => {
        switch (name) {
            case 'Inc':
                dispatch(increaseValueAC(counterStep));
                break;
            case 'Reset':
                dispatch(resetValueAC());
                break;
            case 'Set':
                dispatch(increaseValueAC());
                dispatch(setMaxValueAC(maxValue));
                dispatch(setCounterInfoAC());
                dispatch(setActiveButtonAC(true));
                dispatch(setInputModeAC());
                break;
        }
    }

    const onChangeHandler = (currentInputValue: number, inputId: string) => {
        if (inputId === minInputValueId) {
            dispatch(setActiveButtonAC(false));
            dispatch(setMinValueAC(currentInputValue));
            dispatch(setCounterInfoAC('Enter values and press "set"'));
        }

        if (inputId === maxInputValueId) {
            dispatch(setActiveButtonAC(false));
            dispatch(setMaxValueAC(currentInputValue));
            dispatch(setCounterInfoAC('Enter values and press "set"'));
        }
    }

    useEffect(() => {
        if (minValue >= maxValue || minValue < 0) {
            dispatch(setCounterInfoAC('Incorrect value!'));
            dispatch(setActiveButtonAC(true));
        }
    }, [minValue, maxValue])

    const button = buttons.map((el, index) => {
        return <Button key={index} counter={onCounterHandler} {...el} />
    });

    const input = inputs.map((el, index) => {
        return <Input key={index} callback={onChangeHandler} {...el} />
    });

    const onButtonHandler = () => {
        dispatch(setSwitchModeAC());
        dispatch(setInputModeAC());
    }

    return (
        <>
            <button onClick={onButtonHandler} className={switchButtonStyle}>{switchMode}</button>

            {
                !isOnSwitchMode ?
                    <div className={style.container}>
                        <div className={`${style.wrapper} ${fontStyle}`}>
                            <Counter count={currentValue} counterInfo={counterInfo}/>
                            {button}
                        </div>
                        <div className={`${style.wrapper} ${inputStyle}`}>
                            {input}
                            <Button name={'Set'} counter={onCounterHandler} isDisabled={isActiveButton}/>
                        </div>
                    </div>
                    :
                    <div>
                        <div className={style.container}>
                            {
                                isOnInputMode ?
                                    <div className={`${style.wrapper} ${fontStyle}`}>
                                        <Counter count={currentValue} counterInfo={counterInfo}/>
                                        {button}
                                        <Button name={'Set'}
                                                counter={onCounterHandler}
                                                isDisabled={isOnSwitchMode ? !isActiveButton : isActiveButton}
                                        />
                                    </div>
                                    :
                                    <div className={style.wrapper}>
                                        <div className={`${fontStyle} ${inputStyle}`}>
                                            {input}
                                            <Button name={'Set'}
                                                    counter={onCounterHandler}
                                                    isDisabled={isOnSwitchMode ? isActiveButton : !isActiveButton}
                                            />
                                        </div>
                                    </div>

                            }
                        </div>
                    </div>
            }
        </>
    );
}
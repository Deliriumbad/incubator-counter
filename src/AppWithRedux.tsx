import React, {useEffect, useState} from 'react';
import './App.css';
import {Counter} from "./components/Counter";
import s from './app.module.css';
import {Button} from "./components/Button";
import {Input} from "./components/Input";
import {v1} from 'uuid';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {
    increaseValueAC,
    resetValueAC,
    setCounterInfoAC,
    setInputModeAC,
    setMaxValueAC,
    setMinValueAC,
    setSwitchModeAC
} from "./counterReducer";

function AppWithRedux() {

    const minValue = useSelector<AppRootStateType, number>(state => state.counter.minValue);
    const maxValue = useSelector<AppRootStateType, number>(state => state.counter.maxValue);
    const currentValue = useSelector<AppRootStateType, number>(state => state.counter.currentValue);
    const counterInfo = useSelector<AppRootStateType, string>(state => state.counter.counterInfo);
    const isOnInputMode = useSelector<AppRootStateType, boolean>(state => state.counter.isOnInputMode);
    const isOnSwitchMode = useSelector<AppRootStateType, boolean>(state => state.counter.isOnSwitchMode);
    //const isActiveButton = useSelector<AppRootStateType, boolean>(state => state.counter.isActiveButton);

    const dispatch = useDispatch();

    const [activeButton, setActiveButton] = useState<boolean>(true);

    const counterStep = 1;

    const maxInputValueId = v1();
    const minInputValueId = v1();

    const incButtonDisabledMode = currentValue === maxValue || !activeButton || maxValue <= minValue;
    const resetButtonDisabledMode = currentValue === minValue || !activeButton || maxValue <= minValue;


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

    const fontStyle = currentValue === maxValue ? s.white : '';
    const inputStyle = counterInfo === 'Incorrect value!' ? s.red : '';
    const switchButtonStyle = !isOnSwitchMode ? s.switchButtonOff : `${s.switchButtonOff} ${s.switchButtonOn}`;
    const switchMode = !isOnSwitchMode ? 'Switcher is off' : 'Switcher is on';

    /*useEffect(() => {
        const startValueAsString = localStorage.getItem('startValue');
        startValueAsString && setStartValue(JSON.parse(startValueAsString));

        const maxValueAsString = localStorage.getItem('maxValue');
        maxValueAsString && setMaxValue(JSON.parse(maxValueAsString));

        const currentValueAsString = localStorage.getItem('currentValue');
        currentValueAsString && setCurrentValue(JSON.parse(currentValueAsString));

        const onSwitchModeValueAsString = localStorage.getItem('onSwitchMode');
        onSwitchModeValueAsString && SetOnSwitchMode(JSON.parse(onSwitchModeValueAsString));
    }, []);

    useEffect(() => {
        localStorage.setItem('startValue', JSON.stringify(startValue));
        localStorage.setItem('maxValue', JSON.stringify(maxValue));
        localStorage.setItem('currentValue', JSON.stringify(currentValue));
        localStorage.setItem('onSwitchMode', JSON.stringify(onSwitchMode));
    }, [startValue, maxValue, currentValue, onSwitchMode]);*/


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
                setActiveButton(true);
                dispatch(setInputModeAC());
                break;
        }
    }


    const onChangeHandler = (currentInputValue: number, inputId: string) => {
        if (inputId === minInputValueId) {
            dispatch(setMinValueAC(currentInputValue));
            setActiveButton(false);
            dispatch(setCounterInfoAC('Enter values and press "set"'));
        }

        if (inputId === maxInputValueId) {
            dispatch(setMaxValueAC(currentInputValue));
            setActiveButton(false);
            dispatch(setCounterInfoAC('Enter values and press "set"'));
        }
    }

    useEffect(()=>{
        if (minValue >= maxValue || minValue < 0) {
            setActiveButton(true);
            dispatch(setCounterInfoAC('Incorrect value!'));
        }
    },[minValue, maxValue])

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
                    <div className={s.container}>
                        <div className={s.wrapper}>
                            <div className={fontStyle}>
                                <Counter count={currentValue}
                                         counterInfo={counterInfo}
                                />
                                {button}
                            </div>
                        </div>
                        <div className={`${s.wrapper} ${inputStyle}`}>
                            {input}
                            <Button name={'Set'}
                                    counter={onCounterHandler}
                                    isDisabled={activeButton}
                            />
                        </div>
                    </div>
                    :
                    <div>
                        <div className={s.container}>
                            {
                                !isOnInputMode ?
                                    <div className={s.wrapper}>
                                        <div className={fontStyle}>
                                            <Counter count={currentValue}
                                                     counterInfo={counterInfo}
                                            />
                                            {button}
                                            <Button name={'Set'}
                                                    counter={onCounterHandler}
                                                    isDisabled={isOnSwitchMode ? !activeButton : activeButton}
                                            />
                                        </div>
                                    </div>
                                    :
                                    <div className={s.wrapper}>
                                        <div className={`${fontStyle} ${inputStyle}`}>
                                            {input}
                                            <Button name={'Set'}
                                                    counter={onCounterHandler}
                                                    isDisabled={isOnSwitchMode ? activeButton : !activeButton}
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

export default AppWithRedux;
import React, {useEffect, useState} from 'react';
import './App.css';
import {Counter} from "./components/Counter";
import s from './app.module.css';
import {Button} from "./components/Button";
import {Input} from "./components/Input";
import {v1} from 'uuid';

function App() {
    let [startValue, setStartValue] = useState<number>(0);
    let [maxValue, setMaxValue] = useState<number>(5);
    const [currentValue, setCurrentValue] = useState<number>(startValue);
    const [activeButton, setActiveButton] = useState<boolean>(true);
    const [counterInfo, setCounterInfo] = useState<string>('');
    const [onSwitchMode, SetOnSwitchMode] = useState(false);
    const [inputMode, setInputMode] = useState(false);

    const counterStep = 1;

    const maxInputValue = v1();
    const minInputValue = v1();

    const buttons = [
        {id: v1(), name: 'Inc', isDisabled: currentValue === maxValue || !activeButton || maxValue <= startValue},
        {id: v1(), name: 'Reset', isDisabled: currentValue === startValue || !activeButton || maxValue <= startValue},
    ]

    const inputs = [
        {id: maxInputValue, name: 'Max', value: maxValue},
        {id: minInputValue, name: 'Min', value: startValue}
    ]

    useEffect(() => {
        const startValueAsString = localStorage.getItem('startValue');
        startValueAsString && setStartValue(JSON.parse(startValueAsString));

        const maxValueAsString = localStorage.getItem('maxValue');
        maxValueAsString && setMaxValue(JSON.parse(maxValueAsString));

        const currentValueAsString = localStorage.getItem('currentValue');
        currentValueAsString && setCurrentValue(JSON.parse(currentValueAsString));

        const onSwitchModeValueAsString = localStorage.getItem('onSwitchMode');
        onSwitchModeValueAsString && SetOnSwitchMode(JSON.parse(onSwitchModeValueAsString));

        const counterInfoValueAsString = localStorage.getItem('counterInfo');
        counterInfoValueAsString && setCounterInfo(JSON.parse(counterInfoValueAsString));
        }, []);

    useEffect(() => {
        localStorage.setItem('startValue', JSON.stringify(startValue));
        localStorage.setItem('maxValue', JSON.stringify(maxValue));
        localStorage.setItem('currentValue', JSON.stringify(currentValue));
        localStorage.setItem('onSwitchMode', JSON.stringify(onSwitchMode));
        localStorage.setItem('counterInfo', JSON.stringify(counterInfo));
    }, [startValue, maxValue, currentValue, onSwitchMode, counterInfo]);

    const onCounterHandler = (name: string) => {
        switch (name) {
            case 'Inc':
                setCurrentValue(currentValue + counterStep);
                break;
            case 'Reset':
                setCurrentValue(startValue);
                break;
            case 'Set':
                setCurrentValue(startValue);
                setMaxValue(maxValue);
                setActiveButton(true);
                setCounterInfo('');
                setInputMode(!inputMode);
                break;
        }
    }

    const onChangeHandler = (num: number, id: string) => {
        if (id === maxInputValue) {
            maxValue = num;
            setMaxValue(maxValue);
            setActiveButton(false);
            setCounterInfo('Enter values and press "set"');
        }
        if (id === minInputValue) {
            startValue = num;
            setStartValue(startValue);
            setActiveButton(false);
            setCounterInfo('Enter values and press "set"');
        }
        if (startValue >= maxValue || startValue < 0) {
            setCounterInfo('Incorrect value!');
            setActiveButton(true);
        }
    }

    const fontStyle = currentValue === maxValue ? s.white : '';
    const inputStyle = counterInfo === 'Incorrect value!' ? s.red : '';
    const switchButtonStyle = !onSwitchMode ? s.switchButtonOff : `${s.switchButtonOff} ${s.switchButtonOn}`;
    const switchMode = !onSwitchMode ? 'Switcher is off' : 'Switcher is on';


    const button = buttons.map((el, index) => {
        return <Button key={index} counter={onCounterHandler} {...el} />
    });

    const input = inputs.map((el, index) => {
        return <Input key={index} callback={onChangeHandler} {...el} />
    });

    const onButtonHandler = () => {
        SetOnSwitchMode(!onSwitchMode);
        setInputMode(false);
    }

    return (
        <>
            <button onClick={onButtonHandler} className={switchButtonStyle}>{switchMode}</button>
            {
                !onSwitchMode ?
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
                                inputMode ?
                                    <div className={s.wrapper}>
                                        <div className={`${fontStyle} ${inputStyle}`}>
                                            {input}
                                            <Button name={'Set'}
                                                    counter={onCounterHandler}
                                                    isDisabled={onSwitchMode ? activeButton: !activeButton}
                                            />
                                        </div>
                                    </div>
                                    :
                                    <div className={s.wrapper}>
                                        <div className={fontStyle}>
                                            <Counter count={currentValue}
                                                     counterInfo={counterInfo}
                                            />
                                            {button}
                                            <Button name={'Set'}
                                                    counter={onCounterHandler}
                                                    isDisabled={onSwitchMode ? false : activeButton}
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

export default App;

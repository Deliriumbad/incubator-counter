import React, {useEffect, useState} from 'react';
import './App.css';
import {Counter} from "./components/Counter";
import s from './app.module.css'
import {Button} from "./components/Button";
import {Input} from "./components/Input";
import {v1} from 'uuid';

function App() {
    let [startValue, setStartValue] = useState<number>(0);
    let [maxValue, setMaxValue] = useState<number>(5);
    let [currentValue, setCurrentValue] = useState<number>(startValue);
    let [select, setSelect] = useState<boolean>(true);
    let [counterStatus, setCounterStatus] = useState<string>('');

    const counterStep = 1;

    const maxInput = v1();
    const minInput = v1();

    const buttons = [
        {id: v1(), name: 'Inc', isDisabled: currentValue === maxValue || !select || maxValue <= startValue},
        {id: v1(), name: 'Reset', isDisabled: currentValue === startValue || !select || maxValue <= startValue},
    ]
    /*const set = [
        {id: v1(), name: 'Set', isDisabled: select}
    ]*/

    const inputs = [
        {id: maxInput, name: 'Max', value: maxValue},
        {id: minInput, name: 'Min', value: startValue}
    ]

    useEffect(() => {
        const startValueAsString = localStorage.getItem('startValue');
        startValueAsString && setStartValue(JSON.parse(startValueAsString));

        const maxValueAsString = localStorage.getItem('maxValue');
        maxValueAsString && setMaxValue(JSON.parse(maxValueAsString));

        const currentValueAsString = localStorage.getItem('currentValue');
        currentValueAsString && setCurrentValue(JSON.parse(currentValueAsString));
    }, []);

    useEffect(() => {
        localStorage.setItem('startValue', JSON.stringify(startValue));
        localStorage.setItem('maxValue', JSON.stringify(maxValue));
        localStorage.setItem('currentValue', JSON.stringify(currentValue));
    }, [startValue, maxValue, currentValue]);

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
                setSelect(true)
                setCounterStatus('');
                setInputMode(!inputMode)
                break;
        }
    }

    const onChangeHandler = (num: number, id: string) => {
        if (id === maxInput) {
            maxValue = num;
            setMaxValue(maxValue);
            setSelect(false);
            setCounterStatus('Enter values and press "set"');
        }
        if (id === minInput) {
            startValue = num;
            setStartValue(startValue);
            setSelect(false);
            setCounterStatus('Enter values and press "set"');
        }
        if (startValue >= maxValue || startValue < 0) {
            setCounterStatus('Incorrect value!');
            setSelect(true);
        }
    }


    const colorFont = currentValue === maxValue ? s.white : '';
    const colorInput = counterStatus === 'Incorrect value!' ? s.red : '';

    const button = buttons.map((el, index) => {
        return <Button key={index} counter={onCounterHandler} {...el} />
    })

    /*const setButton = set.map((el, index) => {
        return <Button key={index} counter={onCounterHandler} {...el} />
    })*/

    const input = inputs.map((el, index) => {
        return <Input key={index} callback={onChangeHandler} {...el} />
    })

    const [on, SetOn] = useState(true)

    const onButtonHandler = () => {
        SetOn(!on)
        setInputMode(false)
    }

    let [inputMode, setInputMode] = useState(false)

    return (
        <>
            <button onClick={onButtonHandler}>Switch mode</button>
            {
                on ?
                    <div className={s.container}>
                        <div className={s.wrapper}>
                            <div className={colorFont}>
                                <Counter count={currentValue}
                                         counterStatus={counterStatus}
                                />
                                {button}
                            </div>
                        </div>
                        <div className={`${s.wrapper} ${colorInput}`}>
                            {input}
                            <Button name={'Set'}
                                    counter={onCounterHandler}
                                    isDisabled={select}
                            />
                        </div>
                    </div>
                    :
                    <div>
                        <div className={s.container}>
                            {
                                inputMode ?
                                    <div className={s.wrapper}>
                                        <div className={colorFont}>
                                            {input}
                                            <Button name={'Set'}
                                                    counter={onCounterHandler}
                                                    isDisabled={!on ? false : select}
                                                    on={on}
                                                    inputMode={inputMode}
                                            />
                                        </div>
                                    </div>
                                    :
                                    <div className={s.wrapper}>
                                        <div className={colorFont}>
                                            <Counter count={currentValue}
                                                     counterStatus={counterStatus}
                                            />
                                            {button}
                                            <Button name={'Set'}
                                                    counter={onCounterHandler}
                                                    isDisabled={!on ? false : select}
                                                    on={on}
                                                    inputMode={inputMode}
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

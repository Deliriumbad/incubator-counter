import React, {useState} from 'react';
import './App.css';
import {Counter} from "./components/Counter";
import s from './app.module.css'
import {Button} from "./components/Button";

function App() {
    const [count, setCount] = useState<number>(0);

    const maxValue = 5;
    const startValue = 0;
    const counterStep = 1;

    const onCounterHandler = (name: string) => {
        switch (name) {
            case 'Inc':
                setCount(count + counterStep);
                break;
            case 'Reset':
                setCount(startValue);
                break
        }
    }

    const buttons = [
        {name: 'Inc', isDisabled: count === maxValue},
        {name: 'Reset', isDisabled: count === startValue}
    ]

    const appClass = count === 5 ? s.app : s.someClass;

    const button = buttons.map((el, index) => {
        return <Button key={index} counter={onCounterHandler} {...el} />
    })

    return (
        <div className={s.wrapper}>
            <div className={appClass}>
                <Counter count={count}/>
                {button}
            </div>
        </div>
    );
}

export default App;

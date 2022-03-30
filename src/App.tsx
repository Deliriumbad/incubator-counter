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

    const counter = () => {
        if (count < maxValue) {
            setCount(count + counterStep);
        }
    }

    const reset = () => {
        setCount(startValue);
    }

    const appClass = count === 5 ? s.app : s.someClass;

    return (
        <div className={s.wrapper}>
            <div className={appClass}>
                <Counter count={count}/>
                <Button name={'Inc'}
                        callback={counter}
                        isDisabled={count === 5 ? true : false}
                />
                <Button name={'Reset'}
                        callback={reset}
                        isDisabled={count === 0 ? true : false}
                />
            </div>
        </div>
    );
}

export default App;

import React, {useState} from 'react';
import './App.css';
import {Counter} from "./components/Counter";
import {Inc} from "./components/Inc";
import {Reset} from "./components/Reset";
import s from './app.module.css'
import {Button} from "./Button";


function App() {
    const [count, setCount] = useState<number>(0)

    const maxValue = 5;
    const startValue = 0;
    const counterStep = 1;

    const counter = () => {
        if (count < maxValue) {
            setCount(count + counterStep)
        }
    }

    const reset = () => {
        setCount(startValue)
    }

    const appClass = count === 5 ? s.app : s.someClass;

    return (
        <div className={s.wrapper}>
            <div className={appClass}>
                <Counter count={count}/>
                {/*<Inc counter={counter}
                         count={count}
                    />
                    <Reset reset={reset}
                           count={count}
                    />*/}

                <span className={s.inc}>
                        <Button name={'Inc'}
                                callback={counter}
                                isDisabled={count === 5 ? true : false}
                        />
                    </span>

                <span className={s.reset}>
                        <Button name={'Reset'}
                                callback={reset}
                                isDisabled={count === 0 ? true : false}
                        />
                    </span>
            </div>
        </div>
    );
}

export default App;

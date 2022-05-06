import React from 'react';
import s from './../app.module.css'

type CounterPropsType = {
    count: number
    counterStatus: string
}

export const Counter: React.FC<CounterPropsType> = (props) => {

    if (props.counterStatus === '') {
        return <div className={s.counter}>
            <span>{props.count}</span>
        </div>
    } else {
        return <div className={s.counter}>
            <span className={s.counterText}>{props.counterStatus}</span>
        </div>
    }




};


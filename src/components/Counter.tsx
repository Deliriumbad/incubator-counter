import React from 'react';
import s from './../app.module.css'

type CounterPropsType = {
   count:number
}

export const Counter = (props:CounterPropsType) => {
    return (
        <div className={s.counter}>
            <span>{props.count}</span>
        </div>
    );
};


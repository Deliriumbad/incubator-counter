import React from 'react';
import s from './../app.module.css'

type CounterPropsType = {
   count:number
}

export const Counter:React.FC<CounterPropsType> = (props) => {
    return (
        <div className={s.counter}>
            <span>{props.count}</span>
        </div>
    );
};


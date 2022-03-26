import React from 'react';
import s from './../app.module.css'

type IncPropsType = {
    counter:()=>void
    count:number
}

export const Inc = (props:IncPropsType) => {

    const onClickCountHandler = () => {
        props.counter()
    }

    return <button className={s.inc} disabled={props.count === 5 ? true : false} onClick={onClickCountHandler}>Inc</button>
};


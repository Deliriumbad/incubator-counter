import React from 'react';
import s from "../app.module.css";

type ResetPropsType ={
    reset:()=>void
    count:number
}

export const Reset = (props:ResetPropsType) => {

    const onClickResetHandler = () => {
        props.reset()
    }

    return <button className={s.reset} disabled={props.count === 0 ? true : false} onClick={onClickResetHandler}>Reset</button>
};


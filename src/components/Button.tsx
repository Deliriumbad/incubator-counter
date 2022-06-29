import React from "react";
import s from '../app.module.css'

type ButtonPropsType = {
    name: string
    counter: (name: string) => void
    isDisabled: boolean
}

export const Button: React.FC<ButtonPropsType> = (props) => {

    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        props.counter(e.currentTarget.name);
    }
    return (
        <button onClick={onClickHandler}
                disabled={props.isDisabled}
                className={s.button}
                name={props.name}
        >
            {props.name}
        </button>
    );
}
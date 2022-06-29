import React from "react";
import s from '../app.module.css'

type ButtonPropsType = {
    name: string
    counter: (name: string) => void
    isDisabled: boolean
    on?:boolean
    inputMode?:boolean
}

export const Button: React.FC<ButtonPropsType> = (props) => {

    let {name, counter, isDisabled, on, inputMode} = props;

    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        counter(e.currentTarget.name);
    }
    return (
        <button onClick={onClickHandler}
                disabled={isDisabled}
                className={s.button}
                name={name}
        >
            {name}
        </button>
    );
}
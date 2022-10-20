import React from "react";
import style from './Button.module.css'

type ButtonPropsType = {
    name: string
    counter: (name: string) => void
    isDisabled: boolean
}

export const Button: React.FC<ButtonPropsType> = (props) => {

    let {name, counter, isDisabled} = props;

    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        counter(e.currentTarget.name);
    }
    return (
        <button onClick={onClickHandler}
                disabled={isDisabled}
                className={style.button}
                name={name}
        >
            {name}
        </button>
    );
}
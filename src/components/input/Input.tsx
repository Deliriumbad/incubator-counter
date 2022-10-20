import React, {ChangeEvent} from 'react';
import style from './Input.module.css'

type InputPropsType = {
    name:string
    value:number
    callback: (num: number, id:string) => void
    id:string
}

export const Input: React.FC<InputPropsType> = (props) => {

    const {name, value, callback, id} = props;

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callback(Number(e.currentTarget.value), id);
    }

    return (
        <div>
            <span>{name === 'Max' ? 'Set max value' : 'Set min value'}</span>
            <input type={'number'}
                   className={style.input}
                   onChange={onChangeHandler}
                   value={value}
            />
        </div>
    );
};


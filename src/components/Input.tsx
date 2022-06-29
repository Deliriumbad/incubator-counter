import React, {ChangeEvent} from 'react';
import s from '../app.module.css'

type InputPropsType = {
    name:string
    value:number
    callback: (min: number, id:string) => void
    id:string
}

export const Input: React.FC<InputPropsType> = (props) => {

    const {name, value, callback, id} = props;

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callback(Number(e.currentTarget.value), id);
    }

    return (
        <div>
            <span>{name==='Max' ? 'Set max value' : 'Set min value'}</span>
            <input type={'number'}
                   className={s.input}
                   onChange={onChangeHandler}
                   id={id}
                   value={value}
            />
        </div>
    );
};


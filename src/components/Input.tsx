import React, {ChangeEvent} from 'react';
import s from '../app.module.css'


type InputPropsType = {
    name:string
    value:number
    callback: (min: number, id:string) => void
    id:string
}

export const Input = (props:InputPropsType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callback(Number(e.currentTarget.value), props.id)
    }

    return (
        <div>
            <span>{props.name==='Max' ? 'Set max value' : 'Set min value'}</span>
            <input type={'number'}
                   className={s.input}
                   onChange={onChangeHandler}
                   id={props.id}
                   value={props.value}
            />
        </div>
    );
};


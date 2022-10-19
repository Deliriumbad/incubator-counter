import React from 'react';
import s from './../app.module.css'

type CounterPropsType = {
    count: number
    counterInfo: string
}

export const Counter: React.FC<CounterPropsType> = ( {count, counterInfo}) => {

    // const {count, counterInfo} = props;

    return (
        <>
            {
                counterInfo ?
                    <div className={s.counter}>
                        <span className={s.counterText}>
                            {counterInfo}
                        </span>
                    </div>
                    :
                    <div className={s.counter}>
                        <span>
                            {count}
                        </span>
                    </div>
            }
        </>
    );
};


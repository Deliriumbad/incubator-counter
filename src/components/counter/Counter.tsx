import React from 'react';
import style from './Counter.module.css'

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
                    <div className={style.counter}>
                        <span className={style.counterText}>
                            {counterInfo}
                        </span>
                    </div>
                    :
                    <div className={style.counter}>
                        <span>
                            {count}
                        </span>
                    </div>
            }
        </>
    );
};


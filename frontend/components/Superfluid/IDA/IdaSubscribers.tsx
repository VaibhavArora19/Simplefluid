import React, { useState } from 'react';
import classes from "./IDASubscribers.module.css";

type IProps = {
    id: number;
    remove:(subscriber: string, shares: string) => void;
    updateSubscriber(newAddress: string, id:number):void;
    updateShares(newShares: string, id:number):void;
}

const IdaSubscribers = (props:IProps) => {
    const [subscriber, setSubscriber] = useState<string>('');
    const [shares, setShares] = useState<string>('');

    const removeHandler = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        event.preventDefault();
        props.remove(subscriber, shares);
    };

    const updateSubscriberHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSubscriber(event.target.value);
        props.updateSubscriber(event.target.value, props.id);
    };

    const updateSharesHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShares(event.target.value);
        props.updateShares(event.target.value, props.id);
    }
    return (
        <div>
            <input
            type="text"
            placeholder="Subscriber Address"
            className={classes.subscriber}
            value={subscriber}
            onChange={updateSubscriberHandler}
            />
            <input
            type="number"
            placeholder="Shares"
            className={classes.shares}
            value={shares}
            onChange={updateSharesHandler}
            />
            <span className={classes.cancel} onClick={removeHandler}><i className="fa-light fa-circle-xmark"></i></span>
        </div>
    )

};

export default IdaSubscribers;
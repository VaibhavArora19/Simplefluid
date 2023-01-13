import { FormEvent, useRef } from "react";
import { useAccount } from "wagmi";
import { createIndex } from "./SuperfluidIDA";
import classes from "./IdaIndex.module.css";

const IdaIndex = () => {
    const {address} = useAccount();
    const indexRef = useRef<HTMLInputElement>(null);

    const createIndexHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        createIndex(indexRef?.current?.value);

        const res = await fetch('http://localhost:8080/createIndex', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                indexId: indexRef?.current?.value,
                creator: address
            })
        });

        const data = await res.json();
        console.log(data);
    };

    return (
        <div className={classes.form}>
            <h1>IDA</h1>
            <form onSubmit={createIndexHandler}>
                <label>Index</label>
                <input 
                type="text"
                placeholder="IDA Index"
                className={classes.index}
                ref={indexRef}
                required
                />
                <button className="btn btn-warning btn-wide">Create Index</button>
            </form>
        </div>
    )
};

export default IdaIndex;
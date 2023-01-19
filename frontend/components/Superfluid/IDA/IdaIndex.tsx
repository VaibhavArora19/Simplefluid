import { FormEvent, useRef } from "react";
import { createIndex } from "./SuperfluidIDA";
import classes from "./IdaIndex.module.css";

const IdaIndex = () => {
    const indexRef = useRef<HTMLInputElement>(null);

    const createIndexHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        createIndex(indexRef?.current?.value);

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
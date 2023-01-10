import classes from "./IdaIndex.module.css";

const IdaIndex = () => {
    return (
        <div className={classes.form}>
            <h1>IDA</h1>
            <form>
                <label>Index</label>
                <input 
                type="text"
                placeholder="IDA Index"
                className={classes.index}
                required
                />
                <button className="btn btn-warning btn-wide">Create Index</button>
            </form>
        </div>
    )
};

export default IdaIndex;
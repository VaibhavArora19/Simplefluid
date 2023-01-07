import { counterActions } from "../../store";
import classes from "./CfaPage.module.css";

const CfaPage = () => {
    const decrementHandler = () => {
        counterActions.decrement();
    }

  return (
    <div className={classes.page}>
      <form className="form-control w-full max-w-xs">
        <input
          type="text"
          placeholder="Receiver public address"
          className="input input-bordered w-full max-w-xs"
        />
      </form>
      <button onClick = {decrementHandler}>
        <i className="fa-light fa-circle-xmark fa-2x"></i>
      </button>
    </div>
  );
};

export default CfaPage;

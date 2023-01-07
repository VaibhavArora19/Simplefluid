import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "../../store";
import classes from "./CfaPage.module.css";

type reduxState = {
  counter: {
    totalAccounts: [JSX.Element];
  };
};

type IProps = {
  id: number
}

const CfaPage = (props:IProps) => {
  const dispatch = useDispatch();
  const currentCount = useSelector(
    (state: reduxState) => state.counter.totalAccounts
  );

  const decrementHandler = () => {
    if (currentCount.length <= 1) return;

    dispatch(counterActions.decrement());
  };

  return (
    <div className={classes.page}>
      <span>
        <i className="fa-regular fa-trophy"></i>&nbsp;{props.id}
      </span>
        <div className={classes.input}>
          <input
            type="text"
            placeholder="Receiver public address"
            className={classes.addresses}
          />{" "}
        </div>
      <button onClick={decrementHandler}>
        <i className="fa-light fa-circle-xmark fa-2x"></i>
      </button>
    </div>
  );
};

export default CfaPage;

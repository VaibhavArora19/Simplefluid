import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "../../../store";
import { ChangeEvent, useState } from "react";
import classes from "./CfaPage.module.css";

type reduxState = {
  counter: {
    totalAccounts: [JSX.Element];
  };
};

type IProps = {
  id: number,
  update(newAddress: string, id:number):void
}

const CfaPage = (props:IProps) => {
  const [address, setAddress] = useState<string>('');  
  const dispatch = useDispatch();
  const currentCount = useSelector((state: reduxState) => state.counter.totalAccounts);


  const decrementHandler = () => {
    if (currentCount.length <= 1) return;

    dispatch(counterActions.decrement());
  };

  const addressHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
    props.update(event.target.value, props.id);
  };


  return (
    <div className={classes.page}>
      <span>
      <i className="lni lni-money-protection"></i>&nbsp;{props.id}
      </span>
        <div className={classes.input}>
          <input
            type="text"
            placeholder="Receiver public address"
            className={classes.addresses}
            value={address}
            onChange={addressHandler}
          />{" "}
        </div>
      <button onClick={decrementHandler}>
        <i className="fa-light fa-circle-xmark fa-2x"></i>
      </button>
    </div>
  );
};

export default CfaPage;

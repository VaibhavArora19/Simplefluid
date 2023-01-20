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
  receiver: string | string[] | undefined
}

const CfaPage = (props:IProps) => {
  const [address, setAddress] = useState<string>('');  
  const dispatch = useDispatch();
  const currentCount = useSelector((state: reduxState) => state.counter.totalAccounts);


  const decrementHandler = () => {
    if(props.receiver) return;

    if (currentCount.length <= 1) return;

    dispatch(counterActions.decrement());
  };

  const addressHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
    props.update(event.target.value, props.id);
  };


  return (
    <div className={classes.page}>
          <input
            type="text"
            placeholder="Receiver public address"
            className={classes.addresses}
            value={props.receiver ? props.receiver : address}
            onChange={addressHandler}
          />{" "}
      <span onClick={decrementHandler}>
        <i className="fa-light fa-circle-xmark fa-2x"></i>
      </span>
    </div>
  );
};

export default CfaPage;

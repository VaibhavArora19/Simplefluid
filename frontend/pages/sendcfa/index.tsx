import { useState } from "react";
import CfaPage from "../../components/Superfluid/CfaPage";
import { counterActions } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Cfa.module.css";

type reduxState = {
    counter: number
}

const CFA = () => {
  const [isMultiple, setIsMultiple] = useState<boolean>(false);
  const [totalAccounts, setTotalAccounts] = useState<Array<JSX.Element>>([<CfaPage />]);
  const dispatch = useDispatch();
  const currentCounter = useSelector((state: reduxState) => state.counter)

    const incrementHandler = () => {

        if(isMultiple === false){
            setIsMultiple(true);
        }
        setTotalAccounts((totalAccounts) => {
            return [...totalAccounts, <CfaPage/>]
        })
        dispatch(counterActions.increment());
    }

  return (
    <div className={styles.page}>
      <h1>Send Stream</h1>
      <label className="label">
        <span className="label-text">Receiver public Address</span>
      </label>
      <div className={styles.pageManager}>
        {totalAccounts.map(page => {
            return page;
        })}
      </div>
      <button className="btn btn-warning btn-wide" onClick={incrementHandler}>
        <i className="fa-regular fa-user-plus"></i>&nbsp;Add wallet address
      </button>
    </div>
  );
};

export default CFA;

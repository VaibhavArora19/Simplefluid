import { useState } from "react";
import CfaPage from "../../components/Superfluid/CfaPage";
import { counterActions } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Cfa.module.css";

type reduxState = {
  counter: {
    totalAccounts: [JSX.Element];
  };
};

const CFA = () => {
  const [isMultiple, setIsMultiple] = useState<boolean>(false);
  const dispatch = useDispatch();
  const currentAccounts = useSelector(
    (state: reduxState) => state.counter.totalAccounts
  );

  const incrementHandler = () => {
    if (isMultiple === false) {
      setIsMultiple(true);
    }

    dispatch(counterActions.increment());
  };

  return (
    <div>
      <div className={styles.page}>
        <h1>Send Stream</h1>
        <label className="label">
          <h2 className="label-text">Receiver public Address</h2>
        </label>
        <div>
          {currentAccounts.map((page, index) => {
            return <CfaPage key={index} id={index + 1}/>;
          })}
        </div>
      </div>
      <button className={`btn btn-warning btn-wide ${styles.button}`} onClick={incrementHandler}>
        <i className="fa-regular fa-user-plus"></i>&nbsp;Add wallet address
      </button>
    </div>
  );
};

export default CFA;

import React from "react";
import IdaSubscribers from "../../../components/Superfluid/IDA/IdaSubscribers";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../../styles/IDA.module.css";
import { updateSubscription } from "../../../components/Superfluid/IDA/SuperfluidIDA";


const IdaIndex = () => {
  const [length, setLength] = useState(0);
  const [totalSubscribers, setTotalSubscribers] = useState(['1']); 
  const [subscribers, setSubscribers] = useState<Array<string>>([]);
  const [shares, setShares] = useState<Array<string>>([]);

  const router = useRouter();
  const { indexId } = router.query;

  const addFieldHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    setLength((preValue) => preValue + 1)
    setTotalSubscribers(prevValue => {
        return [...prevValue, '1']
    })
  };

  const removeFieldHandler = () => {
    setTotalSubscribers(prevValue => {
        return [...prevValue.slice(0, prevValue.length-1)]
    });
    setSubscribers(prevValue => {
        return [...prevValue.slice(0, prevValue.length-1)]
    });
    setShares(prevValue => {
        return [...prevValue.slice(0, prevValue.length-1)]
    })
  };

  const updateShares = (share: string, index: number) => {

        let currentShares = shares;
        currentShares[index] = share;
        setShares(currentShares);
  };

  const updateSubscribers = (subscriber: string, index:number) => {
        let currentSubscribers = subscribers;
        currentSubscribers[index] = subscriber;
        setSubscribers(currentSubscribers);

        console.log(subscribers);
        console.log(shares);
  };


  return (
    <div className={styles.bar}>
      <div className={styles.info}>
        <h1 className={styles.logo}>Update IDA</h1>
        <form>
            <>
          <div style={{width:"90%", marginBottom:"4%"}}>
            <div style={{display:"inline-block",}}>
              <label>Index ID</label>
              <input
                style={{
                  marginLeft: "30px",
                  width: "120px",
                  marginBottom: "4%",
                }}
                type="text"
                placeholder={`${indexId}`}
                className="input input-bordered w-full max-w-xs"
                disabled
              />
            </div>
            <div style={{display:"inline-block", width:"45%"}}>
              <label>Units</label>
              <input type="text" placeholder="Units" className={styles.units}/>
            </div>
          </div>
          <label>Subscribers</label>
          {totalSubscribers.map((subscriber, index) => {
            return <IdaSubscribers key={index} id={index} remove={removeFieldHandler} updateShares={updateShares} updateSubscriber={updateSubscribers}/>;
          })}
          <div className={styles.btn}>
          <button className={`btn btn-info ${styles.add}`} onClick={addFieldHandler}>+</button>
          <button className={`btn btn-warning ${styles.update}`}>Update</button>
          <button className={`btn btn-warning ${styles.distribute}`}>Distribute</button>
          </div>
          </>
        </form>
      </div>
    </div>
  );
};

export default IdaIndex;

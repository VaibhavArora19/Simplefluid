import React from "react";
import IdaSubscribers from "../../../components/Superfluid/IDA/IdaSubscribers";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import styles from "../../../styles/IDA.module.css";
import { updateSubscription, distribute } from "../../../components/Superfluid/IDA/SuperfluidIDA";


const IdaIndex = () => {
  const [length, setLength] = useState(0);
  const [totalSubscribers, setTotalSubscribers] = useState(['1']); 
  const [subscribers, setSubscribers] = useState<Array<string>>([]);
  const [shares, setShares] = useState<Array<string>>([]);
  const amountRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { indexId } = router.query;

  const addFieldHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    setLength((preValue) => preValue + 1)
    setTotalSubscribers(prevValue => {
        return [...prevValue, '1']
    })
  };

  const removeFieldHandler = (subscriber: string, shares: string) => {
    setTotalSubscribers(prevValue => {
        return [...prevValue.slice(0, prevValue.length-1)]
    });
    if(subscriber !== '') {
    setSubscribers(prevValue => {
        return [...prevValue.slice(0, prevValue.length-1)]
    });
    }
    if(shares !== '') {
    setShares(prevValue => {
        return [...prevValue.slice(0, prevValue.length-1)]
    })
    }
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

  const updateSubscriptionHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    for(let i =0; i<subscribers.length; i++) {
      if(indexId !== undefined)

      updateSubscription(indexId?.toString(), subscribers[i], shares[i]);
    }
  }; 

  const distributeAmountHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
    
      if(amountRef?.current?.value === null) return;

      if(indexId !== undefined && amountRef?.current?.value)
      distribute(indexId?.toString(), amountRef?.current?.value)
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
              <label>Amount</label>
              <input type="text" placeholder="Amount" className={styles.units} ref={amountRef}/>
            </div>
          </div>
          <label>Subscribers</label>
          {totalSubscribers.map((subscriber, index) => {
            return <IdaSubscribers key={index} id={index} remove={removeFieldHandler} updateShares={updateShares} updateSubscriber={updateSubscribers}/>;
          })}
          <div className={styles.btn}>
          <button className={`btn btn-info ${styles.add}`} onClick={addFieldHandler}>+</button>
          <button className={`btn btn-warning ${styles.update}`} onClick={updateSubscriptionHandler}>Update</button>
          <button className={`btn btn-warning ${styles.distribute}`} onClick={distributeAmountHandler}>Distribute</button>
          </div>
          </>
        </form>
      </div>
    </div>
  );
};

export default IdaIndex;

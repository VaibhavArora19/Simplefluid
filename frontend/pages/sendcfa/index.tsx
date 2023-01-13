import { useState, useRef } from "react";
import CfaPage from "../../components/Superfluid/CFA/CfaPage";
import { counterActions } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useContract, useSigner, useAccount } from "wagmi";
import { contractAddress, ABI } from "../../constants";
import { createStream } from "../../components/SuperfluidPermissions/index";
import styles from "../../styles/Cfa.module.css";

type reduxState = {
  counter: {
    totalAccounts: [JSX.Element];
  };
};

const CFA = () => {
  const [isMultiple, setIsMultiple] = useState<boolean>(false);
  const [receiverAddress, setReceiverAddress] = useState<Array<string|null>>([]);
  const dispatch = useDispatch();
  const currentAccounts = useSelector((state: reduxState) => state.counter.totalAccounts);
  const {data: signer} = useSigner();
  const { address } = useAccount();
  const flowRateRef = useRef<HTMLInputElement>(null);

  const contract = useContract({
    address: contractAddress,
    abi: ABI,
    signerOrProvider: signer
  });

  const incrementHandler = () => {
    if (isMultiple === false) {
      setIsMultiple(true);
    }

    dispatch(counterActions.increment());
  };

  const updateReceiverAddress = (updatedAddress: string, id: number) => {
    let allAddresses = receiverAddress;
    allAddresses[id-1] = updatedAddress;
    setReceiverAddress(allAddresses);
    
  }

  const streamHandler = async () => {

    try {
    if(currentAccounts.length === 1){
        createStream(address, receiverAddress[0], flowRateRef?.current?.value);
    }else {
        let receiverAddresses: (string | null)[] = [];

        if(receiverAddress !== null) {
          for(let address of receiverAddress) {
            
            if(address?.length !== 42) {
              continue;
            }
            receiverAddresses.push(address)
          }
            if(contract !== null) {

              await contract.startFlowMultiple(address, receiverAddresses, flowRateRef?.current?.value)
            }
        }
        
    }
    } catch(error) {

      console.error(error);
    }
  }

  return (
    <div>
      <div className={`alert alert-info shadow-lg ${styles.alert}`}>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current flex-shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>
            To enable multi stream, you need to provide permission to smart
            contract.
          </span>
        </div>
      </div>
      <div className={styles.page}>
        <h1>Send Stream</h1>
        <label className="label">
          <h4 className="label-text">Receiver public Address</h4>
        </label>
        <div>
          {currentAccounts.map((page, index) => {
            return <CfaPage key={index} id={index + 1} update={updateReceiverAddress}/>;
          })}
        </div>
        <div className={`form-control w-full max-w-xs ${styles.fields}`}>
          <div>
          <label className="label">
            <span className="label-text">Flow Rate</span>
          </label>
          <input
            type="text"
            placeholder="Flow Rate/month"
            className={`input input-bordered w-full max-w-xs ${styles.flow}`}
            ref={flowRateRef}
          />
          </div>
          <div>
          <label className="label">
            <span className="label-text">Super token</span>
          </label>
          <input
            type="text"
            placeholder="fDAIx"
            className={`input input-bordered w-full max-w-xs ${styles.flow}`}
            disabled
          />
          </div>
        </div>
        <div>
          <button className={`btn btn-outline btn-success ${styles.send}`} onClick={streamHandler}>
            Start streaming
          </button>
          <button
            className={`btn btn-warning ${styles.button}`}
            onClick={incrementHandler}
          >
            <i className="fa-regular fa-user-plus"></i>&nbsp;Add wallet address
          </button>
        </div>
      </div>
    </div>
  );
};

export default CFA;

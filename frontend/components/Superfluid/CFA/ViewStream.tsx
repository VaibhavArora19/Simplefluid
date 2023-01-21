import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { counterActions } from "../../../store";
import { deleteFlow } from "../../SuperfluidPermissions";
import { useAccount } from "wagmi";
import classes from "./ViewStream.module.css";

type Iprops = {
  flowRate: string;
  address: string;
  totalFlow: string;
  time: string;
  type: string;
};

const ViewStream = (props: Iprops) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { address } = useAccount();

  let date = new Date(0);
  date.setUTCSeconds(Number(props.time));

  let time = date.toString();
  time =
    time.split(" ")[1] +
    " " +
    time.split(" ")[2] +
    " " +
    time.split(" ")[3] +
    " " +
    time.split(" ")[4];

  const updateStreamHandler = () => {
    dispatch(counterActions.trim());
    router.push(`/CFA?update=true&address=${props.address}`);
  }

  const cancelStreamHandler = async () => {
    if(props.type === "incoming") {
      deleteFlow(props.address, address);
    }else{
      deleteFlow(address, props.address);
    }
  };


  return (
    <div className={classes.view}>
      <div className={classes.address}>
        <h1>
          {props.address.substring(0, 5) +
            "..." +
            props.address.substring(37, 42)}
        </h1>
      </div>
      <div className={classes.flow}>
        <h1>{ethers.utils.formatEther(props.totalFlow)}</h1>
      </div>
      <div className={classes.flowRate}>
        <h1>{props.flowRate === "0" ? "--" : props.flowRate}</h1>
      </div>
      <div className={classes.time}>
        <h1>{time}</h1>
      </div>
      <div className={classes.onGoing}>
        <h1>
          {props.flowRate !== "0" ? (
            <span className={classes.icon}>
             { props.type === "outgoing" && <div className={classes.pen} onClick={updateStreamHandler}>
                <i className="fa-regular fa-pen"></i>
              </div> }
              <div className={classes.cross} onClick={cancelStreamHandler}>
                <i className="fa-light fa-circle-xmark"></i>
              </div>
            </span>
          ) : (
            "No"
          )}
        </h1>
      </div>
    </div>
  );
};

export default ViewStream;

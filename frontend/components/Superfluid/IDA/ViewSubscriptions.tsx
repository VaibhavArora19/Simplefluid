import { approveSubscription, revokeSubscription } from "./SuperfluidIDA";
import classes from "./ViewSubscriptions.module.css";

type Iprops = {
  isApproved: boolean;
  publisher: string;
  units: string;
  index: string;
}

const ViewSubscriptions = (props: Iprops) => {
  
  const approveOrRevokeHandler = async () => {

    if(props.isApproved){
        revokeSubscription(props.index, props.publisher);
    }else{
        approveSubscription(props.index, props.publisher);
    }

  };

  return (
    <div className={classes.view}>
        <div>
            <h1>{props.publisher.substr(0, 5) + "..." + props.publisher.substr(37, 42)}</h1>
        </div>
        <div>
          <h1>{props.units}</h1>
        </div>
        <div style={{marginLeft:"7%"}}>
          <h1>{props.isApproved ? "Yes" : "No"}</h1>
        </div>
        <div className={props.isApproved ? classes.symbolRevoke : classes.symbolApprove} onClick={approveOrRevokeHandler}>
          { props.isApproved ?
          <h1><i className="fa-light fa-circle-xmark"></i>&nbsp; Revoke</h1>
            :
            <h1><i className="fa-light fa-circle-check"></i>&nbsp; Approve</h1>
          }
        </div>
    </div>
  );
};

export default ViewSubscriptions;

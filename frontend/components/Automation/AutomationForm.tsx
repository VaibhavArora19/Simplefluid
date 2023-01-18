import {useState, useEffect, useRef } from "react";
import { useAccount } from "wagmi";
import { authorizeFullControl } from "../SuperfluidPermissions";
import { createFlowSchedule } from "./index";
import classes from "./AutomationForm.module.css";

const AutomationForm = () => {
    const [permission, setPermission] = useState<boolean>(false);
    const receiverRef = useRef<HTMLInputElement>(null);
    const flowRateRef = useRef<HTMLInputElement>(null);
    const startDateRef = useRef<HTMLInputElement>(null);
    const endDateRef = useRef<HTMLInputElement>(null);
    const startTimeRef = useRef<HTMLInputElement>(null);
    const endTimeRef = useRef<HTMLInputElement>(null);

    const { address } = useAccount();

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    const currentDate = yyyy + '-' + mm + '-' + dd;

    useEffect(() => {
        
        if(address) {
            (async function(){
                let sender = address.toLowerCase();

                const data = await fetch(`http://localhost:8080/automationPermission/${sender}`);
                const result = await data.json();

                for(let permission of result.flowOperators){
                    if(permission.permissions === 7){
                        setPermission(true);
                        break;
                    }
                }
            })();
        }
        
    }, [address]);

    const authorizeScheduler = (event: React.MouseEvent<HTMLButtonElement | MouseEvent>) => {
        event.preventDefault();
        authorizeFullControl("0xF18825d412C061aEfEFB4dF46a1c077636dA50bf")
    };
    
    const scheduleHandler = (event: React.MouseEvent<HTMLButtonElement | MouseEvent>) => {
        event.preventDefault();

        let d = new Date(startDateRef.current?.value + " " + startTimeRef.current?.value)
        let startEpoch = d.getTime();
        startEpoch = startEpoch/1000;

        let d1 = new Date(endDateRef.current?.value + " " + endTimeRef.current?.value);
        let endEpoch = d1.getTime();
        endEpoch = endEpoch/1000;

        if(startDateRef.current?.value === "" || endDateRef.current?.value === ""){
            if(startDateRef.current?.value === ""){
                createFlowSchedule(receiverRef.current?.value, 0, Number(flowRateRef.current?.value), endEpoch);
                return;

            }else if(endDateRef.current?.value === ""){
                createFlowSchedule(receiverRef.current?.value, startEpoch, Number(flowRateRef.current?.value), 0);
                return;
            }
            return;
        }

        createFlowSchedule(receiverRef.current?.value, startEpoch, Number(flowRateRef.current?.value), endEpoch);
    };

  return (
    <div className={classes.form}>
      <div>
        <h1>Automation</h1>
      </div>
      <div>
        <form>
          <div>
            <label>Receiver Address</label>
            <input type="text" placeholder="Receiver address" className={classes.wide} ref={receiverRef} required/>
          </div>
          <div>
            <label>Flow Rate</label>
            <input type="number" placeholder="Flow Rate/sec(in wei)" className={classes.wide} ref={flowRateRef} required/>
          </div>
          <div className={classes.date}>
            <div>
                <label>Start Date</label>
                <input type="date" min={currentDate} ref={startDateRef}/>
            </div>
            <div>
                <label>Start Time</label>
                <input type="time" ref={startTimeRef}/>
            </div>
          </div>
          <div style={{marginTop:"3%"}} className={classes.date}>
            <div>
                <label>End Date</label>
                <input type="date" min={currentDate} ref={endDateRef}/>
            </div>
            <div>
                <label>End Time</label>
                <input type="time" ref={endTimeRef}/>
            </div>
          </div>
          {permission ?
          <button className="btn btn-warning btn-wide" onClick={scheduleHandler}>Schedule Stream</button>
            :
          <button className="btn btn-info btn-wide" onClick={authorizeScheduler}>Authorize Scheduler</button>
          }
        </form>
      </div>
    </div>
  );
};

export default AutomationForm;

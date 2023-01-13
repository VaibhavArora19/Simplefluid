import Image from "next/image";
import { useAccount } from "wagmi";
import classes from "./PermissionBar.module.css";

type IProps = {
    operatorAddress: string;
    permissions: [string];
};


const PermissionBar = (props: IProps)=> {
    const {address} = useAccount();

    const img = Math.floor(Math.random() * 3);
    const revokePermissionHandler = async () => {

        const data = await fetch(`http://localhost:8080/${address}`);

        const res = await data.json();
        console.log(res);
    };
    
    return (
        <div className={classes.bar}>
            <div className={classes.user}>
                <Image className={classes.img} src={`/user${img}.avif`} width={"40"} height={"40"} alt="User PFP"/>
                <h3>{`${props.operatorAddress.substr(0,6)}...${props.operatorAddress.substr(38, 43)}`}</h3>
            </div>
            <div className={classes.type}>
                {props.permissions.length > 1 ? `${props.permissions[0], "+", props.permissions.length-1}`: props.permissions[0]} 
            </div>
            <div className={classes.cross} onClick={revokePermissionHandler}>
                <h4 style={{fontSize:"22px"}}><i className="fa-sharp fa-solid fa-circle-xmark"></i></h4>
            </div>
        </div>
    )
};

export default PermissionBar;
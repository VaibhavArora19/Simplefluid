import { reversePermissions } from "../../constants";
import { revokeFullControl } from "./index";
import Image from "next/image";
import { useAccount } from "wagmi";
import classes from "./PermissionBar.module.css";

type IProps = {
    operatorAddress: string;
    permissions: string;
};


const PermissionBar = (props: IProps)=> {
    const {address} = useAccount();
    
    // @ts-ignore
    const currentPermission = reversePermissions[props.permissions];

    const img = Math.floor(Math.random() * 3);

    const revokePermissionHandler = async () => {
        revokeFullControl(props.operatorAddress);
    };
    
    return (
        <div className={classes.bar}>
            <div className={classes.user}>
                <Image className={classes.img} src={`/user${img}.avif`} width={"40"} height={"40"} alt="User PFP"/>
                <h3>{`${props.operatorAddress.substr(0,6)}...${props.operatorAddress.substr(38, 43)}`}</h3>
            </div>
            <div className={classes.type}>
                <h2>{currentPermission}</h2> 
            </div>
            <div className={classes.cross} onClick={revokePermissionHandler}>
                <h4 style={{fontSize:"22px"}}><i className="fa-light fa-circle-xmark"></i></h4>
            </div>
        </div>
    )
};

export default PermissionBar;
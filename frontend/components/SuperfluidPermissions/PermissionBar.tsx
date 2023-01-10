import Image from "next/image";
import classes from "./PermissionBar.module.css";

const PermissionBar = ()=> {
    let address = '0x5e97BBfb258fBb110231c4f01C693ef6BA9553a6';
    return (
        <div className={classes.bar}>
            <div className={classes.user}>
                <Image className={classes.img} src={"/user0.avif"} width={"40"} height={"40"} alt="User PFP"/>
                <h3>{`${address.substr(0,6)}...${address.substr(38, 43)}`}</h3>
            </div>
            <div className={classes.type}>
                Create
            </div>
            <div className={classes.cross}>
                <h4 style={{fontSize:"22px"}}><i className="fa-sharp fa-solid fa-circle-xmark"></i></h4>
            </div>
        </div>
    )
};

export default PermissionBar;
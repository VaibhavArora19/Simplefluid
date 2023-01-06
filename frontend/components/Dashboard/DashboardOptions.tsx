import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import Card from "../UI/Card";

import classes from "./DashboardOptions.module.css";

const DashboardOptions = () => {
    const { isConnected } = useAccount();

    return (
        <div>
            {
                isConnected ?
                <div className={classes.page}>   
                    <h1>Track your streamable money!</h1>
                    <h4>All of your superfluid stream in one place!!</h4> 
                <div className={`grid grid-cols-2 ${classes.options}`}>
                    <Card heading="View streams (CFA)" description="View all of your CFA streams"/>
                    <Card heading="View streams (IDA)" description="View all of your IDA streams"/>
                    <Card heading="Lend" description="View your lending streams"/>
                    <Card heading="Borrow" description="View the amount you've borrowed"/>
                </div>
                </div>
                :
                <div className={classes.connect}>
                    <h1>Oops :( Looks like your wallet is not connected</h1>
                    <h3>You need to connect your wallet to get started</h3>
                    <ConnectButton />
                </div>
            }
        </div>
    )
};

export default DashboardOptions;
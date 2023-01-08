import { ethers } from "ethers";
import {authorizeFullControl} from "../../components/SuperfluidPermissions";

const Permissions = () => {

    // async function set() {
    //     const provider = new ethers.providers.Web3Provider(window.ethereum);
    //     const signer = provider.getSigner();
    //     const contract = new ethers.Contract("0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f", superTokenABI, signer)
    //     await contract.setFlowPermissions("0x9630985483Bc0ACc8E88cebe9a08321f08c61380", true, true, true, 1000000000)
    // }

    async function set() {
        authorizeFullControl();
    }

    return (
        <div>
            <h1>Hello</h1>
            <button onClick={set}>Set permission</button>
        </div>
    )
};

export default Permissions;
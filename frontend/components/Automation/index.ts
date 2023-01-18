import { ethers } from "ethers"
import { IFlowScheduler, ABI, contractAddress } from "../../constants";

const flowSchedulerAddress = "0xF18825d412C061aEfEFB4dF46a1c077636dA50bf";
const superTokenAddress = "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f"; //fDAIx

export const createFlowSchedule = async (receiver: string | undefined, startDate: Number , flowRate: Number, endDate: Number) => {
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(flowSchedulerAddress, IFlowScheduler, signer);
    const simpleFluidContract = new ethers.Contract(contractAddress, ABI, signer)

    const tx = await contract.createFlowSchedule(superTokenAddress, receiver, startDate, 300, flowRate, 0, endDate, "0x", "0x", {gasLimit: 500000});

    await tx.wait();
    
    const tx1 = await simpleFluidContract.scheduleStream(receiver);

    await tx1.wait();


}

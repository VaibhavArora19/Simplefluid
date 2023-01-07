import {ethers} from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";
import { contractAddress } from "../../constants";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();


export async function authorizeFullControl() {
    const sf = await Framework.create({
        chainId: 80001,
        provider:provider
    });
    
    const DAIxContract = await sf.loadSuperToken("fDAIx");
    const DAIx = DAIxContract.address;

        try {
            const updateFlowOperatorOperation =
              sf.cfaV1.authorizeFlowOperatorWithFullControl({
                superToken: DAIx,
                flowOperator: contractAddress,
              });

              console.log("Updating your flow permissions...");

              const result = await updateFlowOperatorOperation.exec(signer);
              console.log(result);
     
              console.log(
                `Congrats - you've just authorized flow permissions for 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721`
              );
        }
        catch(error) {
            console.log(error);
        }
    };

export async function revokeFullAccess() {
    const sf = await Framework.create({
        chainId: 80001,
        provider:provider
    });
    
    const DAIxContract = await sf.loadSuperToken("fDAIx");
    const DAIx = DAIxContract.address;

    try {
        const updateFlowOperatorOperation =
          sf.cfaV1.revokeFlowOperatorWithFullControl({
            superToken: DAIx,
            flowOperator: contractAddress,
          });

        console.log("Revoking your flow permissions...");

        const result = await updateFlowOperatorOperation.exec(signer);
        console.log(result);

        console.log(
          `Congrats - you've just revoked  flow permissions for 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721`
        );
      } catch (error) {
        console.log(
          "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
        );
        console.error(error);
      }
}


export async function createOrRevokePermission(flowRate:string) {
    const sf = await Framework.create({
        chainId: 80001,
        provider:provider
    });
    
    const DAIxContract = await sf.loadSuperToken("fDAIx");
    const DAIx = DAIxContract.address;

    try {
    const updateFlowOperatorOperation =
    sf.cfaV1.updateFlowOperatorPermissions({
      flowOperator: contractAddress,
      permissions: 1, //change this later there are in total 7 permissions
      flowRateAllowance: flowRate,
      superToken: DAIx,
    });

  console.log("Updating your flow permissions...");

  const result = await updateFlowOperatorOperation.exec(signer);
  console.log(result);

  console.log(
    `Congrats - you've just updated flow permissions for 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721`
  );
} catch (error) {
  console.log(
    "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
  );
  console.error(error);
  }
}
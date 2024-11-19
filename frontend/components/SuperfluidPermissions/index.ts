import { ethers } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";

//function to authorize full control to an operator
export async function authorizeFullControl(operator: string) {
  // @ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const sf = await Framework.create({
    chainId: 11155111,
    provider: provider,
  });

  const DAIxContract = await sf.loadSuperToken("fDAIx");
  const DAIx = DAIxContract.address;

  try {
    const updateFlowOperatorOperation = sf.cfaV1.authorizeFlowOperatorWithFullControl({
      superToken: DAIx,
      flowOperator: operator,
    });

    console.log("Updating your flow permissions...");

    const result = await updateFlowOperatorOperation.exec(signer);
    console.log(result);

    console.log(`Congrats - you've just authorized flow permissions`);
  } catch (error) {
    console.log(error);
  }
}

//function to revoke full access given to an operator
export async function revokeFullControl(operator: string) {
  // @ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const sf = await Framework.create({
    chainId: 11155111,
    provider: provider,
  });

  const DAIxContract = await sf.loadSuperToken("fDAIx");
  const DAIx = DAIxContract.address;

  try {
    const updateFlowOperatorOperation = sf.cfaV1.revokeFlowOperatorWithFullControl({
      superToken: DAIx,
      flowOperator: operator,
    });

    console.log("Revoking your flow permissions...");

    const result = await updateFlowOperatorOperation.exec(signer);
    console.log(result);

    console.log(`Congrats - you've just revoked  flow permissions`);
  } catch (error) {
    console.log(
      "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
    );
    console.error(error);
  }
}

//Function to give permissions to the operator based on the permission value
export async function createOrRevokePermission(flowRate: string, operator: string, permission: number) {
  // @ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const sf = await Framework.create({
    chainId: 11155111,
    provider: provider,
  });

  const DAIxContract = await sf.loadSuperToken("fDAIx");
  const DAIx = DAIxContract.address;

  try {
    const updateFlowOperatorOperation = sf.cfaV1.updateFlowOperatorPermissions({
      flowOperator: operator,
      permissions: permission, //change this later there are in total 7 permissions
      flowRateAllowance: flowRate,
      superToken: DAIx,
    });

    console.log("Updating your flow permissions...");

    const result = await updateFlowOperatorOperation.exec(signer);
    console.log(result);

    console.log(`Congrats - you've just updated flow permissions`);
  } catch (error) {
    console.log(
      "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
    );
    console.error(error);
  }
}

//Function allowing user to create a single stream without any operator
export async function createStream(sender: string | undefined, receiver: string | null, flowRate: string | undefined) {
  // @ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const sf = await Framework.create({
    chainId: 11155111,
    provider: provider,
  });

  const DAIxContract = await sf.loadSuperToken("fDAIx");
  const DAIx = DAIxContract.address;

  if (receiver !== null && flowRate !== undefined) {
    let flowOp = DAIxContract.createFlow({
      sender,
      receiver,
      flowRate,
    });
    await flowOp.exec(signer);
  }
}

export async function updateFlow(sender: string | undefined, receiver: string | undefined, flowRate: string | undefined) {
  // @ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const sf = await Framework.create({
    chainId: 11155111,
    provider: provider,
  });

  const DAIxContract = await sf.loadSuperToken("fDAIx");
  if (sender !== undefined && receiver !== undefined && flowRate !== undefined) {
    let flowOp = DAIxContract.updateFlow({
      sender,
      receiver,
      flowRate,
    });
    console.log("updating flow");

    await flowOp.exec(signer);
  }
}

//Deletes the ongoing flow, this function should be operated by user and not user
export async function deleteFlow(sender: string | undefined, receiver: string | undefined) {
  // @ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const sf = await Framework.create({
    chainId: 11155111,
    provider: provider,
  });

  const DAIxContract = await sf.loadSuperToken("fDAIx");

  if (sender !== undefined && receiver !== undefined) {
    let flowOp = DAIxContract.deleteFlow({
      sender,
      receiver,
    });

    console.log("Deleting your stream");

    await flowOp.exec(signer);
  }
}

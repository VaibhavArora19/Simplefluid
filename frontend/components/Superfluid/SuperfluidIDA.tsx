import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

// @ts-ignore
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

export async function createIndex(indexId: string) {
    const sf = await Framework.create({
        chainId:80001,
        provider
    });

    const fDAIx = await sf.loadSuperToken("fDAIx");

    try {
        const createIndexOperation = fDAIx.createIndex({
            indexId: indexId
        });

        console.log('Creating your index....');

        await createIndexOperation.exec(signer);

        console.log(
            `Congrats - you've just created a new Index!
             Network: Mumbai
             Super Token: DAIx
             Index ID: ${indexId}
          `
          );

    }
    catch(err) {
        console.error(err);
    }
};

export async function updateSubscription(indexId: string, subscriber: string, units: string) {
    const sf = await Framework.create({
        chainId:80001,
        provider
    });

    const fDAIx = await sf.loadSuperToken("fDAIx");

    try {
        const updateSubscriptionOperation = fDAIx.updateSubscriptionUnits({
            indexId,
            subscriber: '0xf9739cF1B992E62a1C5c18C33cacb2a27a91F888',
            units: '3'
        });

        console.log('Updating your index...');

        await updateSubscriptionOperation.exec(signer);

        console.log(
            `Congrats - you've just updated an Index!
             Network: Goerli
             Super Token: DAIx
             Index ID: ${indexId}
             Subscriber: nothing
             Units: 3 units 
          `
        );
    }
    catch(err) {
        console.error(err);

    }
}

export async function distribute(indexId: string, amount: string) {
    const sf = await Framework.create({
        chainId:80001,
        provider
    });

    const fDAIx = await sf.loadSuperToken("fDAIx");

    try {
        const distributeOperation = fDAIx.distribute({
            indexId,
            amount
        });

        console.log('Distributing funds to your index subscribers');

        await distributeOperation.exec(signer);

        console.log(
            `Congrats - you've just sent funds to your index!
             Network: Goerli
             Super Token: DAIx
             Index ID: ${indexId}
             Total Sent: ${amount}
          `
          );
    }
    catch(err) {
        console.error(err);
    }
}
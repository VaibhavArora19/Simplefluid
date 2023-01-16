import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";


export async function createIndex(indexId: string | undefined) {
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const sf = await Framework.create({
        chainId:80001,
        provider
    });

    const fDAIx = await sf.loadSuperToken("fDAIx");

    try {
        if(indexId !== undefined) {

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

    }
    catch(err) {
        console.error(err);
    }
};

export async function updateSubscription(indexId: string, subscriber: string, units: string) {
    // @ts-ignore 
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    
    const sf = await Framework.create({
        chainId:80001,
        provider
    });

    const fDAIx = await sf.loadSuperToken("fDAIx");

    try {
        const updateSubscriptionOperation = fDAIx.updateSubscriptionUnits({
            indexId,
            subscriber: subscriber,
            units: units
        });

        console.log('Updating your index...');

        await updateSubscriptionOperation.exec(signer);

        console.log(
            `Congrats - you've just updated an Index!
             Network: Mumbai
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
    // @ts-ignore 
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    
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
             Network: Mumbai
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


export async function revokeSubscription(indexId: string, publisher: string) {
    // @ts-ignore
    const provider = new ethers.providers.web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const sf = await Framework.create({
        chainId:80001,
        provider
    });

    const fDAIx = await sf.loadSuperToken("fDAIx");

    try {

        const revokeSubscription = fDAIx.revokeSubscription({
            indexId: indexId,
            publisher: publisher,
          });   

          console.log('revoking your subscription...');

          await revokeSubscription.exec(signer);

          console.log(
            `Your subscription has been revoked!
             Network: Mumbai
             Super Token: fDAIx
          `
          );

    }
    catch(err) {
        console.error(err);
    }

}


export async function approveSubscription(indexId: string, publisher: string) {
        // @ts-ignore
        const provider = new ethers.providers.web3Provider(window.ethereum);
        const signer = provider.getSigner();
    
        const sf = await Framework.create({
            chainId:80001,
            provider
        });
    
        const fDAIx = await sf.loadSuperToken("fDAIx");
    
        try {
    
            const revokeSubscription = fDAIx.approveSubscription({
                indexId: indexId,
                publisher: publisher,
              });   
    
              console.log('approving your subscription...');
    
              await revokeSubscription.exec(signer);
    
              console.log(
                `Your subscription has been approved!
                 Network: Mumbai
                 Super Token: fDAIx
              `
              );
    
        }
        catch(err) {
            console.error(err);
        }
};

const { createClient } = require("@urql/core");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());

const permissionQuery = ` 
query permission ($id: ID!) {
    flowOperators(where: {sender_: {id: $id}}) {
      permissions
      flowOperator
    }
  }

`

const totalIndexQuery = `
query totalIndex ($id: ID!) {
    indexes(where: {publisher: $id}) {
      indexId
      totalUnits
      totalAmountDistributedUntilUpdatedAt
    }
  }
`;

const singleIndexQuery = `
query ($id: ID!) {
  index(id: $id) {
    indexId
    totalSubscriptionsWithUnits
    totalUnits
    totalUnitsApproved
    totalUnitsPending
    subscriptions {
      subscriber {
        id
        subscriptions(where: {index_: {id: $id}}) {
          approved
          units
        }
      }
    }
  }
}
`;

const streamSendQuery = `
query streamSendQuery($sender: ID = "") {
  streams(where: {sender: $sender}) {
    currentFlowRate
    receiver {
      id
      accountTokenSnapshots {
        totalAmountStreamedInUntilUpdatedAt
      }
    }
    createdAtTimestamp
  }
}
`;

const streamReceivedQuery = `
query ($receiver: ID) {
  streams(where: {receiver: $receiver}) {
    currentFlowRate
    receiver {
      id
      accountTokenSnapshots {
        totalAmountStreamedInUntilUpdatedAt
      }
      createdAtTimestamp
    }
    sender {
      id
    }
  }
}
`

const subscriptionQuery = `
query subscription($id: ID!) {
  indexSubscriptions(where: {subscriber_: {id: $id}}) {
    id
    approved
    units
    index {
      indexId
      publisher {
        id
      }
    }
  }
}
`;

const client = createClient({
    url:'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-mumbai'
});


app.get('/permissions/:address', async (req, res, next) => {
    const { address } = req.params;

    const result = await client.query(permissionQuery, {"id": address}).toPromise();

    res.json(result.data.flowOperators);
});

app.get('/totalindex/:address', async (req, res, next) => {
    const { address } = req.params;

    const result = await client.query(totalIndexQuery, {"id": address}).toPromise();

    res.json(result.data.indexes)
});

app.get('/index/:id', async(req, res, next) => {
    // { "id": "0x5e97bbfb258fbb110231c4f01c693ef6ba9553a6-0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f-432" }
    const { id } = req.params;

    const result = await client.query(singleIndexQuery, {"id": id}).toPromise();

    res.json(result?.data);
});


app.get('/subscriptions/:id', async(req, res, next) => {

  const { id } = req.params;

  const result = await client.query(subscriptionQuery, {"id": id}).toPromise();


  res.json(result?.data?.indexSubscriptions);
});

app.get('/streams/:sender', async (req, res, next) => {

  const { sender } = req.params;

  const result1 = await client.query(streamSendQuery, {"sender": sender}).toPromise();
  const result2 = await client.query(streamReceivedQuery, {"receiver": sender}).toPromise();

  console.log(result1.data);
  
  res.json({outgoing: result1.data.streams, incoming: result2.data.streams});
});

app.get('/automationPermission/:sender', async(req, res, next) => {

  const automationPermissionQuery = `
  query MyQuery($flowOperator: Bytes = "", $sender: String = "") {
    flowOperators(where: {sender: $sender, flowOperator: $flowOperator}) {
      permissions
    }
  }
  `
  let flowOperator = "0xF18825d412C061aEfEFB4dF46a1c077636dA50bf";
  flowOperator = flowOperator.toLowerCase();
  const { sender } = req.params;

  const result = await client.query(automationPermissionQuery, {"flowOperator": flowOperator, "sender": sender}).toPromise(); 

  res.json(result.data);

});

app.listen(8080, console.log("Listening on port 8080"));
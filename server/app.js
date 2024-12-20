const { gql, createClient } = require("@urql/core");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/permissions/:address", async (req, res) => {
  const permissionQuery = ` 
    query permission ($id: ID!) {
    flowOperators(where: {sender_: {id: $id}}) {
      permissions
      flowOperator
    }
  }

  `;

  const client = createClient({
    url: "https://eth-sepolia.subgraph.x.superfluid.dev/",
  });

  const { address } = req.params;

  const result = await client.query(permissionQuery, { id: address }).toPromise();

  res.json(result.data.flowOperators);
});

app.get("/totalindex/:address", async (req, res, next) => {
  const totalIndexQuery = `
    query totalIndex ($id: ID!) {
    indexes(where: {publisher: $id}) {
      indexId
      totalUnits
      totalAmountDistributedUntilUpdatedAt
    }
  }
  `;

  const client = createClient({
    url: "https://eth-sepolia.subgraph.x.superfluid.dev/",
  });

  const { address } = req.params;

  const result = await client.query(totalIndexQuery, { id: address }).toPromise();

  res.json(result.data.indexes);
});

app.get("/index/:id", async (req, res, next) => {
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

  const client = createClient({
    url: "https://eth-sepolia.subgraph.x.superfluid.dev/",
  });

  // { "id": "0x5e97bbfb258fbb110231c4f01c693ef6ba9553a6-0x30a6933Ca9230361972E413a15dC8114c952414e-432" }
  const { id } = req.params;

  const result = await client.query(singleIndexQuery, { id: id }).toPromise();

  res.json(result?.data);
});

app.get("/subscriptions/:id", async (req, res, next) => {
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
    url: "https://eth-sepolia.subgraph.x.superfluid.dev/",
  });

  const { id } = req.params;

  const result = await client.query(subscriptionQuery, { id: id }).toPromise();

  res.json(result?.data?.indexSubscriptions);
});

app.get("/streams/:sender", async (req, res, next) => {
  const streamSendQuery = gql`
    query streamSendQuery($sender: ID = "") {
      streams(where: { sender: $sender }) {
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

  const streamReceivedQuery = gql`
    query ($receiver: ID) {
      streams(where: { receiver: $receiver }) {
        currentFlowRate
        receiver {
          id
        }
        sender {
          id
        }
        createdAtTimestamp
        streamedUntilUpdatedAt
      }
    }
  `;

  const client = createClient({
    url: "https://eth-sepolia.subgraph.x.superfluid.dev/",
  });
  const { sender } = req.params;

  const result1 = await client.query(streamSendQuery, { sender: sender }).toPromise();

  const result2 = await client.query(streamReceivedQuery, { receiver: sender }).toPromise();

  res.json({ outgoing: result1.data.streams, incoming: result2.data.streams });
});

app.get("/automationPermission/:sender", async (req, res, next) => {
  const automationPermissionQuery = `
    query MyQuery($flowOperator: Bytes = "", $sender: String = "") {
    flowOperators(where: {sender: $sender, flowOperator: $flowOperator}) {
    permissions
  }
}
`;

  const client = createClient({
    url: "https://eth-sepolia.subgraph.x.superfluid.dev/",
  });

  let flowOperator = "0xF18825d412C061aEfEFB4dF46a1c077636dA50bf";

  flowOperator = flowOperator.toLowerCase();

  const { sender } = req.params;

  const result = await client
    .query(automationPermissionQuery, {
      flowOperator: flowOperator,
      sender: sender,
    })
    .toPromise();

  res.json(result.data);
});

app.listen(8080, console.log("Listening on port 8080"));

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

app.listen(8080, console.log("Listening on port 8080"));
const { gql, createClient } = require("@urql/core");
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
query ($id: ID!) {
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
      indexValue
      totalAmountDistributedUntilUpdatedAt
      totalSubscriptionsWithUnits
      totalUnits
      totalUnitsApproved
      totalUnitsPending
    }
  }
`;

const client = createClient({
    url:'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-mumbai'
});


app.get('/permissions/:address', async (req, res, next) => {
    const { address } = req.params;
    console.log('address',  address);

    const result = await client.query(permissionQuery, {"id": address}).toPromise();

    res.json(result.data.flowOperators);
});

app.get('/index/:id', async(req, res, next) => {
    // { "id": "0x5e97bbfb258fbb110231c4f01c693ef6ba9553a6-0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f-432" }
});

app.listen(8080, console.log("Listening on port 8080"));
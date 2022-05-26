const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@amazon.38elh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const toolsCollection = client.db("futureTools").collection("handTools");
    const reviewCollection = client.db("futureTools").collection("review");

    //Get tools
    app.get("/tools", async (req, res) => {
      const query = {};
      const cursor = toolsCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });
    //Get tool
    app.get("/tool/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await toolsCollection.findOne(query);
      res.send(result);
    });
    // Post tool
    app.post("/tool", async (req, res) => {
      const newTool = req.body;
      console.log("Adding new product", newTool);
      const result = await toolsCollection.insertOne(newTool);
      res.send(result);
    });

    //Delete tool
    app.delete("/tool/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await toolsCollection.deleteOne(query);
      res.send(result);
    });
    // Post review
    app.post("/review", async (req, res) => {
      const newReview = req.body;
      console.log("Adding new review", newReview);
      const result = await reviewCollection.insertOne(newReview);
      res.send(result);
    });
    //Get reviews
    app.get("/reviews", async (req, res) => {
      const query = {};
      const cursor = reviewCollection.find(query);
      const reviews = await cursor.toArray();
      res.send(reviews);
    });

    //Get a login user
    app.get("/loginUser", async (req, res) => {
      const query = { emil: email };
      const cursor = toolsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Mongodb is Connected!!");
});

app.listen(port, () => {
  console.log("listening to port:", port);
});

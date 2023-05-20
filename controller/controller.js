const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const database = client.db("ept");
const collection = database.collection("config");

const getOneConfig = async (req, res, next) => {
    try {
        const document = await collection.findOne({});
        console.log(document)
        res.json(document);
      } catch (err) {
        console.error(`Something went wrong trying to find the documents: ${err}\n`);
      }
}

const getConfig = async (req, res, next) => {
    try {

        const count = await collection.count();
        const documents = await collection.find({'tec.unit': {$exists: true}}).toArray();
        console.log(`NUMBERS OF VALID DOCUMENTS : ${documents.length}/${count}`);
        documents.forEach(config => {
            const units = config.tec.unit
            console.log(units)
        })
        res.json(documents);
      } catch (err) {
        console.error(`Something went wrong trying to find the documents: ${err}\n`);
      }
}

const ping = async (req, res, next) => {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
}

exports.ping = ping;
exports.getOneConfig = getOneConfig;
exports.getConfig = getConfig;

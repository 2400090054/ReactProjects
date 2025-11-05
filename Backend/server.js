import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection details
const url = "mongodb+srv://admin:admin@cluster0.4z4zaz5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "erp";

// Reuse a single MongoClient connection for all requests
const client = new MongoClient(url);

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
}

// Test route
app.get("/", (req, res) => {
  res.status(200).json("Hello World from Express JS");
});

// SIGNUP route
app.post("/signup", async (req, res) => {
  try {
    const db = client.db(dbName);
    const usersCollection = db.collection("users");

    // Log data received
    console.log("📦 Signup data:", req.body);

    // Insert into MongoDB
    const result = await usersCollection.insertOne(req.body);

    console.log("✅ User inserted with ID:", result.insertedId);
    res.status(200).json("Registered Successfully");
  } catch (err) {
    console.error("❌ Error inserting user:", err);
    res.status(500).json("Error registering user");
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, async () => {
  await connectDB(); // connect once on startup
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
 //LOGIN OPERATION
app.post("/login", async (req, res)=>{
    try
    {
        await client.connect(); //Establish connection with MongoDB
        const db = client.db(dbName); //Connecting wit the DB

        const user = await db.collection("users").findOne({email: req.body.email, password: req.body.password});
        if(!user)
            return res.status(200).json("301::Invalid Credentials!");

        res.status(200).json("300::Login Success");
    }catch(err)
    {
        console.log(err);
    }finally
    {
        await client.close(); // Close the Connection
    }
});


import express from "express";
import { client } from "@repo/db/client"
const app = express();
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("Hi there")
})

app.post("/signup", async (req, res) => {
    const { username, password } = req.body || {};

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    try {
        const user = await client.user.create({
            data: { username, password }
        });
        res.json({ message: "Signup successful", id: user.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(3002);

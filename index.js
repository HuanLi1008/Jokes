import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3001;
const API_URL = "https://v2.jokeapi.dev/joke/";

const config = {Params:{format:"json", lang:"en"}, };
//available categories: Any, Misc, Programming, Dark, Pun, Spooky, Christmas
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) =>{
    try{
        const result = await axios.get(API_URL + "Any", config);
        res.render("index.ejs", {data: result.data});
    }catch(error){
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
        error: error.message,
        });
    }
});

app.post("/", async (req, res) =>{
    try {
        
        const result = await axios.get(API_URL + req.body.type);
        res.render("index.ejs", {data: result.data});
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
        error: error.message,
        });
    }
    
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
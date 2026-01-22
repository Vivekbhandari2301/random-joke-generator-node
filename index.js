import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://sv443.net/jokeapi/v2/joke/Any"
    );

    const jokeData = response.data;
    let jokeText = "";

    if (jokeData.type === "single") {
      jokeText = jokeData.joke;
    } else {
      jokeText = `${jokeData.setup} — ${jokeData.delivery}`;
    }

   res.render("index.ejs", {
  joke: jokeText,
  error: null
});

  

  } catch (error) {
    res.render("index.ejs", {
      joke: null,
      error: "Failed to load joke"
    });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

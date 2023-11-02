// HINTS:
// 1. Import express and axios
import express from "express";
import axios from "axios";

// 2. Create an express app and set the port number.
const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// dictionary of authors/people and quotes
const relevantQuotes = { "Karl Schmidt" : "Every sunset is also a sunrise. It all depends on where you stand.",
                         "Ralph Waldo Emerson" : "Every sunset brings the promise of a new dawn.",
                         "Frank Peretti" : "You want proof there’s a God? Look outside, watch a sunset.",
                         "Mahatma Gandhi" : "When I admire the wonders of the sunset or the beauty of the moon, my soul expands in the worship of the creator.",
                        "From The Great Spirit Prayer (Lakota)":"...Let me walk in beauty, and make my eyes ever hold the red and purple sunset...",
                        "Louie Giglio" : "God is always seeking you. Every sunset. Every clear blue sky. Each ocean wave. The starry hosts of night. He blankets each new day with the invitation, 'I am here'."};

// Array of arrays of [photographer, photographer link on unsplash. photographer's photo link on unsplash]
const relevantImages = [ 
                          ["Igor Kasalovic", "https://unsplash.com/@ikasalovic?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash", "https://unsplash.com/photos/view-of-seashore-sunset-tNDvFkxkBHo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"]
                       ];


const errorCodes = {}

// Use the public folder for static files.
app.use(express.static("public"));


// returns X, a random key-value (author-quote) pair from the entries (key-value pair array) obtained from original dictionary
// From X = [key, value], key can be obtained as X[0] and value as X[1]
function getRandomQuote(obj) {
    var entries = Object.entries(obj);
    return entries[entries.length * Math.random() << 0]; // shift operator << 0 does same as Math.floor(x)
}

// returns X, radomly selected array specifying [photographer, photographer link on unsplash. photographer's photo link on unsplash]
function getRandomImage(array) {
  return array[array.length * Math.random() << 0]; // shift operator << 0 does same as Math.floor(x)
}

app.get("/", async (req, res) => {

    try {
        const result = await axios.get("https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400");

        

        console.log(getRandomQuote(relevantQuotes));
        console.log(getRandomQuote(relevantImages));

        res.render("index.ejs", { dynamicHeading: getRandomQuote(relevantQuotes),
                                  content: JSON.stringify(result.data.results), 
                                  imageInfo: getRandomImage(relevantImages)
                                });
      } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
      }
  });
  
// Listen on your predefined port and start the server.
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
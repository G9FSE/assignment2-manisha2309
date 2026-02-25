const axios = require("axios");
const args = process.argv;
const typeIndex = args.indexOf("--type");
const type = typeIndex !== -1 ? args[typeIndex + 1] : null;

if (!type) {
  console.log("❌ Please provide movie type.");
  console.log('Usage: node index.js --type "popular"');
  process.exit(1);
}

const API_KEY = "a2a364e3fb0ff8f7e4608b7a0a35f8a3";
const BASE_URL = "https://api.themoviedb.org/3/movie/";

function getEndpoint(type) {
  switch (type) {
    case "popular":
      return "popular";
    case "playing":
      return "now_playing";
    case "top":
      return "top_rated";
    case "upcoming":
      return "upcoming";
    default:
      return null;
  }
}

const endpoint = getEndpoint(type);

if (!endpoint) {
  console.log("❌ Invalid type!");
  console.log("Valid types: popular, playing, top, upcoming");
  process.exit(1);
}

const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}`;

axios.get(url)
  .then(response => {
    const movies = response.data.results;

    console.log(`\n🎬 Showing ${type} movies:\n`);

    movies.slice(0, 10).forEach((movie, index) => {
      console.log(`${index + 1}. ${movie.title}`);
    });
  })
  .catch(error => {
    console.log("❌ Error fetching data.");
    console.log(error.message);
  });
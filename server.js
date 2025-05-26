// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(express.json());
// const API_KEY = "fsq3X9eAVnOch0zS1/Uj2S/KJR2pSXEpAK2QR4bhBO7HeA8="; // Replace with your API key
// // const foursquareAPI = "https://api.foursquare.com/v3/places/search";
// app.get("/restaurants", async (req, res) => {
//   const { latitude, longitude, budget } = req.query;

//   try {
//     const response = await axios.get(
//       `https://api.foursquare.com/v3/places/search`,
//       {
//         params: {
//           apikey: API_KEY,
//           radius: 5000,
//           lon: longitude,
//           lat: latitude,
//           kinds: "restaurants",
//         },
//       }
//     );

//     const data = response.data.features.map((restaurant) => ({
//       name: restaurant.properties.name || "Unknown",
//       description: restaurant.properties.kinds || "No description available",
//       location: {
//         lat: restaurant.geometry.coordinates[1],
//         lng: restaurant.geometry.coordinates[0],
//       },
//     }));

//     res.json(data);
//   } catch (error) {
//     console.error("Error fetching restaurant data:", error);
//     res.status(500).send("Failed to fetch restaurant data");
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());

// // API Endpoint to fetch restaurants
// app.get("/restaurants", async (req, res) => {
//   const { latitude, longitude, budget } = req.query;

//   // Foursquare API setup
//   const foursquareAPI = "https://api.foursquare.com/v3/places/search";
//   const headers = {
//     Accept: "application/json",
//     Authorization: process.env.FOURSQUARE_API_KEY, // Foursquare API Key from .env
//   };

//   try {
//     const response = await axios.get(foursquareAPI, {
//       headers,
//       params: {
//         ll: `${latitude},${longitude}`, // Latitude and Longitude
//         query: "restaurant",           // Filter by restaurants
//         radius: 5000,                  // 5km radius
//         sort: "distance",              // Closest restaurants first
//         price: budget,                 // Filter by budget level (1-4)
//         limit: 10,                     // Limit to 10 results
//       },
//     });

//     res.json(response.data.results);
//   } catch (error) {
//     console.error("Error fetching restaurants:", error.message);
//     res.status(500).json({ error: "Failed to fetch restaurant data" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });



// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());

// // API Endpoint to fetch restaurants
// app.get("/restaurants", async (req, res) => {
//   const { latitude, longitude, budget } = req.query;

//   // Foursquare API setup
//   const foursquareAPI = "https://api.foursquare.com/v3/places/search";
//   const headers = {
//     Accept: "application/json",
//     Authorization: process.env.FOURSQUARE_API_KEY, // Foursquare API Key from .env
//   };

//   try {
//     const response = await axios.get(foursquareAPI, {
//       headers,
//       params: {
//         ll: `${latitude},${longitude}`, // Latitude and Longitude
//         query: "restaurant",           // Filter by restaurants
//         radius: 5000,                  // 5km radius
//         sort: "distance",              // Closest restaurants first
//         price: budget,                 // Filter by budget level (1-4)
//         limit: 10,                     // Limit to 10 results
//       },
//     });

//     res.json(response.data.results);
//   } catch (error) {
//     console.error("Error fetching restaurants:", error.message);
//     res.status(500).json({ error: "Failed to fetch restaurant data" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });




// const axios = require('axios');
// const express = require('express');
// const app = express();

// const FOURSQUARE_API_URL = 'https://api.foursquare.com/v2/venues/';
// const CLIENT_ID = '3ANPK15AFSEPSSSXMX0OEOYJBNU0DV0K1A5BSN2JMA2YQRNB';
// const CLIENT_SECRET = '431J0H3H3AZWZFUIQPHIVL30IQ234MD04RK5O3KCONAUT12X';
// const API_VERSION = '20250101';  // Use the current API version

// app.get('/restaurants', async (req, res) => {
//   const { latitude, longitude, budget } = req.query;
  
//   try {
//     const response = await axios.get('https://api.foursquare.com/v2/venues/explore', {
//       params: {
//         ll: `${latitude},${longitude}`,
//         client_id: CLIENT_ID,
//         client_secret: CLIENT_SECRET,
//         v: API_VERSION,
//         radius: 5000, // Adjust as needed
//         limit: 10, // Adjust as needed
//         categoryId: '4d4b7105d754a06374d81259', // Food & Drink category ID
//       },
//     });
    
//     const restaurants = await Promise.all(response.data.response.groups[0].items.map(async (item) => {
//       const venueId = item.venue.id;
      
//       // Fetching photos for each restaurant
//       const photosResponse = await axios.get(`${FOURSQUARE_API_URL}${venueId}/photos`, {
//         params: {
//           client_id: CLIENT_ID,
//           client_secret: CLIENT_SECRET,
//           v: API_VERSION,
//         },
//       });

//       // Extracting the first photo URL (you can choose another one or handle multiple)
//       const photo = photosResponse.data.response.photos.items[0]
//         ? `${photo.prefix}500x500${photo.suffix}`
//         : 'https://via.placeholder.com/500x500.png';  // Default if no photos

//       return {
//         name: item.venue.name,
//         location: item.venue.location,
//         photos: photo,
//         geocodes: item.venue.location,
//       };
//     }));

//     res.json(restaurants);  // Send the restaurant data with images to the frontend
//   } catch (error) {
//     // console.error(error);
//     res.status(500).json({ error: 'Failed to fetch restaurant data.' });
//   }
// });

// app.listen(5000, () => {
//   console.log('Server running on http://localhost:5000');
// });



// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 8000;

// app.use(cors());

// // API Endpoint to fetch restaurants
// app.get("/restaurants", async (req, res) => {
//   const { latitude, longitude, budget } = req.query;

//   // Foursquare API setup
//   const foursquareAPI = "https://api.foursquare.com/v3/places/search";
//   const foursquarePhotoAPI = (venueId) =>
//     `https://api.foursquare.com/v3/places/${venueId}/photos`;

//   const headers = {
//     Accept: "application/json",
//     Authorization: process.env.FOURSQUARE_API_KEY, // Foursquare API Key from .env
//   };

//   try {
//     // Fetch the list of restaurants
//     const response = await axios.get(foursquareAPI, {
//       headers,
//       params: {
//         ll: `${latitude},${longitude}`, // Latitude and Longitude
//         query: "restaurant", // Filter by restaurants
//         radius: 5000, // 5km radius
//         sort: "distance", // Closest restaurants first
//         price: budget, // Filter by budget level (1-4)
//         limit: 10, // Limit to 10 results
//       },
//     });

//     const restaurants = response.data.results;

//     // Fetch photos for each restaurant
//     const restaurantData = await Promise.all(
//       restaurants.map(async (restaurant) => {
//         try {
//           const photoResponse = await axios.get(
//             foursquarePhotoAPI(restaurant.fsq_id),
//             { headers }
//           );
//           const photos = photoResponse.data;

//           // Get the first photo URL if available
//           const photoUrl =
//             photos.length > 0
//               ? `${photos[0].prefix}original${photos[0].suffix}`
//               : "https://via.placeholder.com/250x150.png?text=No+Image"; // Placeholder if no image available

//           return {
//                 id: restaurant.fsq_id,
//                 name: restaurant.name,
//                 location: restaurant.location,
//                 photo: photoUrl,
//                 geocodes: restaurant.geocodes,
//             }
//           }
//          catch (error) {
//           console.error(
//             `Error fetching photo for restaurant ${restaurant.fsq_id}:`,
//             error.message
//           );
//           return { ...restaurant, photo: "https://via.placeholder.com/250" }; // Fallback to placeholder
//         }
//       })
//     );

//     res.json(restaurantData);
//   } catch (error) {
//     console.error("Error fetching restaurants:", error.message);
//     res.status(500).json({ error: "Failed to fetch restaurant data" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });



const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());

// API Endpoint to fetch restaurants
app.get("/restaurants", async (req, res) => {
  const { latitude, longitude, budget } = req.query;

  // Foursquare API setup
  const foursquareAPI = "https://api.foursquare.com/v3/places/search";
  const foursquarePhotoAPI = (venueId) =>
    `https://api.foursquare.com/v3/places/${venueId}/photos`;

  const headers = {
    Accept: "application/json",
    Authorization: process.env.FOURSQUARE_API_KEY, // Foursquare API Key from .env
  };

  try {
    // Fetch the list of restaurants
    const response = await axios.get(foursquareAPI, {
      headers,
      params: {
        ll: `${latitude},${longitude}`, // Latitude and Longitude
        query: "restaurant", // Filter by restaurants
        radius: 5000, // 5km radius
        sort: "distance", // Closest restaurants first
        price: budget, // Filter by budget level (1-4)
        limit: 10, // Limit to 10 results
      },
    });

    const restaurants = response.data.results;

    // Fetch photos for each restaurant
    const restaurantData = await Promise.all(
      restaurants.map(async (restaurant) => {
        try {
          const photoResponse = await axios.get(
            foursquarePhotoAPI(restaurant.fsq_id),
            { headers }
          );
          const photos = photoResponse.data;

          // Include restaurant only if a photo is available
          if (photos.length > 0) {
            const photoUrl = `${photos[0].prefix}original${photos[0].suffix}`;
            return {
              id: restaurant.fsq_id,
              name: restaurant.name,
              location: restaurant.location,
              photo: photoUrl,
              geocodes: restaurant.geocodes,
            };
          }
          return null; // Exclude restaurant without photos
        } catch (error) {
          console.error(
            `Error fetching photo for restaurant ${restaurant.fsq_id}:`,
            error.message
          );
          return null; // Exclude restaurant on photo fetch error
        }
      })
    );

    // Filter out null values (restaurants without photos)
    const filteredData = restaurantData.filter((item) => item !== null);

    res.json(filteredData);
  } catch (error) {
    console.error("Error fetching restaurants:", error.message);
    res.status(500).json({ error: "Failed to fetch restaurant data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



// const express = require('express');
// const axios = require('axios');
// const app = express();
// const PORT = 5000;

// // Replace with your venue API details
// const VENUE_API_URL = 'https://api.foursquare.com/v2/venues/';
// const VENUE_API_KEY = 'fsq3X9eAVnOch0zS1/Uj2S/KJR2pSXEpAK2QR4bhBO7HeA8=';

// app.get('/api/restaurants', async (req, res) => {
//   const { location, budget } = req.query;

//   try {
//     const response = await axios.get(VENUE_API_URL, {
//       params: { location, budget },
//       headers: { Authorization: `Bearer ${VENUE_API_KEY}` },
//     });

//     res.json(response.data.restaurants);
//   } catch (error) {
//     console.error('Error fetching restaurants:', error.message);
//     res.status(500).json({ error: 'Failed to fetch restaurants' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

import express from 'express';
import distance from './utils/calculateDistance.js';

const app = express();

app.use(express.json());

// last coordinates of train 1
const train1 = {
  lat: 0,
  lon: 0,
};

// last coordinates of train 2
const train2 = {
  lat: 0,
  lon: 0,
};

app.post('/', (req, res) => {
  // get data from request body
  const { lat, lon, id } = req.body;

  // variables needed for distance function
  let lat1, lat2, lon1, lon2;

  if (id == 1) {
    // if request from train 1
    // assign coordinates
    lat1 = lat;
    lon1 = lon;
    lat2 = train2.lat;
    lon2 = train2.lon;

    // update train 1 last coordinates
    train1.lat = lat;
    train1.lon = lon;
  } else if (id == 2) {
    // if request from train 2
    // assign coordinates
    lat1 = train1.lat;
    lon1 = train1.lon;
    lat2 = lat;
    lon2 = lon;

    // update train 2 last coordinates
    train2.lat = lat;
    train2.lon = lon;
  } else {
    res.json('wrong ID');
  }

  if (id == 1 || id == 2) {
    console.log(train1, train2);

    // calculate distance between trains
    const result = distance(lat1, lat2, lon1, lon2);

    // return response
    res.json({
      distance: result * 1000,
      unit: 'meter',
    });
  }
});

app.get('/', (req,res) => {
  res.send("Server is running peacefully");
}
);
app.listen(8000, () => {
  console.log('app listening on port 8000...');
});


// to-do
// install socket.io
// save last coordinates in json file
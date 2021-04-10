const mongoose = require("mongoose"),
  Campground = require("../models/campground"),
  cities = require("./cities"),
  { places, descriptors } = require("./seedHelpers");

var data = [
  {
    name: "Ain Tmouchent",
    image:
      "https://images.pexels.com/photos/1414221/pexels-photo-1414221.jpeg?auto=compress&cs=tinysrgb&h=350",
    description:
      "Ain Tmouchent is a beautifull place to visit it has a lot of nice beaches",
  },
  {
    name: "Tikjda",
    image:
      "https://lecourrier-dalgerie.com/wp-content/uploads/2018/08/Tikjda-620x330.jpg",
    description:
      "Tikjda is a beautifull place to visit it has a lot of nice beaches",
  },
  {
    name: "Mountains of tikjda",
    image:
      "https://i.pinimg.com/originals/52/ff/36/52ff36d7179188795f584aedb3f3e08c.jpg",
    description:
      "The Mountains are  beautifull place in tikjdda to visit it has a lot of nice beaches",
  },
  {
    name: "Canstantine",
    image:
      "https://www.gannett-cdn.com/-mm-/615eb9b3dda3f2daf3ceb045278d833fb7918d51/c=0-286-5616-3459/local/-/media/2017/07/18/WIGroup/Milwaukee/636359756074681331-IMG-1848.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp",
    description:
      "The Mountains are  beautifull place in tikjdda to visit it has a lot of nice beaches",
  },
  {
    name: "Chriaa",
    image: "https://farm9.staticflickr.com/8605/16573646931_22fc928bf9_o.jpg",
    description:
      "The Mountains are  beautifull place in tikjdda to visit it has a lot of nice beaches",
  },
  {
    name: "Chriaa",
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/16/73/1b/cf/auberge-la-rose-des-neiges.jpg",
    description:
      "The Mountains are  beautifull place in tikjdda to visit it has a lot of nice beaches",
  },

  {
    name: "Tlemcen",
    image:
      "https://i.pinimg.com/originals/56/96/ce/5696ce1419f23975910c876a7996b431.jpg",
    description:
      "Tlemcen is a beautifull place to visit it has a lot of nice beaches",
  },
];
mongoose.connect("mongodb://localhost:27017/yelpCamp_V11", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error !!"));
db.once("open", () => {
  console.log("Connected to Database");
});
const sample = (array) => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
  await Campground.deleteMany({});
  console.log("cities:" + cities.length);
  for (let i = 0; i < 500; i++) {
    const random = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "606c52e80f535b8a2cfe2633",
      location: `${cities[random].city},${cities[random].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      // image: "https://source.unsplash.com/collection/10528853",
      images: [
        {
          url:
            "https://res.cloudinary.com/mustaphaaziz/image/upload/v1617691904/Tahwissa/iwmj3qy9rrcpub8nspfm.jpg",
          filename: "Tahwissa/iwmj3qy9rrcpub8nspfm",
        },
        {
          url:
            "https://res.cloudinary.com/mustaphaaziz/image/upload/v1617691904/Tahwissa/kggs8ivsi4lhbpbkn6es.jpg",
          filename: "Tahwissa/kggs8ivsi4lhbpbkn6es",
        },
      ],
      geometry: {
        type: "Point",
        coordinates: [cities[random].longitude, cities[random].latitude],
      },
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit dolorem assumenda dignissimos exercitationem, deserunt praesentium eos nostrum iure tempore aperiam atque a nemo facilis reprehenderit inventore. Dolore cum nobis hic?",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});

// module.exports = seeDB;

const mongoose = require('mongoose');
const Beach = require('../models/beach');

mongoose.connect('mongodb://localhost:27017/hawaii-beaches', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB...')
  })
  .catch((err) => {
    console.log(err)
  });

//beaches seed
const seedBeaches = [
  {
    owner: '6227c3244b715ad7502b1034',
    title: 'Sunset Beach',
    description: 'One of the three world-renown surfing beaches on the North Shore (Banzai and Waimea are the other two), Sunset Beach stretches two miles from Sunset point to Ehukai beach. It’s an excellent spot to pull up a chair and watch surfers during the winter.',
    location: 'Pupukea, Hawaii',
    image: {
      url: 'https://www.best-of-oahu.com/images/Sunset-Beach-Oahu-2.jpg',
      filename: 'HawaiiBeaches/default'
    },
    geometry: {
      type: "Point",
      coordinates: [-158.045456, 21.667009]
  },
  },
  {
    owner: '6227c3244b715ad7502b1034',
    title: 'Ehukai Beach',
    description: 'Besides the beautiful beige, wide-sandy beach, Banzai offers surfing spectators one of the most unique waves in the world, the infamous Banzai Pipeline, known for the way the waves break over a sharp and shallow reef into massive tubes (winter season).',
    location: 'Pupukea, Hawaii',
    image: {
      url: 'https://mapio.net/images-p/44484605.jpg',
      filename: 'HawaiiBeaches/default'
    },
    geometry: {
      type: "Point",
      coordinates: [-158.0508, 21.6650]
  },
  },
  {
    owner: '6227c3244b715ad7502b1034',
    title: 'Waimea Bay',
    description: 'Waimea Bay is large and horseshoe-shaped, perfect for a lazy summer afternoon of swimming and sunbathing. It was the birthplace of big wave surfing in Hawai‘i, and during the winter, the bay brings in waves that top 30 feet in height.',
    location: 'Waimea, Hawaii',
    image: {
      url: 'https://www.best-of-oahu.com/images/Waimea-Rock-Drone.jpeg',
      filename: 'HawaiiBeaches/default'
    },
    geometry: {
      type: "Point",
      coordinates: [-158.0671, 21.6415]
  },
  },
  {
    owner: '6227c3244b715ad7502b1034',
    title: 'Haleiwa Beach',
    description: 'Haleiwa is one of the beaches with calmer waters on the north shore. Try here if the winter surf is too unsafe for swimming at other places along the northern coast. It’s also a great place to take a surf lesson.',
    location: 'Haleiwa, Hawaii',
    image: {
      url: 'https://www.hawaiianbeachrentals.com/images/products/beach/p31/p31_zoom_5241a8ce884c93.73686016.jpg',
      filename: 'HawaiiBeaches/default'
    },
    geometry: {
      type: "Point",
      coordinates: [-158.1034, 21.5928]
  },
  },
  {
    owner: '6227c3244b715ad7502b1034',
    title: 'Chuns Reef Beach',
    description: 'Less trafficked than Waimea or Haleiwa, Chun’s offers a glimpse of “everyday” surf culture – that is, daily surf life outside of the world-famous breaks – and an off-beat place to put your feet up. Its long stretch of white sand makes it good for walking, and a freshwater pond is the perfect place for families with small children.',
    location: 'Haleiwa, Hawaii',
    image: {
      url: 'https://i.pinimg.com/736x/e0/0d/57/e00d57307ebf0cabc7b957552261f6d7--hawaii-vacation-vacation-rentals.jpg',
      filename: 'HawaiiBeaches/default'
    },
    geometry: {
      type: "Point",
      coordinates: [-158.0839, 21.6269]
  },
  },
  {
    owner: '6227c3244b715ad7502b1034',
    title: 'Turtle Bay Beach',
    description: 'These side by side bays are more protected from waves than other North Shore beaches, making them good for snorkeling and swimming year round, even when the surf is big at other places along the North Shore. Kewela Bay Beach Park offers plenty of shade and a thick forest ironwood trees to complement its crystal blue waters and fine white sand.',
    location: 'Kawela, Hawaii',
    image: {
      url: 'https://www.hawaiianbeachrentals.com/images/products/beach/p38/p38_zoom_52445626e2aaf1.97688871.jpg',
      filename: 'HawaiiBeaches/default'
    },
    geometry: {
      type: "Point",
      coordinates: [-157.9988, 21.7052]
  },
  },
  {
    owner: '6227c3244b715ad7502b1034',
    title: 'Lanikai Beach',
    description: 'Lanikai has been ranked amongst the best beaches in the world, and it’s easy to see why when you arrive. Powdery white sand, clear blue water, and a vantage point of two offshore islands, known locally as “the Mokes.” The water here is as calm as it gets.',
    location: 'Kailua, Hawaii',
    image: {
      url: 'https://oahuactivities.com/wp-content/uploads/2019/08/beautiful-beach-view.jpg',
      filename: 'HawaiiBeaches/default'
    },
    geometry: {
      type: "Point",
      coordinates: [-157.7151, 21.3925]
  },
  },
  {
    owner: '6227c3244b715ad7502b1034',
    title: 'Pupukea Beach',
    description: ' Pūpūkea Beach Park is home to “Shark’s Cove,” one of the best areas for snorkeling and diving during the summer. A large protected cove is idea for families and beginner swimmers. Outside the cove, lava tubes, reef walls, and wildlife attract snorkelers, free divers, and scuba divers.',
    location: 'Pupukea, Hawaii',
    image: {
      url: 'https://www.hawaiianbeachrentals.com/images/products/beach/p33/p33_zoom_524443d0bdaeb0.17508389.jpg',
      filename: 'HawaiiBeaches/default'
    },
    geometry: {
      type: "Point",
      coordinates: [-158.0593, 21.6543]
  },
  },
  {
    owner: '6227c3244b715ad7502b1034',
    title: 'Waimanalo Beach',
    description: 'Waimanalo Beach is one of the longest in Hawai‘i, offering several miles of white sand to walk. It’s not overly rough, but it does get mild waves along the shore, fun for active swimming. Popular with locals for fishing, barbecuing, and family hang outs.',
    location: 'Waimanalo Beach, Hawaii',
    image: {
      url: 'https://www.tripsavvy.com/thmb/X16YFMqxFx0yPY_tO3yEDCwhkBY=/4697x2642/smart/filters:no_upscale()/waimanalo-beach-hawaii-1198229474-b50eda3e6643447bb1903f049a300ccd.jpg',
      filename: 'HawaiiBeaches/default'
    },
    geometry: {
      type: "Point",
      coordinates: [-157.6871, 21.3308]
  },
  },
  {
    owner: '6227c3244b715ad7502b1034',
    title: 'Kailua Beach',
    description: 'Kailua Beach is similar to Waimanalo in that it is long, with fine white sand and reasonably calm waters. It has views of several offshore islands and has a lot of activities going on, including kayaking, kite surfing, wind surfing, fishing, and boating.',
    location: 'Kailua, Hawaii',
    image: {
      url: 'https://www.fodors.com/assets/destinations/710086/kailua-beach-park-honolulu-and-oahu-oahu-hawaii-usa_main.jpg',
      filename: 'HawaiiBeaches/default'
    },
    geometry: {
      type: "Point",
      coordinates: [-157.7389, 21.4054]
  },
  },
  {
    owner: '6227c3244b715ad7502b1034',
    title: 'Makapuu Beach',
    description: 'Backed by the tall cliffs of the Koʻolau Volcano, the surf is often large at Makapuʻu, attracting a youthful crowd of bodyboarders and beachgoers. You can see two islands off the coast, as well as the tall cliffs that support the Makapuʻu Lighthouse',
    location: 'Waimanalo Beach, Hawaii',
    image: {
      url: 'https://www.best-of-oahu.com/images/xMakapuu-Beach-Park.jpg.pagespeed.ic.yAa5py4HRR.jpg',
      filename: 'HawaiiBeaches/default'
    },
    geometry: {
      type: "Point",
      coordinates: [-157.6601, 21.3111]
  },
  },
  {
    owner: '6227c3244b715ad7502b1034',
    title: 'Kahana Bay Beach',
    description: ' Completely out of the way on the upper windwardside, Kahana remains a nice local hangout, boxed in by tall, jagged cliffs and a large, horseshoe bay. It’s not a great beach for swimming due to the runoff from the mountains, but it’s a good place to hang out, stand up paddleboard, or walk the trails opposite the beach.',
    location: 'Hauula, Hawaii',
    image: {
      url: 'https://i.pinimg.com/originals/a6/12/c4/a612c4288711aa1a5439d4b96eb12d72.jpg',
      filename: 'HawaiiBeaches/default'
    },
    geometry: {
      type: "Point",
      coordinates: [-157.8744, 21.5562]
  },
  },
  {
    owner: '6227c3244b715ad7502b1034',
    title: 'Malaekahana Beach',
    description: 'This state park is popular with locals for camping and fishing. Beaches here are small but swimming is good in summer.',
    location: 'Koolauloa, Hawaii',
    image: {
      url: 'https://campervanhawaii.com/uploads/malaekahana-5-1.jpeg',
      filename: 'HawaiiBeaches/default'
    },
    geometry: {
      type: "Point",
      coordinates: [-157.9394, 21.6706]
  },
  },
  {
    owner: '6227c3244b715ad7502b1034',
    title: 'Hanauma Bay',
    description: 'Great snorkeling! Sure, the beach is also nice for sunbathing, but Hanauma, with its entry fee and reef safety video (required for entrance), is all about exploring the underwater world.',
    location: 'Hanauma, Hawaii',
    image: {
      url: 'https://fh-sites.imgix.net/sites/1481/2017/03/19171111/hb1.jpg?auto=compress%2Cformat&w=700&h=700&fit=max',
      filename: 'HawaiiBeaches/default'
    },
    geometry: {
      type: "Point",
      coordinates: [-157.6938, 21.2690]
  },
  },
  {
    owner: '6227c3244b715ad7502b1034',
    title: 'Waikiki Beach',
    description: 'The iconic beach of Hawai‘i, with Diamond Head looming overhead. One of the most well-known beaches in the world and a legendary place to learn to surf.',
    location: 'Waikiki, Hawaii',
    image: {
      url: 'https://nypost.com/wp-content/uploads/sites/2/2019/04/waikiki-beach.jpg?quality=80&strip=all',
      filename: 'HawaiiBeaches/default'
    },
    geometry: {
      type: "Point",
      coordinates: [-157.8292, 21.2793]
  },
  },
  {
    owner: '6227c3244b715ad7502b1034',
    title: 'Magic Island Lagoon',
    description: 'Magic Island is a man-made peninsula with large seawalls and a shallow lagoon, the latter a nice place for small children to play.',
    location: 'Honolulu, Hawaii',
    image: {
      url: 'https://i.pinimg.com/originals/e7/9e/97/e79e978998d2d8fde487513e8a2fd50a.jpg',
      filename: 'HawaiiBeaches/default'
    },
    geometry: {
      type: "Point",
      coordinates: [-157.8469, 21.2830]
  },
  },
  {
    owner: '6227c3244b715ad7502b1034',
    title: 'Halona Beach Cove',
    description: 'Halona Beach Cove is one of the smallest beaches on O‘ahu, offering a cozy setting between two rock outcroppings. Swimming is possible on very calm days, but it’s mostly rocky, so not recommended. It can be easily reached via a short walk down from the Halona Blowhole overlook. The cove was made famous by the movie From Here to Eternity, filmed there in 1953.',
    location: 'Honolulu, Hawaii',
    image: {
      url: 'https://731634-2445618-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/Hawaii-Oahu-Windward-Coast-Halona-Beach-Cove-Swimming.jpg',
      filename: 'HawaiiBeaches/default'
    },
    geometry: {
      type: "Point",
      coordinates: [-157.6775, 21.2817]
  },
  },
  {
    owner: '6227c3244b715ad7502b1034',
    title: 'Sandy Beach',
    description: 'Just east of Halona Beach Cove is Sandy’s beach. Featuring a number of surf breaks and one of the largest shore breaks on the island, Sandy’s is a hub of activity and youth. Great for on-lookers, body boarders and surfers frequent this beach, so pull up a chair and hang out for a while. Check with the lifeguards before entering the water, as the conditions are often rough and dangerous.',
    location: 'Honolulu, Hawaii',
    image: {
      url: 'https://www.best-of-oahu.com/images/Sandy-Beach-Drone.jpg',
      filename: 'HawaiiBeaches/default'
    },
    geometry: {
      type: "Point",
      coordinates: [-157.6727, 21.2857]
  },
  },
  {
    owner: '6227c3244b715ad7502b1034',
    title: 'Diamond Head Beach',
    description: 'Diamond Head Beach requires a long walk down a steep cliff to reach, but it’s typically very relaxed and uncrowded, at least on the beach (the water can get crowded with surfers). There’s not great swimming here due to the rocks, but it’s a nice beach for a walk or to find a slice of sand.',
    location: 'Honolulu, Hawaii',
    image: {
      url: 'https://loveoahu.org/wp-content/uploads/diamond-head-1.jpg',
      filename: 'HawaiiBeaches/default'
    },
    geometry: {
      type: "Point",
      coordinates: [-157.8071, 21.2549]
  },
  },
  {
    owner: '6227c3244b715ad7502b1034',
    title: 'Ewa Beach',
    description: 'Ewa Beach is a long, narrow beach that covers most of the southwest coast of the island. Along it you will find a five-acre beach park (Ewa Beach) and a beginner surf break (White Plains). Families will love the green space, picnic areas, and residential vibe at Ewa Beach proper; surfers will enjoy the small, beginner-friendly waves at White Plains.',
    location: 'Ewa Beach, Hawaii',
    image: {
      url: 'https://www.speedishuttle.com/images/site/visit-ewabeach.jpg',
      filename: 'HawaiiBeaches/default'
    },
    geometry: {
      type: "Point",
      coordinates: [-158.0090, 21.3131]
  },
  },
  {
    owner: '6227c3244b715ad7502b1034',
    title: 'Depot Beach',
    description: 'Adjacent to Nanakuli, this long stretch of white sand is a local hangout for fishing and barbecuing.',
    location: 'Nanakuli, Hawaii',
    image: {
      url: 'https://loveoahu.org/wp-content/uploads/laniakea-turtle-beach-PBphotos.jpg',
      filename: 'HawaiiBeaches/default'
    },
    geometry: {
      type: "Point",
      coordinates: [-158.1466, 21.3819]
    },
  },
  {
    owner: '6227c3244b715ad7502b1034',
    title: 'Makaha Beach',
    description: 'If you’re looking for surf culture on the west side, check out Makaha, home to another world-renown break. It’s not recommended for all swimmers, as the undertow can get quite strong. But, it’s a great place to post up and watch the surf from shore.',
    location: 'Makaha, Hawaii',
    image: {
      url: 'https://media.istockphoto.com/photos/aerial-view-of-makaha-beach-on-oahu-hawaii-picture-id614621566?k=20&m=614621566&s=612x612&w=0&h=QvkxUw4AzZ3G-zVF2MJeU8dpzo8t1GI7w-D-7muQGCs=',
      filename: 'HawaiiBeaches/default'
    },
    geometry: {
      type: "Point",
      coordinates: [-158.2204, 21.4764]
    },
  },
  {
    owner: '6227c3244b715ad7502b1034',
    title: 'Keawaula Beach',
    description: 'A steep-sloped beach with turquoise waters, Yokohama, or “Yokes” as it is called by locals, is a great place to snorkel when it’s calm, thanks to big rocks along the ocean entrance. Locals like to barbecue here.',
    location: 'Waialua, Hawaii',
    image: {
      url: 'https://www.gohawaii.com/sites/default/files/styles/image_gallery_bg_xl/public/hero-unit-images/Oahu_WestSideYokohamaKeawaula.jpg?itok=c4xjgjyO',
      filename: 'HawaiiBeaches/default'
    },
    geometry: {
      type: "Point",
      coordinates: [-158.2420, 21.5488]
    },
  },
  {
    owner: '6227c3244b715ad7502b1034',
    title: 'Pokai Bay Beach',
    description: 'If you are searching for a beach where you can swim, snorkel, and be one of the only visitors, head out to Pokai Bay and enjoy this secluded shoreline. It is surrounded by a reef, so the waters are calm and children can go snorkeling.',
    location: 'Waianae, Hawaii',
    image: {
      url: 'https://alohalovely.com/wp-content/uploads/2016/11/pokai-IG-shot-beach-1024x575.jpg',
      filename: 'HawaiiBeaches/default'
    },
    geometry: {
      type: "Point",
      coordinates: [-158.1883, 21.4393]
    },
  },
  {
    owner: '6227c3244b715ad7502b1034',
    title: 'Bellows Field Beach',
    description: 'Well-known for its soft sand and beautiful scenery, Bellows Field Beach Park is mostly visited by body surfers. The breaks here are definitely smaller than on Sandy Beach, so the waters can be shallow, making it popular with families with young children.',
    location: 'Waimanalo, Hawaii',
    image: {
      url: 'https://static.toiimg.com/thumb/msid-44850862,width=1200,height=900/44850862.jpg',
      filename: 'HawaiiBeaches/default'
    },
    geometry: {
      type: "Point",
      coordinates: [-157.7090, 21.3575]
    },
  }
];

// seeds beaches function
const seedDB = async () => {
  await Beach.deleteMany({});
  await Beach.insertMany(seedBeaches);
}
seedDB();
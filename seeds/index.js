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

const seedBeaches = [
  {
  title: 'Sunset Beach',
  description: 'One of the three world-renown surfing beaches on the North Shore (Banzai and Waimea are the other two), Sunset Beach stretches two miles from Sunset point to Ehukai beach. It’s an excellent spot to pull up a chair and watch surfers during the winter.',
  location: 'Pupukea, Hawaii',
  latitude: 21.6742,
  longitude: 158.0402,
},
{
  title: 'Ehukai Beach',
  description: 'Besides the beautiful beige, wide-sandy beach, Banzai offers surfing spectators one of the most unique waves in the world, the infamous Banzai Pipeline, known for the way the waves break over a sharp and shallow reef into massive tubes (winter season).',
  location: 'Pupukea, Hawaii',
  latitude: 21.6415,
  longitude: 158.0508,
},
{
  title: 'Waimea Bay',
  description: 'Waimea Bay is large and horseshoe-shaped, perfect for a lazy summer afternoon of swimming and sunbathing. It was the birthplace of big wave surfing in Hawai‘i, and during the winter, the bay brings in waves that top 30 feet in height.',
  location: 'Waimea, Hawaii',
  latitude: 21.6742,
  longitude: 158.0671,
},
{
  title: 'Haleiwa Beach',
  description: 'Haleiwa is one of the beaches with calmer waters on the north shore. Try here if the winter surf is too unsafe for swimming at other places along the northern coast. It’s also a great place to take a surf lesson.',
  location: 'Haleiwa, Hawaii',
  latitude: 21.5986,
  longitude: 158.1032,
},
{
  title: 'Chuns Reef Beach',
  description: 'Less trafficked than Waimea or Haleiwa, Chun’s offers a glimpse of “everyday” surf culture – that is, daily surf life outside of the world-famous breaks – and an off-beat place to put your feet up. Its long stretch of white sand makes it good for walking, and a freshwater pond is the perfect place for families with small children.',
  location: 'Haleiwa, Hawaii',
  latitude: 21.6269,
  longitude: 158.0839,
},
{
  title: 'Turtle Bay Beach',
  description: 'These side by side bays are more protected from waves than other North Shore beaches, making them good for snorkeling and swimming year round, even when the surf is big at other places along the North Shore. Kewela Bay Beach Park offers plenty of shade and a thick forest ironwood trees to complement its crystal blue waters and fine white sand.',
  location: 'Kawela, Hawaii',
  latitude: 21.7023,
  longitude: 158.0000,
},
{
  title: 'Lanikai Beach',
  description: 'Lanikai has been ranked amongst the best beaches in the world, and it’s easy to see why when you arrive. Powdery white sand, clear blue water, and a vantage point of two offshore islands, known locally as “the Mokes.” The water here is as calm as it gets.',
  location: 'Kailua, Hawaii',
  latitude: 21.3925,
  longitude: 157.7151,
},
{
  title: 'Pupukea Beach',
  description: ' Pūpūkea Beach Park is home to “Shark’s Cove,” one of the best areas for snorkeling and diving during the summer. A large protected cove is idea for families and beginner swimmers. Outside the cove, lava tubes, reef walls, and wildlife attract snorkelers, free divers, and scuba divers.',
  location: 'Pupukea, Hawaii',
  latitude: 21.6525,
  longitude: 158.0620,
},
{
  title: 'Waimanalo Beach',
  description: 'Waimanalo Beach is one of the longest in Hawai‘i, offering several miles of white sand to walk. It’s not overly rough, but it does get mild waves along the shore, fun for active swimming. Popular with locals for fishing, barbecuing, and family hang outs.',
  location: 'Waimanalo Beach, Hawaii',
  latitude: 21.3322,
  longitude: 157.6956,
},
{
  title: 'Kailua Beach',
  description: 'Kailua Beach is similar to Waimanalo in that it is long, with fine white sand and reasonably calm waters. It has views of several offshore islands and has a lot of activities going on, including kayaking, kite surfing, wind surfing, fishing, and boating.',
  location: 'Kailua, Hawaii',
  latitude: 21.3974,
  longitude: 157.7272,
},
{
  title: 'Makapuu Beach',
  description: 'Backed by the tall cliffs of the Koʻolau Volcano, the surf is often large at Makapuʻu, attracting a youthful crowd of bodyboarders and beachgoers. You can see two islands off the coast, as well as the tall cliffs that support the Makapuʻu Lighthouse',
  location: 'Waimanalo Beach, Hawaii',
  latitude: 21.3111,
  longitude: 157.6601,
},
{
  title: 'Kahana Bay Beach',
  description: ' Completely out of the way on the upper windwardside, Kahana remains a nice local hangout, boxed in by tall, jagged cliffs and a large, horseshoe bay. It’s not a great beach for swimming due to the runoff from the mountains, but it’s a good place to hang out, stand up paddleboard, or walk the trails opposite the beach.',
  location: 'Hauula, Hawaii',
  latitude: 21.5562,
  longitude: 157.8744,
},
{
  title: 'Malaekahana Beach',
  description: 'This state park is popular with locals for camping and fishing. Beaches here are small but swimming is good in summer.',
  location: 'Koolauloa, Hawaii',
  latitude: 21.6706,
  longitude: 157.9394,
},
{
  title: 'Hanauma Bay',
  description: 'Great snorkeling! Sure, the beach is also nice for sunbathing, but Hanauma, with its entry fee and reef safety video (required for entrance), is all about exploring the underwater world.',
  location: 'Hanauma, Hawaii',
  latitude: 21.2690,
  longitude: 157.6938,
},
{
  title: 'Waikiki Beach',
  description: 'The iconic beach of Hawai‘i, with Diamond Head looming overhead. One of the most well-known beaches in the world and a legendary place to learn to surf.',
  location: 'Waikiki, Hawaii',
  latitude: 21.2793,
  longitude: 157.8292,
},
{
  title: 'Magic Island Lagoon',
  description: 'Magic Island is a man-made peninsula with large seawalls and a shallow lagoon, the latter a nice place for small children to play.',
  location: 'Honolulu, Hawaii',
  latitude: 21.2830,
  longitude: 157.8469,
},
{
  title: 'Halona Beach Cove',
  description: 'Halona Beach Cove is one of the smallest beaches on O‘ahu, offering a cozy setting between two rock outcroppings. Swimming is possible on very calm days, but it’s mostly rocky, so not recommended. It can be easily reached via a short walk down from the Halona Blowhole overlook. The cove was made famous by the movie From Here to Eternity, filmed there in 1953.',
  location: 'Honolulu, Hawaii',
  latitude: 21.2817,
  longitude: 157.6775,
},
{
  title: 'Sandy Beach',
  description: 'Just east of Halona Beach Cove is Sandy’s beach. Featuring a number of surf breaks and one of the largest shore breaks on the island, Sandy’s is a hub of activity and youth. Great for on-lookers, body boarders and surfers frequent this beach, so pull up a chair and hang out for a while. Check with the lifeguards before entering the water, as the conditions are often rough and dangerous.',
  location: 'Honolulu, Hawaii',
  latitude: 21.2857,
  longitude: 157.6727,
},
{
  title: 'Diamond Head Beach',
  description: 'Diamond Head Beach requires a long walk down a steep cliff to reach, but it’s typically very relaxed and uncrowded, at least on the beach (the water can get crowded with surfers). There’s not great swimming here due to the rocks, but it’s a nice beach for a walk or to find a slice of sand.',
  location: 'Honolulu, Hawaii',
  latitude: 21.2549,
  longitude: 157.8071,
},
{
  title: 'Ewa Beach',
  description: 'Ewa Beach is a long, narrow beach that covers most of the southwest coast of the island. Along it you will find a five-acre beach park (Ewa Beach) and a beginner surf break (White Plains). Families will love the green space, picnic areas, and residential vibe at Ewa Beach proper; surfers will enjoy the small, beginner-friendly waves at White Plains.',
  location: 'Ewa Beach, Hawaii',
  latitude: 21.3137,
  longitude: 158.0075,
},
{
  title: 'Depot Beach',
  description: 'Adjacent to Nanakuli, this long stretch of white sand is a local hangout for fishing and barbecuing.',
  location: 'Nanakuli, Hawaii',
  latitude: 21.3819,
  longitude: 158.1466,
},
{
  title: 'Makaha Beach',
  description: 'If you’re looking for surf culture on the west side, check out Makaha, home to another world-renown break. It’s not recommended for all swimmers, as the undertow can get quite strong. But, it’s a great place to post up and watch the surf from shore.',
  location: 'Makaha, Hawaii',
  latitude: 21.4764,
  longitude: 158.2204,
},
{
  title: 'Keawaula Beach',
  description: 'A steep-sloped beach with turquoise waters, Yokohama, or “Yokes” as it is called by locals, is a great place to snorkel when it’s calm, thanks to big rocks along the ocean entrance. Locals like to barbecue here.',
  location: 'Waialua, Hawaii',
  latitude: 21.5488,
  longitude: 158.2420,
},
{
  title: 'Pokai Bay Beach',
  description: 'If you are searching for a beach where you can swim, snorkel, and be one of the only visitors, head out to Pokai Bay and enjoy this secluded shoreline. It is surrounded by a reef, so the waters are calm and children can go snorkeling.',
  location: 'Waianae, Hawaii',
  latitude: 21.4393,
  longitude: 158.1883,
},
{
  title: 'Bellows Field Beach',
  description: 'Well-known for its soft sand and beautiful scenery, Bellows Field Beach Park is mostly visited by body surfers. The breaks here are definitely smaller than on Sandy Beach, so the waters can be shallow, making it popular with families with young children.',
  location: 'Waimanalo, Hawaii',
  latitude: 21.3575,
  longitude: 157.7090,
}
];

const seedDB = async () => {
  await Beach.deleteMany({});
  await Beach.insertMany(seedBeaches);
}
seedDB();
const mongoose = require('mongoose');
const Fashion = require('./models/Fashion');

mongoose.connect('mongodb://127.0.0.1:27017/FashionData')
  .then(async () => {
    console.log('✅ Connected to MongoDB FashionData');

    // Clear existing data
    await Fashion.deleteMany({});
    console.log('🗑️  Cleared existing fashion data');

    const fashions = [
      // Street Style
      {
        title: "Phil Oh's Best Street Style Photos From the Fall 2023 Shows in Paris",
        detail: `<p>There are two street style camps in Paris this season—those who are willing to brave the cold and go coatless for the sake of fashion, and others who are bundling up in their warmest furs and scarves. Phil Oh has captured the best of both approaches. He's also snapped a healthy mix of personal style and brand devotion—as seen by the Rick Owens obsessives who wear him head-to-toe. Follow along as Phil Oh captures the best street style from the shows here.</p><img src="https://media.vogue.com/photos/street-style-paris.jpg" style="max-width:100%"/>`,
        thumbnail: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400',
        style: 'Street Style',
        createdAt: new Date('2023-10-01')
      },
      {
        title: "Phil Oh's Best Street Style Photos From the Fall 2023 Shows in Milan",
        detail: `<p>Milan's street style scene is a perfect blend of Italian craftsmanship and forward-thinking fashion. The cobblestone streets outside the shows became a runway in their own right, with attendees showcasing everything from sharp tailoring to bold prints.</p><p>Photographers like Phil Oh captured stunning moments of style that rivaled what was happening inside the shows.</p>`,
        thumbnail: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400',
        style: 'Street Style',
        createdAt: new Date('2023-10-05')
      },
      {
        title: "Phil Oh's Best Street Style Photos From the Fall 2023 Shows in London",
        detail: `<p>London Fashion Week attracted an eclectic mix of fashion insiders who weren't afraid to experiment. From whimsical hats to unexpected layering, the street style outside the shows was as exciting as what was happening on the runways.</p>`,
        thumbnail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
        style: 'Street Style',
        createdAt: new Date('2023-10-10')
      },
      {
        title: "Vivienne Westwood Is Remembered in London",
        detail: `<p>Fashion lovers gathered in London to pay tribute to the legendary Vivienne Westwood. Fans and industry figures alike dressed in her iconic designs to honor the designer's extraordinary legacy. The streets became a living museum of her most memorable pieces.</p>`,
        thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400',
        style: 'Street Style',
        createdAt: new Date('2023-10-15')
      },

      // Trends
      {
        title: "Why This Short Suit Should Be Your Next Spring Investment",
        detail: `<p>The short suit is having a major moment this spring. Designers from Jacquemus to Zara are offering their take on this classic silhouette reimagined for warm weather. The key is in the fit—tailored but not too trim, with a hem that hits just above the knee.</p><p>Pair it with a simple white tee for a casual take, or a silk blouse for something more polished. Either way, you'll look effortlessly chic.</p>`,
        thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        style: 'Trends',
        createdAt: new Date('2023-09-01')
      },
      {
        title: "Is This The Trend Report of the Future? An AI Interprets the Fall 2023 Menswear Season",
        detail: `<p>Artificial intelligence is making its way into fashion forecasting. We asked an AI to analyze every look from the Fall 2023 menswear shows and report back on the biggest trends. The results were surprising, insightful, and sometimes delightfully surreal.</p><p>From the AI's perspective, the season was defined by a tension between structure and deconstruction, with designers questioning the very foundations of men's dressing.</p>`,
        thumbnail: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
        style: 'Trends',
        createdAt: new Date('2023-09-10')
      },
      {
        title: "What Street Style Looked Like a Decade Ago",
        detail: `<p>Looking back at street style photography from 10 years ago is like time traveling through a fashion wormhole. The platform shoes, the statement necklaces, the skinny jeans—it all feels simultaneously distant and familiar.</p><p>But some things remain timeless: the confidence, the creativity, the sheer joy of getting dressed up and showing the world who you are.</p>`,
        thumbnail: 'https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=400',
        style: 'Trends',
        createdAt: new Date('2023-09-15')
      },
      {
        title: "Men, Stats Aren't That Scary—Promise!",
        detail: `<p>Data-driven dressing is the next frontier for menswear. From moisture-wicking fabrics that track your body temperature to suits tailored by algorithm, technology is transforming how men think about their wardrobes.</p><p>Don't be intimidated by the numbers—understanding what the data says about your style preferences can actually make shopping more intuitive and satisfying.</p>`,
        thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        style: 'Trends',
        createdAt: new Date('2023-09-20')
      },

      // Casual
      {
        title: "The Perfect Casual Weekend Look for Every Body Type",
        detail: `<p>Casual dressing doesn't mean sloppy dressing. The perfect weekend outfit strikes a balance between comfort and style, and with the right pieces, it's easy to achieve no matter your body type.</p><p>The key is knowing your proportions and choosing pieces that flatter your natural silhouette. A well-fitted pair of straight-leg jeans, for instance, works beautifully on almost everyone.</p><ul><li>Straight-leg jeans for balanced proportions</li><li>Oversized knits for cozy elegance</li><li>Classic white sneakers for versatility</li></ul>`,
        thumbnail: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400',
        style: 'Casual',
        createdAt: new Date('2023-08-01')
      },
      {
        title: "10 Casual Outfits That Look Expensive (But Aren't)",
        detail: `<p>Looking put-together on a budget is an art form. The secret? Invest in a few high-quality basics and let them do the heavy lifting. A crisp white cotton t-shirt, well-fitting dark jeans, and clean leather sneakers is a combination that always reads as effortlessly stylish.</p><p>Fit is everything. A $20 t-shirt that fits perfectly will always look better than a $200 one that doesn't.</p>`,
        thumbnail: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400',
        style: 'Casual',
        createdAt: new Date('2023-08-10')
      },
      {
        title: "How to Build a Casual Capsule Wardrobe",
        detail: `<p>A capsule wardrobe is a collection of essential, versatile pieces that can be mixed and matched to create a variety of outfits. For casual wear, focus on quality basics in neutral colors that you can layer and style in multiple ways.</p><p><strong>The Core Pieces:</strong></p><ol><li>3-5 well-fitting t-shirts in neutral colors</li><li>2 pairs of versatile jeans</li><li>A classic denim jacket</li><li>Comfortable, stylish sneakers</li><li>A cozy, oversized sweatshirt</li></ol>`,
        thumbnail: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400',
        style: 'Casual',
        createdAt: new Date('2023-08-20')
      }
    ];

    await Fashion.insertMany(fashions);
    console.log(`✅ Inserted ${fashions.length} fashion items`);
    console.log('Styles:', [...new Set(fashions.map(f => f.style))].join(', '));

    await mongoose.disconnect();
    console.log('✅ Done! Database seeded successfully.');
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });

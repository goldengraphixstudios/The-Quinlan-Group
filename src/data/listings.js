import hamptonAerial from '../assets/hampton-aerial.jpg'
import hamptonLiving from '../assets/hampton-living.jpg'
import hamptonKitchen from '../assets/hampton-kitchen.jpg'
import hamptonPool from '../assets/hampton-pool.jpg'
import hamptonFamilyRoom from '../assets/hampton-family-room.jpg'

import providenceExterior from '../assets/providence-exterior.jpg'
import providenceLiving from '../assets/providence-living.jpg'
import providenceKitchen from '../assets/providence-kitchen.jpg'

import swanExterior from '../assets/swan-exterior.png'
import westfordExterior from '../assets/westford-exterior.png'
import woodbineLot from '../assets/woodbine-lot.jpg'
import harrisonExterior from '../assets/harrison-exterior.jpg'

import postBrewsterSold from '../assets/social/post-brewster-sold.jpg'
import postPutnamClosed from '../assets/social/post-putnam-closed.jpg'

export const listings = [
  {
    id: 'hampton',
    image: hamptonAerial,
    gallery: [hamptonAerial, hamptonLiving, hamptonKitchen, hamptonPool, hamptonFamilyRoom],
    tag: 'Just Closed',
    title: '21 Hampton Ave, Warwick, RI',
    details: 'Single family residence · 3 bedrooms · 2 baths',
    highlight: '$610,000 · 1,966 sqft · Pool · Sunroom · In-law suite',
    price: '$610,000',
    area: 'Warwick, RI',
    beds: 3,
    baths: 2,
    sqft: '1,966',
    description:
      'A stunning Warwick retreat featuring a private in-ground pool, spacious sunroom, and fully finished lower level with kitchenette. Negotiated with precision and closed with care — sold at $610,000.',
  },
  {
    id: 'warwick',
    image: postBrewsterSold,
    gallery: [postBrewsterSold],
    tag: 'Just Sold',
    title: '67 Brewster Dr, Warwick, RI',
    details: 'Single family residence · 3 bedrooms · 1.5 baths',
    highlight: '$385,000 · 1,184 sqft · Cape Cod style · 1-car garage',
    price: '$385,000',
    area: 'Warwick, RI',
    beds: 3,
    baths: 1.5,
    sqft: '1,184',
    description:
      'Classic Cape Cod charm in a desirable Warwick neighborhood. Positioned and sold at $385,000 with a targeted digital marketing campaign that generated a strong buyer pool above asking.',
  },
  {
    id: 'putnam',
    image: providenceExterior,
    gallery: [providenceExterior, providenceLiving, providenceKitchen, postPutnamClosed],
    tag: 'Closed Deal',
    title: '290 Providence Pike, Putnam, CT',
    details: 'Single family residence · 4 bedrooms · 2 baths',
    highlight: '$425,000 · 1,720 sqft · Cape Cod style · 1-car garage',
    price: '$425,000',
    area: 'Putnam, CT',
    beds: 4,
    baths: 2,
    sqft: '1,720',
    description:
      'A beautifully maintained Cape Cod in Connecticut sold at $425,000 with generous room sizes, updated kitchen, and spacious lot. Closed smoothly with strategic cross-state market knowledge.',
  },
  {
    id: 'pawtucket',
    image: harrisonExterior,
    gallery: [harrisonExterior],
    tag: 'Closed Deal',
    title: '193 Harrison St, Pawtucket, RI',
    details: 'Multi-family · 8 bedrooms · 5 baths · 2 units',
    highlight: 'New exterior finishes · Legally finished basement · Investment property',
    price: 'Closed',
    area: 'Pawtucket, RI',
    beds: 8,
    baths: 5,
    sqft: '3,500',
    description:
      'Prime multi-family investment property with two units, new exterior finishes, and a legally finished basement. Guided the investor through acquisition strategy, negotiation, and smooth closing.',
  },
  {
    id: 'eastprovidence',
    image: swanExterior,
    gallery: [swanExterior],
    tag: 'Just Closed',
    title: '58 Swan St, East Providence, RI',
    details: 'Single family residence · Cape Cod style',
    highlight: 'Renovated interior · East Providence location',
    price: 'Closed',
    area: 'East Providence, RI',
    beds: 3,
    baths: 1,
    sqft: '1,100',
    description:
      'Thoughtfully renovated single family Cape Cod in East Providence. Sold with a strong buyer pool generated through targeted social media campaigns and strategic local market positioning.',
  },
  {
    id: 'westford',
    image: westfordExterior,
    gallery: [westfordExterior],
    tag: 'Just Closed',
    title: '64 Westford Rd, Eastford, CT',
    details: 'Single family residence · Rural CT',
    highlight: 'Deck · Barn · Expansive lot · Eastford, CT',
    price: 'Closed',
    area: 'Eastford, CT',
    beds: 3,
    baths: 2,
    sqft: '1,400',
    description:
      'Charming rural Connecticut property with a wraparound deck, outbuilding barn, and wide open lot. Closed with precision leveraging the team\'s cross-state CT market expertise.',
  },
  {
    id: 'johnston',
    image: woodbineLot,
    gallery: [woodbineLot],
    tag: 'Just Closed',
    title: '0 Woodbine St, Johnston, RI',
    details: '0.23-acre buildable lot · Strategic acquisition',
    highlight: 'Buildable lot · Prime Johnston location · Investment opportunity',
    price: 'Closed',
    area: 'Johnston, RI',
    beds: null,
    baths: null,
    sqft: '0.23 ac',
    description:
      'Rare buildable lot in Johnston acquired off-market for an investor client. Executed a precise acquisition strategy to secure this prime parcel at below-market pricing.',
  },
]

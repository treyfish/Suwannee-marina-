import type { NavLink, StorageOption, Testimonial, HistoryMilestone, BusinessHours } from './types'

export const BUSINESS_NAME = 'Suwannee Shores Marina'
export const PHONE = '(352) 542-7482'
export const PHONE_HREF = 'tel:+13525427482'
export const ADDRESS = '28686 SE Hwy 19'
export const CITY_STATE_ZIP = 'Old Town, FL 32680'
export const FULL_ADDRESS = `${ADDRESS}, ${CITY_STATE_ZIP}`
export const EMAIL = 'info@suwanneeshoresmarinainc.com'
export const FACEBOOK_URL = 'https://www.facebook.com/people/Suwannee-Shores-Marina-Inc/100057408963947/'
export const MAPS_URL = 'https://maps.google.com/?q=28686+SE+Hwy+19+Old+Town+FL+32680'
export const MAPS_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.0!2d-83.0!3d29.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDM2JzAwLjAiTiA4M8KwMDAnMDAuMCJX!5e0!3m2!1sen!2sus!4v1234567890'
export const OWNER = 'Heath Greene'
export const FOUNDED = 1973

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const HOURS: BusinessHours[] = [
  { day: 'Monday', closed: true },
  { day: 'Tuesday', open: '8:00 AM', close: '5:00 PM', closed: false },
  { day: 'Wednesday', open: '8:00 AM', close: '5:00 PM', closed: false },
  { day: 'Thursday', open: '8:00 AM', close: '5:00 PM', closed: false },
  { day: 'Friday', open: '8:00 AM', close: '5:00 PM', closed: false },
  { day: 'Saturday', open: '8:00 AM', close: '1:00 PM', closed: false },
  { day: 'Sunday', closed: true },
]

export const STORAGE_OPTIONS: StorageOption[] = [
  {
    type: 'Dry Storage',
    description: 'Keep your boat safe and protected in our covered dry storage facility.',
    features: [
      'Protection from weather elements',
      'Easy access and retrieval',
      'Secure facility',
      'Available year-round',
    ],
  },
  {
    type: 'Covered Slips',
    description: 'Covered boat slips offering shade and protection right on the water.',
    features: [
      'Direct water access',
      'Overhead coverage',
      'Convenient for frequent use',
      'Various slip sizes available',
    ],
  },
  {
    type: 'Open Slips',
    description: 'Affordable open slip marina access on the Suwannee River.',
    features: [
      'Direct river access',
      'Cost-effective option',
      'Multiple sizes available',
      'Fuel dock nearby',
    ],
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Outstanding service! The technicians really know their stuff when it comes to Mercury outboards. They replaced the seals on my motor at no charge — that\'s the kind of integrity you don\'t find everywhere.',
    author: 'Mike T.',
    location: 'Gainesville, FL',
  },
  {
    quote: 'Been coming here since the \'90s. Heath and his team treat you like family. Best marina on the Suwannee River, period.',
    author: 'David R.',
    location: 'Lake City, FL',
  },
  {
    quote: 'Bought my boat here and the financing process was painless. They found me a great deal and the Mercury certification gives me total confidence in the service department.',
    author: 'Sandra K.',
    location: 'Tallahassee, FL',
  },
]

export const HISTORY_MILESTONES: HistoryMilestone[] = [
  {
    year: 1973,
    title: 'Founded on the Suwannee',
    description: 'Suwannee Shores Marina opens its doors on the banks of the Suwannee River in Old Town, Florida, beginning a family legacy in the marine industry.',
  },
  {
    year: 1985,
    title: 'Mercury Dealer Partnership',
    description: 'Established an official Mercury outboard dealer partnership, bringing certified sales, service, and warranty work to Dixie County.',
  },
  {
    year: 1995,
    title: 'Expanded Storage Facilities',
    description: 'Added dry storage and covered slip facilities to meet growing demand from boaters throughout the region.',
  },
  {
    year: 2010,
    title: 'Mercury Platinum Status',
    description: 'Achieved Mercury Platinum Dealership status — a recognition of excellence in sales volume, customer satisfaction, and certified service.',
  },
  {
    year: 2024,
    title: 'Serving the Southeast',
    description: 'Over 50 years in business, Suwannee Shores Marina continues to serve customers across Florida and the Southeast with the same family values and expertise.',
  },
]

export const SERVICES_OVERVIEW = [
  {
    iconName: 'Ship',
    title: 'Boat Sales & Brokerage',
    description: 'New and pre-owned boat sales, financing options, and full brokerage services to help you find the perfect vessel.',
    href: '/services#boat-sales',
  },
  {
    iconName: 'Anchor',
    title: 'Marina Storage',
    description: 'Dry storage, covered slips, and open slips available for short and long-term boat storage on the Suwannee River.',
    href: '/services#storage',
  },
  {
    iconName: 'Wrench',
    title: 'Service & Repair',
    description: 'Mercury Platinum certified technicians providing expert outboard motor service, repairs, and warranty work.',
    href: '/services#service',
  },
  {
    iconName: 'Fuel',
    title: 'Fuel, Bait & Tackle',
    description: 'On-site fuel dock, live bait, tackle, and marine supplies — everything you need before you hit the water.',
    href: '/services#supplies',
  },
]

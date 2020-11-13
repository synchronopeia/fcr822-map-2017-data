/* Schema Definitions
  - Fields with a 'colLabel' property are read from the client supplied worksheet
    from the column of that name

  - Fields from the client-supplied worksheet but NOT included in the output
    JSON file have been commented out

  - 'country-id' is the ISO3166 geographic code

  - 'slug' is the deburred kebab case version of the region name
 */

const srcDataSchema = [
  {
    fieldId: 'country-id', /** ISO3166 (merged from country definition) */
    default: '',
  },
  {
    fieldId: 'slug', /** deburred kebab case name (merged from country definition) */
    default: '',
  },
  {
    colLabel: 'Country',
    fieldId: 'name',
    default: '',
    parse: 'string',
    label: 'Country',
  },
  // {
  //   colLabel: 'Tree Cover Loss (ha)',
  //   fieldId: 'tree-cover-loss',
  //   default: null,
  //   parse: 'number',
  // },
  {
    colLabel: 'Tree Cover Loss (mha)',
    fieldId: 'tree-cover-loss-mega',
    default: null,
    parse: 'number',
    legendKey: 'forest-1',
    label: 'Gross Tree Cover Loss',
    title: 'Gross Tree Cover loss',
    subtitle: 'Cumulative 2010-2015',
    units: 'million ha',
    footnoteText: 'Source: Hansen, M. C., Potapov, P. V., Moore, R., Hancher, M., Turubanova, S. A., Tyukavina, A., et al. (2013). High-resolution global maps of 21st-century forest cover change [Data file and codebook]. Retrieved from the Global Forest Watch website. Updated by Global Forest Watch.',
    format: '.2f',
    binPartitions: [
      { value: 0.03, label: '< 30,000 ha', color: '#eed870' },
      { value: 0.1, label: '30,000 - 100,000 ha', color: '#dea71b' },
      { value: 1, label: '100,000 - 1 million ha', color: '#a79646' },
      { value: Number.POSITIVE_INFINITY, label: '> 1 million ha', color: '#6a5b43' },
    ],
  },
  {
    colLabel: 'Rate of loss per year (%)',
    fieldId: 'tree-cover-loss-percent-per-year',
    default: null,
    parse: 'number',
    legendKey: 'forest-2',
    label: 'Rate of Loss',
    title: 'Rate of Loss',
    subtitle: 'Average 2010-2015',
    units: 'percent/year',
    footnoteText: '',
    format: '.2f',
    binPartitions: [
      { value: 0.005, label: '< 0.005 %', color: '#eed870' },
      { value: 0.1, label: '0.005 - 0.1 %', color: '#dea71b' },
      { value: 1, label: '0.1 - 1 %', color: '#a79646' },
      { value: Number.POSITIVE_INFINITY, label: '> 1 %', color: '#6a5b43' },
    ],
  },
  {
    colLabel: 'Development finance (USD million)',
    fieldId: 'development-finance',
    default: null,
    parse: 'number',
    legendKey: 'finance-1',
    label: 'Development Finance',
    title: 'Mitigation-related development finance commitments targeted at the forestry sector',
    units: 'USD million',
    subtitle: '2010-2015',
    footnoteText: 'Source: Climate Focus analysis based on climate-related development finance dataset retrieved from retrieved from the Organisation for Economic Co-operation and Development (OECD) website.',
    format: ',.0f',
    color: '#3181e3',
    binPartitions: [
      { value: 10, label: '< USD 10 million', size: '12' },
      { value: 50, label: 'USD 10 - 50 million', size: '30' },
      { value: 200, label: 'USD 50 - 200 million', size: '45' },
      { value: Number.POSITIVE_INFINITY, label: '> USD 200 million', size: '80' },
    ],
  },
  {
    colLabel: 'REDD+ phase 1 and 2 finance (USD million)',
    fieldId: 'redd-plus-finance',
    default: null,
    parse: 'number',
    legendKey: 'finance-2',
    label: 'REDD+ Phase 1 and 2 Finance',
    title: 'REDD+ readiness and implementation finance',
    subtitle: 'Since 2010',
    units: 'USD million',
    footnoteText: 'Sources: Estimate combines multilateral and bilateral finance. Multilateral: Climate Focus compilation based on Climatefundsupdate.org data. Cumulative commitments since 2010. Bilateral finance: Climate Focus analysis based on FCPF Annual Report (2017) presenting the results of a survey conducted in 2017 with countries participating in the FCPF readiness process. FCPF Carbon Fund Emission Reduction Program Documents retrieved from the FCPF website:  https://www.forestcarbonpartnership.org/redd-countries-1. Assumed to be cumulative.',
    format: ',.0f',
    color: '#1cc0ce',
    binPartitions: [
      { value: 10, label: '< USD 10 million', size: '12' },
      { value: 50, label: 'USD 10 - 50 million', size: '30' },
      { value: 200, label: 'USD 50 - 200 million', size: '45' },
      { value: Number.POSITIVE_INFINITY, label: '> USD 200 million', size: '80' },
    ],
  },
  {
    colLabel: 'Results-based REDD+ finance commitments (USD million)',
    fieldId: 'results-based-finance-commitments',
    default: null,
    parse: 'number',
    legendKey: 'finance-3',
    label: 'Results-Based REDD+ Commitments',
    title: 'Results-based REDD+ finance commitments',
    subtitle: 'Since 2010',
    units: 'USD million',
    footnoteText: 'Sources: Climate Focus analysis based on data shared by Norway’s International Climate and Forest Initiative and the German REDD Early Mover Program, the BioCarbon Fund Initiative for Sustainable Forest Landscapes and the Forest Carbon Partnership Facility Carbon Fund retrieved from funds’ official websites. Cumulative since 2010.',
    format: ',.0f',
    color: '#4d9925',
    binPartitions: [
      { value: 10, label: '< USD 10 million', size: '12' },
      { value: 50, label: 'USD 10 - 50 million', size: '30' },
      { value: 200, label: 'USD 50 - 200 million', size: '45' },
      { value: Number.POSITIVE_INFINITY, label: '> USD 200 million', size: '80' },
    ],
  },
  // {
  //   colLabel: 'Results-based REDD+ finance disbursements (USD million)',
  //   fieldId: 'results-based-finance-disbursements',
  //   default: null,
  //   parse: 'number',
  // },
  // {
  //   colLabel: 'Results-based REDD+ finance commitments (USD million) - bilateral',
  //   fieldId: 'results-based-finance-bilateral-commitments',
  //   default: null,
  //   parse: 'number',
  // },
  // {
  //   colLabel: 'Results-based REDD+ finance disbursements (USD) - bilateral',
  //   fieldId: 'results-based-finance-bilateral-disbursements',
  //   default: null,
  //   parse: 'number',
  // },
  // {
  //   colLabel: 'FCPF Carbon Fund commitments based on LoIs and average price of 5USD',
  //   fieldId: 'carbon-fund-commitments',
  //   default: null,
  //   parse: 'number',
  // },
  // {
  //   colLabel: 'BioCarbon Fund ISFL',
  //   fieldId: 'biocarbon-fund',
  //   default: null,
  //   parse: 'number',
  // },
  // {
  //   colLabel: 'REDD+ phase 1 and 2 bilateral finance (USD million commitments/disbursements)',
  //   fieldId: 'redd-plus-bilateral-finance',
  //   default: null,
  //   parse: 'number',
  // },
  // {
  //   colLabel: 'REDD+ phase 1 and 2 bilateral finance (commitments/disbursements?)',
  //   fieldId: 'redd-plus-bilateral-finance-commitments-disbursements-ratio',
  //   default: null,
  //   parse: 'number',
  // },
  // {
  //   colLabel: 'REDD+ phase 1 and 2 finance commitments (USD million) - multilateral',
  //   fieldId: 'redd-plus-bilateral-finance-multilateral-commitments',
  //   default: null,
  //   parse: 'number',
  // },
];

export default srcDataSchema;

const points = [
  {
    id: '1',
    type: 'taxi',
    destination: '1',
    dateFrom: '2025-03-17T10:30',
    dateTo: '2025-03-17T11:00',
    basePrice: 20,
    isFavorite: true,
    offers: ['1', '2']
  },
  {
    id: '2',
    type: 'flight',
    destination: '2',
    dateFrom: '2025-04-18T12:00',
    dateTo: '2025-04-18T14:30',
    basePrice: 160,
    isFavorite: false,
    offers: ['4', '5']
  },
  {
    id: '3',
    type: 'check-in',
    destination: '3',
    dateFrom: '2025-05-19T15:00',
    dateTo: '2025-05-21T11:00',
    basePrice: 0,
    isFavorite: false,
    offers: ['8']
  },

  {
    id: '4',
    type: 'bus',
    destination: '4',
    dateFrom: '2026-05-24T00:00',
    dateTo: '2026-05-26T23:59',
    basePrice: 45,
    isFavorite: true,
    offers: ['10']
  },
  {
    id: '5',
    type: 'train',
    destination: '5',
    dateFrom: '2026-05-23T08:00',
    dateTo: '2026-05-25T12:00',
    basePrice: 80,
    isFavorite: false,
    offers: ['12']
  },
  {
    id: '6',
    type: 'ship',
    destination: '6',
    dateFrom: '2026-05-24T20:00',
    dateTo: '2026-05-27T04:00',
    basePrice: 108,
    isFavorite: true,
    offers: ['14']
  },

  {
    id: '7',
    type: 'flight',
    destination: '3',
    dateFrom: '2027-04-01T06:00',
    dateTo: '2027-04-01T10:30',
    basePrice: 220,
    isFavorite: false,
    offers: ['4', '6']
  },
  {
    id: '8',
    type: 'taxi',
    destination: '2',
    dateFrom: '2027-04-02T13:15',
    dateTo: '2027-04-02T14:00',
    basePrice: 35,
    isFavorite: false,
    offers: ['2']
  },
  {
    id: '9',
    type: 'train',
    destination: '1',
    dateFrom: '2027-04-05T07:00',
    dateTo: '2027-04-05T12:00',
    basePrice: 95,
    isFavorite: true,
    offers: ['12', '13']
  },
  {
    id: '10',
    type: 'ship',
    destination: '4',
    dateFrom: '2027-04-07T18:00',
    dateTo: '2027-04-08T09:00',
    basePrice: 340,
    isFavorite: false,
    offers: ['14', '15']
  },
  {
    id: '11',
    type: 'bus',
    destination: '5',
    dateFrom: '2027-04-10T09:30',
    dateTo: '2027-04-10T12:00',
    basePrice: 25,
    isFavorite: false,
    offers: ['11']
  },
  {
    id: '12',
    type: 'check-in',
    destination: '6',
    dateFrom: '2027-04-12T15:00',
    dateTo: '2027-04-15T10:00',
    basePrice: 400,
    isFavorite: true,
    offers: ['8', '9']
  }
];

export default points;

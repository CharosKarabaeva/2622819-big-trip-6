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
    dateFrom: '2025-03-18T12:00',
    dateTo: '2025-03-18T14:30',
    basePrice: 160,
    isFavorite: false,
    offers: ['4', '5']
  },
  {
    id: '3',
    type: 'check-in',
    destination: '3',
    dateFrom: '2025-03-19T15:00',
    dateTo: '2025-03-21T11:00',
    basePrice: 0,
    isFavorite: false,
    offers: ['8']
  },
  {
    id: '4',
    type: 'bus',
    destination: '1',
    dateFrom: '2025-03-20T09:00',
    dateTo: '2025-03-20T11:00',
    basePrice: 45,
    isFavorite: true,
    offers: ['10']
  },
  {
    id: '5',
    type: 'train',
    destination: '2',
    dateFrom: '2025-03-21T08:00',
    dateTo: '2025-03-21T12:00',
    basePrice: 80,
    isFavorite: false,
    offers: ['12']
  },
  {
    id: '6',
    type: 'ship',
    destination: '1',
    dateFrom: '2025-03-22T20:00',
    dateTo: '2025-03-23T04:00',
    basePrice: 108,
    isFavorite: true,
    offers: ['14']
  }
];

export default points;

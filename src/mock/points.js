const points = [
  {
    id: '1',
    type: 'taxi',
    destination: '1',
    dateFrom: '2025-03-18T10:30',
    dateTo: '2025-03-18T11:00',
    basePrice: 20,
    isFavorite: true,
    offers: ['1']
  },
  {
    id: '2',
    type: 'flight',
    destination: '2',
    dateFrom: '2025-03-19T12:00',
    dateTo: '2025-03-19T14:30',
    basePrice: 160,
    isFavorite: false,
    offers: ['3', '4']
  },
  {
    id: '3',
    type: 'check-in',
    destination: '3',
    dateFrom: '2025-03-20T15:00',
    dateTo: '2025-03-22T11:00',
    basePrice: 0,
    isFavorite: false,
    offers: []
  }
];

export default points;

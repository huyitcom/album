export interface ColorFilter {
  id: string;
  name: string; // This will be the i18n key
  className: string;
}

export const colorFilters: ColorFilter[] = [
  { id: 'none', name: 'filterNone', className: '' },
  { id: 'vintage', name: 'filterVintage', className: 'filter-vintage' },
  { id: 'lomo', name: 'filterLomo', className: 'filter-lomo' },
  { id: 'clarendon', name: 'filterClarendon', className: 'filter-clarendon' },
  { id: 'gingham', name: 'filterGingham', className: 'filter-gingham' },
  { id: 'moon', name: 'filterMoon', className: 'filter-moon' },
  { id: 'nashville', name: 'filterNashville', className: 'filter-nashville' },
  { id: 'xpro2', name: 'filterXpro2', className: 'filter-xpro2' },
  { id: 'willow', name: 'filterWillow', className: 'filter-willow' },
];

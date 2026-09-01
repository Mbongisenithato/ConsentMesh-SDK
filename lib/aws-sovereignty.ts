export const REGIONAL_ENDPOINTS = {
  africa: 'af-south-1', 
  eu: 'eu-central-1',     
  us: 'us-east-1',      
};

export function getSovereignRegion(userCountryCode: string): string {
  switch (userCountryCode?.toUpperCase()) {
    case 'ZA':
      return REGIONAL_ENDPOINTS.africa;
    case 'DE':
    case 'FR':
    case 'GB':
      return REGIONAL_ENDPOINTS.eu;
    default:
      return REGIONAL_ENDPOINTS.us;
  }
}

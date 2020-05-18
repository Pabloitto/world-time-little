import config from '../config/index';

const {
  GOOGLE_API_URL,
  GOOGLE_API_KEY
} = config;

export async function fetchTimeZoneIdByLocation({
  lat,
  lng
}: any) {
  const url = `${GOOGLE_API_URL}/maps/api/timezone/json?location=${lat},${lng}&timestamp=1331161200&key=${GOOGLE_API_KEY}`
  
  return fetch(url).then(response => {
    return response.json();
  }).then(({ timeZoneId }) => {
    return timeZoneId;
  });
}
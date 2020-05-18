import React, { useRef } from 'react';

import GooglePlacesAutocomplete, { getLatLng, geocodeByPlaceId } from 'react-google-places-autocomplete';

import 'react-google-places-autocomplete/dist/index.min.css';

export const SearchInput = ({
  timeZoneService,
  handleSuggestionSelected
}: any) => {
  const googlePlacesAutocomplete = useRef<any>(null);

  const handleOnSelect = async (data: any) => {
    const placeId = data.place_id;
    const mainText = data.structured_formatting.main_text;
    const secondaryText = data.structured_formatting.secondary_text;
    const [firstResult] = await geocodeByPlaceId(placeId)
    const getLocation = await getLatLng(firstResult);

    const timeZoneId = await timeZoneService.fetchTimeZoneIdByLocation(getLocation);

    handleSuggestionSelected({
      timeZoneId,
      mainText,
      secondaryText
    });

    googlePlacesAutocomplete.current.changeValue('');
  };

  return (
    <div>
      <GooglePlacesAutocomplete
        ref={googlePlacesAutocomplete}
        placeholder='Find place and time zone'
        onSelect={handleOnSelect}
      />
    </div>
  );
}

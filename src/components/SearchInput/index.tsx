import React, { useState } from 'react';

import Autosuggest from 'react-autosuggest';

import moment from 'moment-timezone';

import './styles.scss';

const timeZones = moment.tz.names();

const renderSuggestion = (suggestion: any) => (
  <div>
    {suggestion}
  </div>
);

const getSuggestions = (value: any): string[] => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  if (inputLength === 0) {
    return [];
  }

  return timeZones.filter(tz =>
    tz.toLowerCase().indexOf(inputValue) > -1
  );
};

export const SearchInput = ({
  handleSuggestionSelected
}: any) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [value, setValue] = useState('');
  
  const handleOnChange = (event: any, data: any) => {
    setValue(data.newValue);
  };


  const onSuggestionsFetchRequested = ({ value }: any) => {
    setSuggestions(getSuggestions(value));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (e: any, {suggestion}: any) => {
    handleSuggestionSelected(suggestion);
    setValue('');
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionSelected={onSuggestionSelected}
      renderSuggestion={renderSuggestion}
      getSuggestionValue={(suggestion) => suggestion}
      inputProps={{
        placeholder: 'Type a time zone',
        value,
        onChange: handleOnChange
      }}
    />
  );
}

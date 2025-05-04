import React, { useState }  from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { searchCities } from '../api/apiWeather'

export const Search = ({ onSearchChange,datainput }) => {
  const [searchValue, setSearchValue] = useState(datainput);
  const loadOptions = async (inputValue) => {
    const citiesList = await searchCities(inputValue);

    return {
      options: citiesList.data.map((city) => {
        return {
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        };
      }),
    };
  };

  const onChangeHandler = (enteredData) => {
    setSearchValue(enteredData);
    onSearchChange(enteredData);
  };  
  return (
    <AsyncPaginate
      placeholder="Rechercher des villes"
      debounceTimeout={600}
      value={searchValue}
      onChange={onChangeHandler}
      loadOptions={loadOptions}
    />
  )
}

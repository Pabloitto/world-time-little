import React, { useState } from 'react';
import moment from 'moment-timezone';

import { SearchInput } from '../../components/SearchInput';
import { TimeLineRow } from '../../components/TimeLineRow';
import { VerticalBar } from '../../components/VerticalBar';

import { TimeLineBuilder } from '../../utils/TimeLineBuilder';
import * as timeZoneService from '../../api/TimeZoneService';

import './styles.scss';

const timeLineBuilder = new TimeLineBuilder();

export const AppScreen = () => {
  const [cities, setCities] = useState<any[]>([]);

  const [xIndex, setXIndex] = useState(0);

  const changeIndex = (defaultItem: any) => {
    const index = parseInt(moment().tz(defaultItem.tz).format('HH'), 10);
    setXIndex(index);
  }

  const handleHomeClick = (index: number) => {
    const newCities = cities.map((place, i) => {
      const newDefault = i === index;
      if (newDefault) {
        changeIndex(place);
      }
      return {
        ...place,
        currentDate: moment().tz(place.tz),
        isDefault: newDefault
      };
    });
    setCities(timeLineBuilder.attachTimeLines(newCities));
  }
  const handleTrashClick = (index: number) => {
    const { isDefault } = cities[index];
    const newCities = cities.filter((_, i) => {
      return i !== index;
    });
    if (isDefault && newCities.length > 0) {
      newCities[0].isDefault = true;
    }
    setCities(newCities);
  }

  const handleNext = () => {
    const newCities = cities.map((city, i) => {
      return {
        ...city,
        currentDate: city.currentDate.clone().add(1, 'day')
      };
    });
    setCities(newCities);
  }

  const handleIndexSelected = (index: number) => {
    const newCities = cities.map((place) => {
      const timeSpan = place.timeLine[index];
      const timeLineDate = moment(timeSpan).tz(place.tz).set({ minutes: 0 });
      return {
        ...place,
        currentDate: place.currentDate.tz(place.tz).set({ hour: timeLineDate.hour() })
      };
    });
    setCities(newCities);
  }

  const renderCities = () => {
    if (cities.length === 0) {
      return <div style={{display: 'flex', justifyContent: 'center'}}>
        No Time Zones to compare...
      </div> 
    }
    return cities.map((place, i) => {
      return (
        <TimeLineRow
          key={i}
          index={i}
          place={place}
          handleHomeClick={handleHomeClick}
          handleTrashClick={handleTrashClick}
          handleNext={handleNext}
        />
      );
    });
  }

  const handleSuggestionSelected = ({
    secondaryText,
    mainText,
    timeZoneId
  }: any) => {
    const place = {
      country: secondaryText,
      city: mainText,
      tz: timeZoneId,
      currentDate: moment().tz(timeZoneId),
      isDefault: cities.length === 0
    };
    cities.push(place);
    const defaultItem = cities.find(city => city.isDefault);
    if (defaultItem) {
      changeIndex(defaultItem);
    }
    setCities(timeLineBuilder.attachTimeLines(cities));
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <SearchInput
                timeZoneService={timeZoneService}
                handleSuggestionSelected={handleSuggestionSelected}
              />
            </div>
            <div className="card-body">
              <VerticalBar
                xIndex={xIndex}
                setXIndex={setXIndex}
                onIndexSelected={handleIndexSelected}
                sizeList={cities.length}
              />
              {renderCities()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


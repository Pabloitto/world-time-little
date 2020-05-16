import React, { useState, useEffect } from 'react';

import moment from 'moment-timezone';

import Draggable from 'react-draggable';

import "./styles.scss";
import { TimeLineBuilder } from '../../utils/TimeLineBuilder';


const VerticalBar = () => {
  const [x, setX] = useState(0);
  const onStop = (e: any, data: any) => {
    const pos = data.x / 20;
    const index = (data.x > x ? Math.ceil(pos) : Math.floor(pos));
    setX(index * 20);
  };

  return (
    <Draggable
      axis="x"
      bounds={{ left: 0, right: 460 - 1 }}
      position={{ x, y: 0 }}
      onStop={onStop}
      handle=".selector">
      <div className='selector' />
    </Draggable>
  );
}
const TimeLineRow = (props: any) => {
  const {
    country,
    city,
    timeLine,
    tz,
    index,
    currentDate,
    handleHomeClick,
    handleTrashClick
  } = props;

  const pushFirstItem = (index: number, timeLine: any[]) => {
    const dayName = currentDate.format('MMM DD');
    if (index === 0) {
      timeLine.push(<div key={`${dayName}-${0}-${0}`} className='time-line-item start-of-day'>{dayName}</div>);
    }
  }
  const getHoursOfTheDay = () => {
    return timeLine.reduce((acc: any[], timeStamp: number, i: number) => {
      const curr = moment(timeStamp).tz(tz);
      pushFirstItem(i, acc);
      const hour = curr.format('h A').toLowerCase();
      acc.push(<div key={`${i}-${timeStamp}`} className={`time-line-item ${i === timeLine.length - 1 ? 'end-of-day' : ''}`}>{hour}</div>);
      return acc;
    }, []);
  }
  return (
    <div className="time-player-row">
      <div className="left-container">
        <div className="list-of-cities">
          <div onClick={() => handleTrashClick(index)}>
            <i className="fa fa-trash"></i>
          </div>
          <div onClick={() => handleHomeClick(index)}>
            <i className="fa fa-home"></i>
          </div>
        </div>
        <div className="city-info">
          <label>{city}</label>
          <span>{country}</span>
        </div>
        <div className="city-info">
          <label>{currentDate.format('hh:mm A').toLowerCase()} {currentDate.zoneAbbr()}</label>
          <span>{currentDate.format('dd, MMM DD')}</span>
        </div>
      </div>
      <div className="timer-selector">
        <div className='time-line'>
          <div className='time-line-day'>
            {getHoursOfTheDay()}
          </div>
        </div>
      </div>
    </div>
  );
}

const timeLineBuilder = new TimeLineBuilder();

function MainScreen() {
  const [cities, setCities] = useState<any[]>([]);
  useEffect(() => {
    setCities([
      {
        country: 'Mexico',
        city: 'Hermosillo',
        tz: 'America/Hermosillo',
        currentDate: moment().tz('America/Hermosillo'),
        isDefault: true
      },
      {
        country: 'Mexico',
        city: 'Guadalajara',
        tz: 'America/Mexico_City',
        currentDate: moment().tz('America/Mexico_City'),
        isDefault: false
      },
      {
        country: 'London',
        city: 'England',
        tz: 'Europe/London',
        currentDate: moment().tz('Europe/London'),
        isDefault: false
      }
    ]);
  }, []);
  const handleHomeClick = (index: number) => {
    const newCities = cities.map((city, i) => {
      city.isDefault = i === index;
      return city;
    });
    setCities(newCities);
  }
  const handleTrashClick = (index: number) => {
    const newCities = cities.filter((_, i) => {
      return i !== index;
    });
    setCities(newCities);
  }

  const handleNext = () => {
    const newCities = cities.map((city, i) => {
      city.currentDate = city.currentDate.clone().add(1, 'day');
      return city;
    });
    setCities(newCities);
  }
  const handleBack = () => {
    const newCities = cities.map((city, i) => {
      city.currentDate = city.currentDate.clone().add(-1, 'day');
      return city;
    });
    setCities(newCities);
  }

  const renderCities = () => {
    return timeLineBuilder.attachTimeLines(cities).map((city, i) => {
      return (
        <div>
          <label className='back-button'>Back</label>
          <TimeLineRow
            key={i}
            index={i}
            handleTrashClick={handleTrashClick}
            handleHomeClick={handleHomeClick}
            handleNext={handleNext}
            handleBack={handleBack}
            {...city}
          />
          <label className='next-button'>Next</label>
        </div>
      );
    });
  }
  return (
    <div className="main">
      <div className="search-bar-container">
        <input className='search-input' type="text" placeholder="Find place or time zone" />
      </div>
      <div className="time-player">
        <div className='right-container'>
          <VerticalBar />
          {renderCities()}
        </div>
      </div>
    </div>
  );
}

export default MainScreen;

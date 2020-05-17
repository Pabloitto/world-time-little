import moment from 'moment-timezone';

export class TimeLineBuilder {
  getTimeLineDates(place: any) {
    const date: moment.Moment = moment().tz(place.tz);
    const days = [];

    let start = date.startOf('day');
    let hoursInDay = parseInt(date.endOf('day').format('HH'), 10) + 1;

    for (let i = 0; i < hoursInDay; i++) {
      const current = start.add(1, 'hour');
      days.push(current.valueOf());
    }

    return days;
  }
  translateToTimeZone(place: any, timeLine: number[]) {
    return timeLine.map(date => {
      return this.translateSingleDate(date, place.tz);
    });
  }
  translateSingleDate(timeStamp: number, tz: string) {
    return moment(timeStamp).tz(tz).valueOf();
  }
  attachTimeLines(places: any[]) {
    if (places.length === 0) {
      return [];
    }
    
    const defaultItem = places.find(i => i.isDefault);

    const defaultTimeLine = this.getTimeLineDates(defaultItem);

    return places.map(place => {
      if (place.isDefault) {
        return {
          ...defaultItem,
          timeLine: defaultTimeLine
        };
      }
      const newTimeLine = this.translateToTimeZone(place, defaultTimeLine);
      return {
        ...place,
        timeLine: newTimeLine
      }
    });

    // SORT or not ?
    /**
     * .sort((a, b) => {
      return b.isDefault - a.isDefault;
    });
     */
  }
}
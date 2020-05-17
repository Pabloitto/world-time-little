import React, { useState, useEffect } from 'react';

import Draggable from 'react-draggable';

import { useWindowSize } from '../../utils/useWindowResize';

import './styles.scss';

const itemSize = 20;

export const VerticalBar = ({
  xIndex,
  setXIndex,
  sizeList,
  onIndexSelected
}: any) => {
  const [xBounds, setXBounds] = useState({left: 0, right: 0});
  const [verticalBarHeight, setVerticalBarHeight] = useState(0);
  const size = useWindowSize();

  const getPositionByIndex = () => {
    return xBounds.left + (xIndex * itemSize);
  }

  const x = getPositionByIndex();

  useEffect(() => {
    let id = setImmediate(() => {
      const elements = document.querySelectorAll('.time-line');
      let heightBar = 0;
      let last = 0;
      elements.forEach((e, i) => {
        const {height} = e.getBoundingClientRect();
        heightBar += height;
        last = height;
      });
      const element = document.querySelector('.time-line-day');
      if (element) {
        const data = element.getBoundingClientRect();
        const bounds = {
          left: data.x - 16,
          right: data.x + 430
        };
        setXBounds(bounds);
        const itemHeight = document.querySelector('.time-line-item');
        if (itemHeight) {
          setVerticalBarHeight(heightBar - last +  itemHeight.getBoundingClientRect().height);
        }
      }
    });
    return () => {
      clearImmediate(id);
    };
  }, [size, sizeList]);
  const onStop = (e: any, data: any) => {
    const currentX = data.x - xBounds.left;
    const pos = currentX / itemSize;
    const index = (pos > xIndex ? Math.ceil(pos) : Math.floor(pos));
    setXIndex(index);
    onIndexSelected(index);
  };

  if (sizeList === 0) {
    return null;
  }

  return (
    <Draggable
      axis="x"
      defaultPosition={{ x, y: 0}}
      bounds={{left: xBounds.left, right: xBounds.left + (itemSize * 23)}}
      position={{ x, y: 0 }}
      onStop={onStop}
      handle=".selector">
      <div className='selector' style={{height: verticalBarHeight}} />
    </Draggable>
  );
}
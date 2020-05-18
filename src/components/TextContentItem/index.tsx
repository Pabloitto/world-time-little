import React from 'react';

import './styles.scss';
export const TextContentItem = ({
  text,
  subText
}: any) => {
  return (
    <div>
      <dl>
        <dt className='title'>
          {text}
        </dt>
        <dd className='sub-title'>
          {subText}
        </dd>
      </dl>
    </div>
  );
}
import React from 'react';

export const TextContentItem = ({
  text,
  subText
}: any) => {
  return (
    <div>
      <dl>
        <dt>
          {text}
        </dt>
        <dd>
          {subText}
        </dd>
      </dl>
    </div>
  );
}
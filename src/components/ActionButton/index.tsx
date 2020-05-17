import React from 'react';

import './styles.scss';

const renderIcon = (icon: any) => {
  return (
    <i className={`fa ${icon}`}></i>
  );
}

const renderText = (text: string) => {
  return (
    <span>{text}</span>
  );
}

const renderIconOrText = (text: string, icon: any) => {
  if (text) {
    return renderText(text);
  }
  if (icon) {
    return renderIcon(icon);
  }

  return null;
}

export const ActionButton = ({
  icon,
  text,
  withCircle = false,
  onClick,
  style={},
  className = ''
}: any) => {
  return (
    <div style={style} className={`${className} action-button${withCircle ? ' action-button-circle-wrap' : ''}`} onClick={onClick}>
      {renderIconOrText(text, icon)}
    </div>
  );
}
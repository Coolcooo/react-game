import React from 'react';
import './restart-smile.scss';

const RestartSmile = ({ doRestart }) => {

  return (
    <button onClick={doRestart} className="button button-smile button_restart-good" />
  );
}

export default RestartSmile;

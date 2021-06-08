import React, { useState } from 'react';
import './styles.scss';

ColorBox.propTypes = {};

function ColorBox(props) {
  const [color, setColor] = useState('white');

  return (
    <div>
      <div className="color-box" style={{ backgroundColor: color, marginTop: '10px' }} />
      <button onClick={() => setColor('black')}>Change to black</button>
      <button onClick={() => setColor('deeppink')}>Change to deeppink</button>
    </div>
  );
}

export default ColorBox;

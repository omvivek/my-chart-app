// TimeframeSelector.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TimeframeSelector = ({ onSelect }) => (
  <div className="timeframe-selector mb-3">
    <button className="btn btn-outline-primary me-2" onClick={() => onSelect('daily')}>
      Daily
    </button>
    <button className="btn btn-outline-primary me-2" onClick={() => onSelect('weekly')}>
      Weekly
    </button>
    <button className="btn btn-outline-primary" onClick={() => onSelect('monthly')}>
      Monthly
    </button>
  </div>
);

export default TimeframeSelector;

import React from 'react';
import { PropTypes } from 'prop-types';

import _ from 'lodash';

import './stylesheets/svgComponents.css';


const SvgWidget = ({ width, height, children, ...otherProps }) => {
  return (
    <svg className="svg-widget" width={width} height={height} {...otherProps}>
      {children}
    </svg>
  );
};

SvgWidget.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

SvgWidget.defaultProps = {
  width: 700,
  height: 500,
};

export default SvgWidget;


export const SvgPoint = ({ cx, cy, r, fill, label, ...otherProps }) => {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={fill} {...otherProps} />
      {label &&
        <text x={cx + 8} y={cy - (r + 8)} fill={fill}>
          {label}
        </text>
      }
    </g>
  );
};

SvgPoint.propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  r: PropTypes.number,
  fill: PropTypes.string,
  label: PropTypes.string,
};

SvgPoint.defaultProps = {
  r: 5,
};


export const SvgLine = ({ x1, y1, x2, y2, ...otherProps }) => {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} {...otherProps} />
};

SvgLine.propTypes = {
  x1: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
  x2: PropTypes.number.isRequired,
  y2: PropTypes.number.isRequired,
};


export const SvgSequence = ({ points, drawLines }) => {
  const svgPoints = [];
  const svgLines = [];
  _.each(points, ({ cx, cy, r, fill, label, ...otherProps }, n) => {
    const svgPoint = <SvgPoint cx={cx} cy={cy} fill={fill} label={label || `a_${n}`} {...otherProps} key={`${n}_point`} />;
    svgPoints.push(svgPoint);
    if (n > 0) {
      const previousPoint = points[n-1];
      const svgLine = <SvgLine x1={previousPoint.cx} y1={previousPoint.cy} x2={cx} y2={cy} stroke={fill} strokeWidth={1} key={`${n}_line`} />;
      svgLines.push(svgLine);
    }
  });
  return (
    <g>
      {drawLines && svgLines}
      {svgPoints}
    </g>
  );
};

SvgSequence.propTypes = {
  points: PropTypes.arrayOf(PropTypes.shape({
    cx: PropTypes.number.isRequired,
    cy: PropTypes.number.isRequired,
    r: PropTypes.number,
    fill: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
  drawLines: PropTypes.bool,
};

SvgSequence.defaultProps = {
  drawLines: false,
};

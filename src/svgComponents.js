import React from 'react';
import { PropTypes } from 'prop-types';

import _ from 'lodash';

import IM from './katex';


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


export const SvgPoint = ({ cx, cy, r, label, labelClass, bold, ...otherProps }) => {
  const extraRadius = bold ? 0.2 * r : 0;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r + extraRadius} {...otherProps} />
      {label &&
        <foreignObject x={cx + 8} y={cy - (r + 16)} width={100}>
          {label}
        </foreignObject>
      }
    </g>
  );
};

SvgPoint.propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  r: PropTypes.number,
  label: PropTypes.object,
  bold: PropTypes.bool,
};

SvgPoint.defaultProps = {
  r: 5,
  bold: false,
};


export const SvgBall = ({ cx, cy, r, radiusAngle, radiusLabel, ...otherProps }) => {
  const radiusXComponent = r * Math.cos(radiusAngle);
  const radiusYComponent = r * Math.sin(radiusAngle);
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} {...otherProps} />
      {r && radiusAngle &&
        <line x1={cx} y1={cy} x2={cx + radiusXComponent} y2={cy - radiusYComponent} pathLength={r} stroke="#555" />
      }
      {r && radiusAngle && radiusLabel &&
        <foreignObject x={cx + (radiusXComponent / 2) + 6} y={cy - (radiusYComponent / 2) - 4} width={100}>
          {radiusLabel}
        </foreignObject>
      }
    </g>
  );
};

SvgBall.propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  r: PropTypes.number.isRequired,
  radiusAngle: PropTypes.number,
  radiusLabel: PropTypes.object,
};


export const SvgSequence = ({ points, drawLines }) => {
  const svgPoints = [];
  const lines = [];
  _.each(points, ({ cx, cy, label, bold, fill, ...otherProps }, n) => {
    const mathLabel = _.isNull(label) ? null : <IM m={label || `a_${n}`} />;
    const svgPoint = <SvgPoint cx={cx} cy={cy} label={mathLabel} bold={bold} fill={fill} {...otherProps} key={`${n}_point`} />;
    svgPoints.push(svgPoint);
    if (n > 0) {
      const previousPoint = points[n-1];
      const lineBold = bold && previousPoint.bold;
      const extraWidth = lineBold ? 2 : 0;
      const line = <line x1={previousPoint.cx}
                         y1={previousPoint.cy}
                         x2={cx}
                         y2={cy}
                         stroke={fill}
                         strokeWidth={1 + extraWidth}
                         key={`${n}_line`} />;
      lines.push(line);
    }
  });
  return (
    <g>
      {drawLines && lines}
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

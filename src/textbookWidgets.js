import React from 'react';
import { PropTypes } from 'prop-types';

import _ from 'lodash';

import SvgWidget, { SvgPoint, SvgSequence } from './svgComponents';


export const Limit2D = ({ hoveredEpsilon }) => {
  const fullWidth = 600;
  const fullHeight = 400;
  const sequencePoints = [
    { cx: 30, cy: 60 },
    { cx: 40, cy: 160 },
    { cx: 60, cy: 280 },
    { cx: 250, cy: 200 },
    { cx: 350, cy: 220 },
    { cx: 390, cy: 160 },
  ];
  _.each(sequencePoints, point => {
    point.fill = BLUE;
  });
  const sequence = <SvgSequence points={sequencePoints} drawLines={true} />;
  const limitPos = { x: fullWidth * 0.75, y: fullHeight * 0.5 };
  const limitPoint = <SvgPoint cx={limitPos.x} cy={limitPos.y} fill={RED} label="a" />;
  const neighborhoodRadius = (hoveredEpsilon || 0) * 80;
  const neighborhood = <circle className="epsilon-neighborhood" cx={limitPos.x} cy={limitPos.y} r={neighborhoodRadius} fill={YELLOW} />;
  return (
    <SvgWidget width={fullWidth} height={fullHeight}>
      {neighborhood}
      {sequence}
      {limitPoint}
    </SvgWidget>
  );
}

Limit2D.propTypes = {
  hoveredEpsilon: PropTypes.number,
};


const RED = '#ef675f';
const BLUE = '#747ffc';
const YELLOW = '#ffe772';

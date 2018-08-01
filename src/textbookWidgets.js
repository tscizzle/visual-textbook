import React from 'react';
import { PropTypes } from 'prop-types';

import _ from 'lodash';

import MJ from './mathjax';
import Colors from './colors';
import SvgWidget, { SvgPoint, SvgBall, SvgSequence } from './svgComponents';


export const Limit2D = ({ hoveredEpsilon, hoveredN }) => {
  const fullWidth = 600;
  const fullHeight = 400;
  const sequencePoints = [
    { cx: fullWidth * 0.05, cy: fullHeight * 0.15, fill: Colors.BLUE },
    { cx: fullWidth * 0.06, cy: fullHeight * 0.4, fill: Colors.BLUE },
    { cx: fullWidth * 0.1, cy: fullHeight * 0.7, fill: Colors.BLUE },
    { cx: fullWidth * 0.4, cy: fullHeight * 0.5, fill: Colors.BLUE },
    { cx: fullWidth * 0.6, cy: fullHeight * 0.55, fill: Colors.BLUE },
    { cx: fullWidth * 0.58, cy: fullHeight * 0.35, fill: Colors.BLUE },
    { cx: fullWidth * 0.64, cy: fullHeight * 0.40, fill: Colors.BLUE },
    { cx: fullWidth * 0.67, cy: fullHeight * 0.43, fill: Colors.BLUE },
    { cx: fullWidth * 0.7, cy: fullHeight * 0.46, fill: Colors.BLUE, label: '…' },
    { cx: fullWidth * 0.72, cy: fullHeight * 0.47, fill: Colors.BLUE, label: null },
    { cx: fullWidth * 0.73, cy: fullHeight * 0.48, fill: Colors.BLUE, label: null },
    { cx: fullWidth * 0.74, cy: fullHeight * 0.49, fill: Colors.BLUE, label: null },
  ];
  if (!_.isNull(hoveredN)) {
    const start = hoveredN + 1;
    const end = sequencePoints.length;
    if (end > start) {
      _.each(_.range(start, end), n => {
        sequencePoints[n].bold = true;
      });
    }
  }
  const sequence = <SvgSequence points={sequencePoints} drawLines={true} />;
  const limitPos = { x: fullWidth * 0.75, y: fullHeight * 0.5 };
  const limitPoint = <SvgPoint cx={limitPos.x}
                               cy={limitPos.y}
                               label={<MJ i={"a"} />}
                               bold={true}
                               fill={Colors.RED} />;
  const ballRadius = (hoveredEpsilon || 0) * 80;
  const radiusAngle = Math.PI * (4 / 3);
  const radiusLabel = <MJ i={`\\epsilon = ${hoveredEpsilon}`} />;
  const ball = <SvgBall className="limit-2D-epsilon-ball"
                        cx={limitPos.x}
                        cy={limitPos.y}
                        r={ballRadius}
                        radiusAngle={radiusAngle}
                        radiusLabel={radiusLabel}
                        fill={Colors.YELLOW} />;
  const sequenceLabel = (
    <foreignObject className="limit-2D-sequence-label" x={fullWidth * 0.5} y={fullHeight * 0.2} width={300}>
      All <MJ i={"a_n"} /> that have <MJ i={`n \\gt N = ${hoveredN}`} />
    </foreignObject>
  );
  return (
    <SvgWidget width={fullWidth} height={fullHeight}>
      {ball}
      {!_.isNull(hoveredN) && sequenceLabel}
      {sequence}
      {limitPoint}
    </SvgWidget>
  );
}

Limit2D.propTypes = {
  hoveredEpsilon: PropTypes.number,
  hoveredN: PropTypes.number,
};

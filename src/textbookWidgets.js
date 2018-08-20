import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import _ from 'lodash';

import IM from './katex';
import Colors from './colors';
import SvgWidget, { SvgPoint, SvgBall, SvgSequence } from './svgComponents';


export class Limit2D extends Component {
  static propTypes = {
    hoveredEpsilon: PropTypes.number,
    hoveredN: PropTypes.number,
    pendingAnimation: PropTypes.string,
    clearPendingAnimation: PropTypes.func.isRequired,
  }

  state = {
    currentAnimation: null,
    currentAnimationStep: null,
    animationIntervalId: null,
  }

  ANIMATIONS = [
    {
      key: 'challengeResponse',
      steps: [
        { epsilon: 2, N: -1, },
        { epsilon: 2, N: 3, },
        { epsilon: 1, N: 3, },
        { epsilon: 1, N: 5, },
        { epsilon: 0.5, N: 5, },
        { epsilon: 0.5, N: 7, },
      ],
      stepDelay: 2000,
    }
  ]

  componentDidUpdate(prevProps) {
    const { pendingAnimation, clearPendingAnimation } = this.props;
    const isNewAnimationTriggered = prevProps.pendingAnimation !== pendingAnimation && pendingAnimation;
    if (isNewAnimationTriggered) {
      clearInterval(this.state.animationIntervalId);
      clearPendingAnimation(() => {
        this.setState({
          currentAnimation: pendingAnimation,
          currentAnimationStep: 0,
          animationIntervalId: null,
        }, () => {
          const { stepDelay } = _.find(this.ANIMATIONS, { key: this.state.currentAnimation });
          const intervalId = setInterval(() => {
            const { steps } = _.find(this.ANIMATIONS, { key: this.state.currentAnimation });
            if (this.state.currentAnimationStep > steps.length-1) {
              clearInterval(intervalId);
              this.setState({
                currentAnimation: null,
                currentAnimationStep: null,
                animationIntervalId: null,
              });
            } else {
              this.setState({ currentAnimationStep: this.state.currentAnimationStep + 1 });
            }
          }, stepDelay);
          this.setState({ animationIntervalId: intervalId });
        });
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.animationIntervalId);
  }

  render() {
    const { hoveredEpsilon, hoveredN } = this.props;
    const { currentAnimation, currentAnimationStep } = this.state;
    const animation = _.find(this.ANIMATIONS, { key: currentAnimation });
    let epsilon, N;
    if (animation) {
      const animationStepValues = animation.steps[currentAnimationStep];
      epsilon = animationStepValues ? animationStepValues.epsilon : hoveredEpsilon;
      N = animationStepValues ? animationStepValues.N : hoveredN;
    } else {
      epsilon = hoveredEpsilon;
      N = hoveredN;
    }
    console.log('epsilon', epsilon);
    console.log('N', N);

    const fullWidth = 550
    const fullHeight = 350
    const sequencePoints = _.map([
      { cx: 0.05, cy: 0.15 },
      { cx: 0.06, cy: 0.4 },
      { cx: 0.1, cy: 0.7 },
      { cx: 0.4, cy: 0.5 },
      { cx: 0.6, cy: 0.55 },
      { cx: 0.58, cy: 0.35 },
      { cx: 0.64, cy: 0.40 },
      { cx: 0.67, cy: 0.43 },
      { cx: 0.7, cy: 0.46, label: '…' },
      { cx: 0.72, cy: 0.47, label: null },
      { cx: 0.73, cy: 0.48, label: null },
      { cx: 0.74, cy: 0.49, label: null },
    ], ({ cx, cy, label }) => ({
      cx: cx * fullWidth,
      cy: cy * fullHeight,
      fill: Colors.BLUE,
      label,
    }));

    if (_.isNumber(N)) {
      const start = N + 1;
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
                                 label={<IM m={"a"} />}
                                 bold={true}
                                 fill={Colors.RED} />;
    const ballRadius = (epsilon || 0) * 70;
    const radiusAngle = Math.PI * (4 / 3);
    const radiusLabel = <IM m={`\\epsilon = ${epsilon}`} />;
    const ball = <SvgBall className="limit-2D-epsilon-ball"
                          cx={limitPos.x}
                          cy={limitPos.y}
                          r={ballRadius}
                          radiusAngle={radiusAngle}
                          radiusLabel={radiusLabel}
                          fill={Colors.YELLOW} />;
    const sequenceLabel = (
      <foreignObject className="limit-2D-sequence-label" x={fullWidth * 0.35} y={fullHeight * 0.2} width={300}>
        All <IM m={"a_n"} /> that have <IM m={`n \\gt N = ${N}`} />
      </foreignObject>
    );
    return (
      <SvgWidget width={fullWidth} height={fullHeight}>
        {ball}
        {_.isNumber(N) && sequenceLabel}
        {sequence}
        {limitPoint}
      </SvgWidget>
    );
  }
}

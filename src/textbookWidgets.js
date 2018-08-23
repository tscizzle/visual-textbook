import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import _ from 'lodash';
import classNames from 'classnames';
import { IconContext } from 'react-icons';
import { FaPlay, FaPause, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import IM from './katex';
import Colors from './colors';
import SvgWidget, { SvgPoint, SvgBall, SvgSequence } from './svgComponents';


const withAnimations = (animations) => {
  return WrappedComponent => {
    return class extends Component {
      static propTypes = {
        pendingAnimation: PropTypes.string,
        markOffPendingAnimation: PropTypes.func.isRequired,
      }

      state = {
        currentAnimationKey: null,
        currentAnimationStep: null,
        animationIntervalId: null,
        isAnimationPaused: true,
      }

      ANIMATIONS = _.cloneDeep(animations)

      currentAnimation = () => {
        const animation = _.find(this.ANIMATIONS, { key: this.state.currentAnimationKey });
        return animation;
      }

      animationStepValues = () => {
        const animation = this.currentAnimation();
        return animation ? animation.steps[this.state.currentAnimationStep] : null;
      }

      animationTotalSteps = () => {
        const animation = this.currentAnimation();
        return animation ? animation.steps.length : null;
      }

      animationPercentageDone = () => {
        const percentageDone = this.animationTotalSteps()
          ? Math.min(((this.state.currentAnimationStep + 1) / (this.animationTotalSteps() + 1)) * 100, 100)
          : 100;
        return percentageDone;
      }

      clearAnimationInterval = () => {
        clearInterval(this.state.animationIntervalId);
      }

      setAnimationIntervalId = intervalId => {
        this.clearAnimationInterval();
        this.setState({ animationIntervalId: intervalId });
      }

      createAnimationInterval = () => {
        const animation = _.find(this.ANIMATIONS, { key: this.state.currentAnimationKey });
        if (animation) {
          const { stepDelay } = animation;
          const intervalId = setInterval(() => {
            const animation = _.find(this.ANIMATIONS, {
              key: this.state.currentAnimationKey,
            });
            if (animation) {
              const { steps } = animation;
              if (this.state.currentAnimationStep >= steps.length-1) {
                this.setState({
                  currentAnimationKey: null,
                  currentAnimationStep: null,
                });
              } else {
                this.setState({ currentAnimationStep: this.state.currentAnimationStep + 1 });
              }
            }
          }, stepDelay);
          this.setAnimationIntervalId(intervalId);
        }
      }

      setIsAnimationPaused = pausedValue => {
        this.setState({ isAnimationPaused: pausedValue }, () => {
          if (this.state.isAnimationPaused) {
            this.clearAnimationInterval();
          } else {
            this.createAnimationInterval();
          }
        });
      }

      changeCurrentAnimationStep = numSteps => {
        const { currentAnimationKey, currentAnimationStep } = this.state;
        if (currentAnimationKey) {
          const newStep = currentAnimationStep + numSteps;
          const boundedStep = Math.min(Math.max(newStep, 0), this.animationTotalSteps());
          this.setState({ currentAnimationStep: boundedStep }, () => {
            this.setIsAnimationPaused(true);
          });
        }
      }

      componentDidUpdate(prevProps) {
        const { pendingAnimation, markOffPendingAnimation } = this.props;
        const isNewAnimationTriggered =
          prevProps.pendingAnimation !== pendingAnimation && pendingAnimation;
        if (isNewAnimationTriggered) {
          this.clearAnimationInterval();
          markOffPendingAnimation(() => {
            this.setState(
              {
                currentAnimationKey: pendingAnimation,
                currentAnimationStep: 0,
              },
              () => {
                this.setIsAnimationPaused(false);
              }
            );
          });
        }
      }

      componentWillUnmount() {
        this.clearAnimationInterval();
      }

      render() {
        const controlButtonClasses = ['clickable'];
        const controlButtonsDisabled = !this.state.currentAnimationKey;
        if (controlButtonsDisabled) {
          controlButtonClasses.push('disabled');
        }
        const leftButtonClasses = classNames(controlButtonClasses);
        const playButtonClasses = classNames(controlButtonClasses, 'play-animation');
        const pauseButtonClasses = classNames(controlButtonClasses, 'pause-animation');
        const rightButtonClasses = classNames(controlButtonClasses);
        return (
          <div className="animation-widget">
            <WrappedComponent
              animationStepValues={this.animationStepValues()}
              {...this.props}
            />
            <div className="animation-progress-control">
              <IconContext.Provider value={{color: Colors.GREEN, size: '1.2em'}}>
                <FaAngleLeft className={leftButtonClasses} onClick={() => this.changeCurrentAnimationStep(-1)} />
                {this.state.isAnimationPaused
                  ? <FaPlay className={playButtonClasses} onClick={() => this.setIsAnimationPaused(false)} />
                  : <FaPause className={pauseButtonClasses} onClick={() => this.setIsAnimationPaused(true)} />
                }
                <FaAngleRight className={rightButtonClasses} onClick={() => this.changeCurrentAnimationStep(1)} />
              </IconContext.Provider>
            </div>
            <div className="animation-progress-bar" style={{width: `${this.animationPercentageDone()}%`}}></div>
          </div>
        );
      }
    }
  }
}


class Limit2D extends Component {
  static propTypes = {
    hoveredEpsilon: PropTypes.number,
    hoveredN: PropTypes.number,
    animationStepValues: PropTypes.object,
  }

  render() {
    const { hoveredEpsilon, hoveredN, animationStepValues } = this.props;
    let epsilon, N;
    if (animationStepValues) {
      epsilon = animationStepValues ? animationStepValues.epsilon : hoveredEpsilon;
      N = animationStepValues ? animationStepValues.N : hoveredN;
    } else {
      epsilon = hoveredEpsilon;
      N = hoveredN;
    }

    const fullWidth = 550;
    const fullHeight = 350;
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
    ], ({ cx, cy, label }, n) => ({
      cx: cx * fullWidth,
      cy: cy * fullHeight,
      fill: Colors.BLUE,
      label: n === N ? `a_${n} = a_N` : label,
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
    const limitPoint = (
      <SvgPoint
        cx={limitPos.x}
        cy={limitPos.y}
        label={<IM m={"a"} />}
        bold={true}
        fill={Colors.RED}
      />
    );
    const ballRadius = (epsilon || 0) * 70;
    const radiusAngle = Math.PI * (4 / 3);
    const radiusLabel = <IM m={`\\epsilon = ${epsilon}`} />;
    const ball = (
      <SvgBall
        className="limit-2D-epsilon-ball"
        cx={limitPos.x}
        cy={limitPos.y}
        r={ballRadius}
        radiusAngle={radiusAngle}
        radiusLabel={radiusLabel}
        fill={Colors.YELLOW}
      />
    );
    const sequenceLabel = (
      <foreignObject
        className="limit-2D-sequence-label"
        x={fullWidth * 0.05}
        y={fullHeight * 0.8}
        width={300}
      >
        All <IM m={"a_n"} /> that have <IM m={`n \\gt N`} /> (<IM m={`N = ${N}`} />)
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

const Limit2DAnimations = [
  {
    key: 'challengeResponse',
    steps: [
      { epsilon: 2, N: null, },
      { epsilon: 2, N: 3, },
      { epsilon: 1, N: 3, },
      { epsilon: 1, N: 5, },
      { epsilon: 0.5, N: 5, },
      { epsilon: 0.5, N: 7, },
    ],
    stepDelay: 1500,
  }
];

export const Limit2DWithAnimations = withAnimations(Limit2DAnimations)(Limit2D);

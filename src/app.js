import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import classNames from 'classnames';

import IM from './katex';
import { Limit2DWithAnimations } from './textbookWidgets';


class App extends Component {
  state = {
    hoveredEpsilon: null,
    hoveredN: null,
    pendingAnimation: null,
  }

  setHoveredEpsilonFunc = epsilonValue => {
    return () => {
      this.setState({ hoveredEpsilon: epsilonValue });
    };
  }

  setHoveredNFunc = NValue => {
    return () => {
      this.setState({ hoveredN: NValue });
    };
  }

  setPendingAnimation = (animationKey, callback) => {
    this.setState({ pendingAnimation: animationKey }, callback);
  }

  render() {
    return (
      <div className="content">
        <div className="section-header-row">
          <div className="section-header">
            The limit of <IM m={"(a_n)"} /> is <IM m={"a"} />
          </div>
          <div className="section-subheader">
            For all <IM m={"\\epsilon \\gt 0"} />, there exists <IM m={"N"} /> such that <IM m={"n \\gt N"} /> implies <IM m={"\\lvert a_n - a \\rvert \\lt \\epsilon"} />
          </div>
        </div>
        <div className="explanation-pair">
          <div className="visual-explanation">
            <Limit2DWithAnimations
              hoveredEpsilon={this.state.hoveredEpsilon}
              hoveredN={this.state.hoveredN}
              pendingAnimation={this.state.pendingAnimation}
              markOffPendingAnimation={(callback) => this.setPendingAnimation(null, callback)}
            />
          </div>
          <div className="words-and-symbols-explanation">
            <p>
              Take a sequence <IM m={"(a_n)"} />. These equivalent statements:
            </p>
            <ol className="centered">
              <li>
                The limit of <IM m={"(a_n)"} /> is <IM m={"a"} />.
              </li>
              <li>
                <IM m={"\\lim{a_n} = a"} />
              </li>
              <li>
                <IM m={"(a_n) \\rightarrow a"} />
              </li>
              <li>
                <IM m={"(a_n)"} /> converges to <IM m={"a"} />.
              </li>
            </ol>
            <p>
              all mean that <b>the sequence <IM m={"(a_n)"} /> "approaches" <IM m={"a"} /></b>.
            </p>
            <p>
              While that is true, it's not a full, rigorous definition. Rigorously, <IM m={"\\lim{a_n} = a"} /> means:
            </p>
            <p className="centered">
              <b>
                For all <IM m={"\\epsilon \\gt 0"} />, there exists <IM m={"N"} /> such that <IM m={"n \\gt N"} /> implies <IM m={"\\lvert a_n - a \\rvert \\lt \\epsilon"} />
              </b>
            </p>
            <p>
              What does this complicated-looking definition have to do with "approaching" something?
            </p>
            <p>
              Let's break it down piece by piece, with visuals.
            </p>
            <Divider />
            <p>
              To start, consider the predicate at the end: <IM m={"\\lvert a_n - a \\rvert \\lt \\epsilon"} />
            </p>
            <p>
              This is another way of saying "<IM m={"a_n"} /> and <IM m={"a"} /> are less than <IM m={"\\epsilon"} /> distance apart".
            </p>
            <p>
              Being less than <IM m={"\\epsilon"} /> away from <IM m={"a"} /> is the same as being inside a "ball" or "neighborhood" that is centered around <IM m={"a"} /> and has radius <IM m={"\\epsilon"} />.
            </p>
            <WidgetControlBox header={<span>Hover over each <IM m={"\\epsilon"} /> value to see what these <IM m={"\\epsilon"} />-neighborhoods look like</span>}>
              <WidgetValueSetter
                valueName={"\\epsilon"}
                value={2}
                setValueFunc={this.setHoveredEpsilonFunc}
                currentValue={this.state.hoveredEpsilon}
              />
              <WidgetValueSetter
                valueName={"\\epsilon"}
                value={1}
                setValueFunc={this.setHoveredEpsilonFunc}
                currentValue={this.state.hoveredEpsilon}
              />
              <WidgetValueSetter
                valueName={"\\epsilon"}
                value={0.5}
                setValueFunc={this.setHoveredEpsilonFunc}
                currentValue={this.state.hoveredEpsilon}
              />
            </WidgetControlBox>
            <p>
              So when you see <IM m={"\\lvert a_n - a \\rvert \\lt \\epsilon"} />, think
              "<IM m={"a_n"} /> is within that yellow ball of radius <IM m={"\\epsilon"} />".
            </p>
            <Divider />
            <p>
              Next, let's talk about <IM m={"n \\gt N"} />.
            </p>
            <p>
              We all know what "greater than" means, but since we're talking about a sequence, let's make it visual.
            </p>
            <p>
              <IM m={"n"} /> here is the index for some point in the sequence. So is <IM m={"N"} />.
            </p>
            <p>
              If the index <IM m={"n"} /> is greater than the index <IM m={"N"} />, that means "<IM m={"a_n"} /> is further along in the sequence than <IM m={"a_N"} />".
            </p>
            <WidgetControlBox header={<span>Hover over each <IM m={"N"} /> value to highlight all the <IM m={"a_n"} /> that have <IM m={"n \\gt N"} /></span>}>
              <WidgetValueSetter
                valueName={"N"}
                value={1}
                setValueFunc={this.setHoveredNFunc}
                currentValue={this.state.hoveredN}
              />
              <WidgetValueSetter
                valueName={"N"}
                value={3}
                setValueFunc={this.setHoveredNFunc}
                currentValue={this.state.hoveredN}
              />
              <WidgetValueSetter
                valueName={"N"}
                value={5}
                setValueFunc={this.setHoveredNFunc}
                currentValue={this.state.hoveredN}
              />
            </WidgetControlBox>
            <Divider />
            <p>
              Now put these concepts together, linked by the word "implies".
            </p>
            <p className="centered">
              <b>
                <IM m={"n \\gt N"} /> implies <IM m={"\\lvert a_n - a \\rvert \\lt \\epsilon"} />
              </b>
            </p>
            <p>
              means "every point further along in the sequence than <IM m={"a_N"} /> is within that yellow ball of radius <IM m={"\\epsilon"} />".
            </p>
            <Divider />
            <p>
              Now let's go to the beginning of the definition.
            </p>
            <p className="centered">
              <b>
                For all <IM m={"\\epsilon \\gt 0"} />, there exists <IM m={"N"} /> such that
              </b>
            </p>
            <p>
              When you see <b>For all __ there exists __</b>, think <b>challenge / response</b>.
            </p>
            <p>
              Given any <IM m={"\\epsilon \\gt 0"} /> as a "challenge", you can come up with some <IM m={"N"} /> as a "response".
            </p>
            <p>
              "No matter how small a yellow ball someone challenges you with, you can respond with a point far enough along in the sequence to satisfy them."
            </p>
            <p>
              By "satisfy them", we mean make the following statement true:
            </p>
            <p className="centered">
              <b>
                <IM m={"n \\gt N"} /> implies <IM m={"\\lvert a_n - a \\rvert \\lt \\epsilon"} />
              </b>
            </p>
            <p>
              which we said earlier meant "every point further along in the sequence than <IM m={"a_N"} /> is within that yellow ball."
            </p>
            <WidgetControlBox>
              <WidgetAnimationTrigger
                label={<span>See Animation of <IM m={"\\epsilon"} /> / <IM m={"N"} /> Challenge / Response</span>}
                triggerAnimation={() => this.setPendingAnimation('challengeResponse')}
              />
            </WidgetControlBox>
            <p>
              Combining it all in plain language, we get:
            </p>
            <p className="centered">
              <b>
                No matter how small a yellow ball you are challenged with, you can respond with a point far enough along in the sequence
                that every point past it is within that yellow ball.
              </b>
            </p>
            <p>
              When you think about it, this starts to line up with the intuition we started with of "approaching" <IM m={"a"} />.
            </p>
            <p>
              It's saying you can choose smaller and smaller yellow balls, and you'll always be able to find
              a point in the sequence such that the entire (infinite) rest of the sequence lies within that tiny ball.
            </p>
          </div>
        </div>
      </div>
    );
  }
}


export default App;


const Divider = () => (
  <div className="divider"></div>
)


const NiceButton = ({ className, children, ...otherProps }) => {
  const buttonClassName = classNames('nice-button', className);
  return (
    <button className={buttonClassName} {...otherProps}>
      {children}
    </button>
  );
};


const WidgetControlBox = ({ header, children }) => {
  return (
    <div className="widget-control-box">
      {header &&
        <div className="widget-control-box-header">
          {header}
        </div>
      }
      <div className="widget-control-box-content">
        {children}
      </div>
    </div>
  );
};

WidgetControlBox.propTypes = {
  header: PropTypes.object,
};


const WidgetValueSetter = ({ valueName, value, setValueFunc, currentValue }) => {
  const selectedClass = classNames({
    selected: value === currentValue
  });
  return (
    <a
      className={`widget-control-element widget-value-setter ${selectedClass}`}
      href="#widget"
      onMouseEnter={setValueFunc(value)}
      onMouseLeave={setValueFunc(null)}
    >
      <IM m={`${valueName} = ${value}`} />
    </a>
  );
};

WidgetValueSetter.propTypes = {
  valueName: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  setValueFunc: PropTypes.func.isRequired,
  currentValue: PropTypes.number,
};


const WidgetAnimationTrigger = ({ label, triggerAnimation }) => {
  return (
    <NiceButton className="widget-control-element widget-animation-setter" onClick={triggerAnimation}>
      {label}
    </NiceButton>
  );
};

WidgetAnimationTrigger.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  triggerAnimation: PropTypes.func.isRequired,
};

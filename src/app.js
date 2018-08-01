import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import classNames from 'classnames';
import MathJax from 'react-mathjax';

import MJ from './mathjax';
import Colors from './colors';
import { Limit2D } from './textbookWidgets';


class App extends Component {
  state = {
    hoveredEpsilon: null,
    hoveredN: null,
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

  render() {
    return (
      <MathJax.Provider>
        <div className="content">
          <div className="section-header">
            Understanding the Definition of a Limit
          </div>
          <div className="section-subheader">
            For all <MJ i={"\\epsilon \\gt 0"} />, there exists <MJ i={"N \\in \\mathbb{N}"} /> such that <MJ i={"n \\gt N"} /> implies <MJ i={"\\lvert a_n - a \\rvert \\lt \\epsilon"} />
          </div>
          <div className="explanation-pair">
            <div className="visual-explanation">
              <Limit2D hoveredEpsilon={this.state.hoveredEpsilon} hoveredN={this.state.hoveredN} />
            </div>
            <div className="words-and-symbols-explanation">
              <p>
                You may have seen any of these (which each mean the same thing):
              </p>
              <ol className="centered">
                <li>
                  The limit of <MJ i={"(a_n)"} /> is <MJ i={"a"} />.
                </li>
                <li>
                  <MJ i={"\\lim{a_n} = a"} />
                </li>
                <li>
                  <MJ i={"(a_n) \\rightarrow a"} />
                </li>
                <li>
                  <MJ i={"(a_n)"} /> converges to <MJ i={"a"} />.
                </li>
              </ol>
              <p>
                and been told that it means <b>the sequence <MJ i={"(a_n)"} /> "approaches" <MJ i={"a"} /></b>.
              </p>
              <p>
                That is true, but it's not a full, rigorous definition. Rigorously, <MJ i={"\\lim{a_n} = a"} /> means:
              </p>
              <p className="centered">
                <b>
                  For all <MJ i={"\\epsilon \\gt 0"} />, there exists <MJ i={"N \\in \\mathbb{N}"} /> such that <MJ i={"n \\gt N"} /> implies <MJ i={"\\lvert a_n - a \\rvert \\lt \\epsilon"} />
                </b>
              </p>
              <p>
                What does this complicated-looking definition have to do with "approaching" something?
              </p>
              <p>
                Let's break it down piece by piece, with visuals.
              </p>
              <p>
                To start, consider the predicate at the end: <MJ i={"\\lvert a_n - a \\rvert \\lt \\epsilon"} />
              </p>
              <p>
                This is another way of saying "<MJ i={"a_n"} /> and <MJ i={"a"} /> are less than <MJ i={"\\epsilon"} /> distance apart".
              </p>
              <p>
                Being less than <MJ i={"\\epsilon"} /> away from <MJ i={"a"} /> is the same as being inside a "ball" or "neighborhood" that is centered around <MJ i={"a"} /> and has radius <MJ i={"\\epsilon"} />.
              </p>
              <p>
                Hover over each <MJ i={"\\epsilon"} /> value to see what these <MJ i={"\\epsilon"} />-neighborhoods look like:
              </p>
              <div className="centered">
                <WidgetValueSetter valueName={"\\epsilon"}
                                   value={0.5}
                                   setValueFunc={this.setHoveredEpsilonFunc}
                                   currentValue={this.state.hoveredEpsilon} />
                <WidgetValueSetter valueName={"\\epsilon"}
                                   value={1}
                                   setValueFunc={this.setHoveredEpsilonFunc}
                                   currentValue={this.state.hoveredEpsilon} />
                <WidgetValueSetter valueName={"\\epsilon"}
                                   value={2}
                                   setValueFunc={this.setHoveredEpsilonFunc}
                                   currentValue={this.state.hoveredEpsilon} />
              </div>
              <p>
                So when you see <MJ i={"\\lvert a_n - a \\rvert \\lt \\epsilon"} />, think "<MJ i={"a_n"} /> is within that yellow ball of radius <MJ i={"\\epsilon"} />".
              </p>
              <p>
                Next, let's talk about <MJ i={"n \\gt N"} />
              </p>
              <p>
                We all know what "greater than" means, but since we're talking about a sequence, let's make it visual.
              </p>
              <p>
                <MJ i={"n"} /> here is the index for some point in the sequence. So is <MJ i={"N"} />.
              </p>
              <p>
                If the index <MJ i={"n"} /> is greater than the index <MJ i={"N"} />, that means "<MJ i={"a_n"} /> is further along in the sequence than <MJ i={"a_N"} />".
              </p>
              <p>
                Hover over each <MJ i={"N"} /> value to highlight all the <MJ i={"a_n"} /> that have <MJ i={"n \\gt N"} />
              </p>
              <div className="centered">
                <WidgetValueSetter valueName={"N"}
                                   value={1}
                                   setValueFunc={this.setHoveredNFunc}
                                   currentValue={this.state.hoveredN} />
                <WidgetValueSetter valueName={"N"}
                                   value={3}
                                   setValueFunc={this.setHoveredNFunc}
                                   currentValue={this.state.hoveredN} />
                <WidgetValueSetter valueName={"N"}
                                   value={5}
                                   setValueFunc={this.setHoveredNFunc}
                                   currentValue={this.state.hoveredN} />
              </div>
            </div>
          </div>
        </div>
      </MathJax.Provider>
    );
  }
}


export default App;


const WidgetValueSetter = ({ valueName, value, setValueFunc, currentValue }) => {
  const selectedClass = classNames({
    selected: value === currentValue
  });
  return (
    <a className={`widget-value-setter ${selectedClass}`}
       href="#widget"
       onMouseEnter={setValueFunc(value)}
       onMouseLeave={setValueFunc(null)}
       style={{color: Colors.YELLOW}}>
      <MJ i={`${valueName} = ${value}`} />
    </a>
  );
};

WidgetValueSetter.propTypes = {
  valueName: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  setValueFunc: PropTypes.func.isRequired,
  currentValue: PropTypes.number,
};

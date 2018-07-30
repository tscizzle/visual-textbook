import React, { Component } from 'react';

import MathJax from 'react-mathjax';

import { Limit2D } from './textbookWidgets';


class App extends Component {
  state = {
    hoveredEpsilon: null,
  }

  setHoveredEpsilonFunc = epsilon => {
    return () => {
      this.setState({ hoveredEpsilon: epsilon });
    };
  }

  render() {
    return (
      <MathJax.Provider>
        <div className="content">
          <div className="section-header">
            Understanding the Definition of a Limit
          </div>
          <div className="explanation-pair">
            <div className="visual-explanation">
              <Limit2D hoveredEpsilon={this.state.hoveredEpsilon} />
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
                <MJ i={"\\lvert x - a \\rvert \\lt \\epsilon"} /> is simply saying that <MJ i={"x"} /> and <MJ i={"a"} /> are less than <MJ i={"\\epsilon"} /> distance apart.
              </p>
              <p>
                The set of all <MJ i={"x"} /> that are less than <MJ i={"\\epsilon"} /> away from <MJ i={"a"} /> is what's called a "ball" or "neighborhood" around <MJ i={"a"} /> (with a radius of <MJ i={"\\epsilon"} />).
              </p>
              <p>
                Hover each <MJ i={"\\epsilon"} /> value to see what these <MJ i={"\\epsilon"} />-neighborhoods look like:
              </p>
              <div>
                <a className="widget-control-link"
                   href="#eps-1"
                   onMouseEnter={this.setHoveredEpsilonFunc(0.5)}
                   onMouseLeave={this.setHoveredEpsilonFunc(null)}>
                  <MJ i={"\\epsilon = 0.5"} />
                </a>
                <a className="widget-control-link"
                   href="#eps-2"
                   onMouseEnter={this.setHoveredEpsilonFunc(1)}
                   onMouseLeave={this.setHoveredEpsilonFunc(null)}>
                  <MJ i={"\\epsilon = 1"} />
                </a>
                <a className="widget-control-link"
                   href="#eps-3"
                   onMouseEnter={this.setHoveredEpsilonFunc(2)}
                   onMouseLeave={this.setHoveredEpsilonFunc(null)}>
                  <MJ i={"\\epsilon = 2"} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </MathJax.Provider>
    );
  }
}


export default App;


const MJ = ({ i }) => <MathJax.Node inline formula={i} />;

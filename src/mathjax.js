import React from 'react';
import { PropTypes } from 'prop-types';

import MathJax from 'react-mathjax';


const MJ = ({ i }) => <MathJax.Node className="inline-mathjax" inline formula={i} />;

MJ.propTypes = {
  i: PropTypes.string.isRequired,
};


export default MJ;

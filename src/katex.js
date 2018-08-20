import React from 'react';
import { PropTypes } from 'prop-types';

import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';


const IM = ({ m }) => <InlineMath className="inline-katex" math={m} />;

IM.propTypes = {
  m: PropTypes.string.isRequired,
};


export default IM;

import React, { ReactElement } from 'react';

import './Loader.scss';

/**
 * Component that represents a loading indicator.
 *
 * @component
 * @returns {ReactElement} The rendered Loader component.
 */
export const Loader = (): ReactElement => {
  return (
    <div className='loader-container'>
      <div className='loader'></div>
    </div>
  );
};

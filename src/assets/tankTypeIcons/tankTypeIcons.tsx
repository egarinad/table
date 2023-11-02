import React, { ReactElement } from 'react';

import { Classes } from 'types/tankTypes';

export const icons: Record<keyof typeof Classes, ReactElement> = {
  'AT-SPG': (
    <svg height='10' viewBox='0 0 12 10' width='12' xmlns='http://www.w3.org/2000/svg'>
      <path d='M0 0l6 10 6-10z' fill='#DFD9B7' fillRule='evenodd' />
    </svg>
  ),
  heavyTank: (
    <svg height='18' id='Layer_1' viewBox='0 0 15 18' width='15' xmlns='http://www.w3.org/2000/svg'>
      <g>
        <path d='M13.2 6.8l-7.5 9.1L7.5 18 15 9z' fill='#DFD9B7' fillRule='evenodd' />
        <path d='M10.3 3.4l-7.4 9.1 1.8 2.1 7.4-9z' fill='#DFD9B7' fillRule='evenodd' />
        <path d='M7.5 0L0 9l1.9 2.2 7.4-9z' fill='#DFD9B7' fillRule='evenodd' />
      </g>
    </svg>
  ),
  lightTank: (
    <svg height='13' viewBox='0 0 11 13' width='11' xmlns='http://www.w3.org/2000/svg'>
      <path d='M5.5 0L0 6.5 5.5 13 11 6.5z' fill='#DFD9B7' fillRule='evenodd' />
    </svg>
  ),
  mediumTank: (
    <svg height='15' viewBox='0 0 12 15' width='12' xmlns='http://www.w3.org/2000/svg'>
      <path d='M12 7.5L9.7 4.7l-6 7.5L6 15zM6 0L0 7.5l2.3 2.8 6-7.5z' fill='#DFD9B7' fillRule='evenodd' />
    </svg>
  ),
  SPG: (
    <svg height='8' viewBox='0 0 8 8' width='8' xmlns='http://www.w3.org/2000/svg'>
      <path d='M0 0h8v8H0z' fill='#DFD9B7' fillRule='evenodd' />
    </svg>
  ),
};

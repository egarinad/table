import React from 'react';

import { ErrorType } from 'types/tankTypes';
import './Error.scss';
import { AxiosError } from 'axios';

interface ErrorProps {
  error: AxiosError | ErrorType;
}

export const Error = ({ error }: ErrorProps) => {
  return (
    <div className={'error'}>
      {error.code}: {error.message}
    </div>
  );
};

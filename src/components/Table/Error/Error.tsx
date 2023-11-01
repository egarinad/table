import React from 'react';
import { AxiosError } from 'axios';

import { ErrorType } from 'types/tankTypes';
import './Error.scss';

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

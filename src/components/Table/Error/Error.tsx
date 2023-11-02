import React, { ReactElement } from 'react';
import { AxiosError } from 'axios';

import { ErrorType } from 'types/tankTypes';
import './Error.scss';

interface ErrorProps {
  error: AxiosError | ErrorType;
}

/**
 * Component for displaying error messages with a specific format.
 *
 * @component
 * @example
 * <Error
 *   error={errorObject}
 * />
 *
 * @param {ErrorProps} props - properties passed to the component.
 * @param {AxiosError | ErrorType} props.error - error object containing code and message properties.
 *
 * @returns {ReactElement} The rendered Error component displaying the error message.
 */
export const Error = ({ error }: ErrorProps): ReactElement => {
  return (
    <div className={'error'}>
      {error.code}: {error.message}
    </div>
  );
};

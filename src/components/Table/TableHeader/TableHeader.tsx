import React, { ReactElement } from 'react';
import debounce from 'lodash/debounce';

import './TableHeader.scss';

interface TableHeaderProps {
  limitPerPage: number;
  searchPlaceholder?: string;
  setFilteredName: React.Dispatch<React.SetStateAction<string>>;
  setLimitPerPage: React.Dispatch<React.SetStateAction<number>>;
}

export const TableHeader = ({
  limitPerPage,
  searchPlaceholder,
  setFilteredName,
  setLimitPerPage,
}: TableHeaderProps): ReactElement => {
  const onLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredName(e.target.value);
  };
  const debounceOnLimitChange = debounce(onLimitChange, 500);

  return (
    <div className={'table-header'}>
      <input
        className={'table-header__input table-header__input_filtered-name'}
        onChange={debounceOnLimitChange}
        placeholder={searchPlaceholder || 'Enter name'}
        type={'text'}
      />
      <input
        className={'table-header__input table-header__input_limit'}
        onChange={e => setLimitPerPage(Number(e.target.value.trim()))}
        placeholder={searchPlaceholder || 'On page'}
        type={'number'}
        value={limitPerPage}
      />
    </div>
  );
};

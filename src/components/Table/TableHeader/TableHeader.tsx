import React, { ReactElement, useState } from 'react';
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
  const [limit, setLimit] = useState<string | undefined>(limitPerPage.toString());
  const onFilteredNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredName(e.target.value.trim());
  };
  const onLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLimitPerPage(Number(e.target.value || 10));
  };
  const debounceOnFilteredNameChange = debounce(onFilteredNameChange, 500);
  const debounceOnLimitChange = debounce(onLimitChange, 500);

  return (
    <div className={'table-header'}>
      <div className={'table-header__input-container'}>
        <input
          className={'table-header__input table-header__input_filtered-name'}
          onChange={debounceOnFilteredNameChange}
          placeholder={searchPlaceholder || 'Enter name'}
          type={'text'}
        />
        <input
          className={'table-header__input table-header__input_limit'}
          onChange={e => {
            setLimit(e.target.value);
            debounceOnLimitChange(e);
          }}
          placeholder={searchPlaceholder || 'Default - 10'}
          type={'number'}
          value={limit}
        />
      </div>
      <div className={'table-header__column-names'}>
        <div className={'table-header__column-name table-header__column-name_name'}>Name</div>
        <div className={'table-header__column-name table-header__column-name_icon'}>Icon</div>
        <div className={'table-header__column-name table-header__column-name_type'}>Type</div>
        <div className={'table-header__column-name table-header__column-name_tier'}>Tier</div>
        <div className={'table-header__column-name table-header__column-name_nation'}>Nation</div>
      </div>
    </div>
  );
};

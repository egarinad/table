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
  const [limit, setLimit] = useState<number | undefined>(limitPerPage);
  const onFilteredNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounce(() => setFilteredName(e.target.value.trim()), 500)();
  };
  const onLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^(?:0|[1-9]\d*)$/.test(e.target.value) || e.target.value === '') {
      setLimit(e.target.value ? Number(e.target.value) : undefined);
      debounce(() => setLimitPerPage(Number(e.target.value || 10)), 500)();
    }
  };

  return (
    <div className={'table-header'}>
      <div className={'table-header__input-container'}>
        <input
          className={'table-header__input table-header__input_filtered-name'}
          onChange={onFilteredNameChange}
          placeholder={searchPlaceholder || 'Enter name'}
          type={'text'}
        />
        <input
          className={'table-header__input table-header__input_limit'}
          onChange={onLimitChange}
          placeholder={'Default - 10'}
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

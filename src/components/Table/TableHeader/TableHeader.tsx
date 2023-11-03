import React, { ReactElement, useState } from 'react';
import debounce from 'lodash/debounce';

import './TableHeader.scss';

interface TableHeaderProps {
  customClassName?: string;
  defaultLimitPerPage?: number;
  limitPerPage: number;
  searchPlaceholder?: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setFilteredName: React.Dispatch<React.SetStateAction<string>>;
  setLimitPerPage: React.Dispatch<React.SetStateAction<number>>;
  tableName?: string;
}

/**
 * Table header component providing search and filter options for the tanks list table.
 *
 * @component
 * @example
 * <TableHeader
 *   defaultLimitPerPage={15}
 *   limitPerPage={10}
 *   searchPlaceholder={'Enter name'}
 *   setCurrentPage={setCurrentPageFunction}
 *   setFilteredName={setFilteredNameFunction}
 *   setLimitPerPage={setLimitPerPageFunction}
 *   tableName={'Tank List'}
 * />
 *
 * @param {TableHeaderProps} props - properties passed to the component.
 * @param {string} [props.customClassName] - custom class to add styles to tableHeader styles.
 * @param {number} props.defaultLimitPerPage - initial number of items displayed per page.
 * @param {number} props.limitPerPage - current number of items displayed per page.
 * @param {string} props.searchPlaceholder - placeholder text for the search input field.
 * @param {React.Dispatch<React.SetStateAction<number>>} props.setCurrentPage - function to update the current active page.
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setFilteredName - function to set the filter based on tank names.
 * @param {React.Dispatch<React.SetStateAction<number>>} props.setLimitPerPage - function to set the number of items displayed per page.
 * @param {string} [props.tableName] - optional table name displayed above the data.
 *
 * @returns {ReactElement} The rendered TableHeader component.
 */
export const TableHeader = ({
  customClassName,
  defaultLimitPerPage,
  limitPerPage,
  searchPlaceholder,
  setCurrentPage,
  setFilteredName,
  setLimitPerPage,
  tableName,
}: TableHeaderProps): ReactElement => {
  const [limit, setLimit] = useState<string>(limitPerPage.toString());
  const onFilteredNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      setCurrentPage(1);
      setFilteredName(e.target.value.trim());
    }, 500)();
  };
  const onLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^(?:0|[1-9]\d*)$/.test(e.target.value) || e.target.value === '') {
      setLimit(e.target.value || '');
      debounce(() => {
        setCurrentPage(1);
        setLimitPerPage(Number(e.target.value || defaultLimitPerPage || 10));
      }, 500)();
    }
  };

  return (
    <div className={`table-header ${customClassName || ''}`}>
      <div className={'table-header__input-with-name'}>
        {tableName && <div className={'table-header__name'}>{tableName}</div>}
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
            placeholder={`Default - ${defaultLimitPerPage || 10}`}
            value={limit}
          />
        </div>
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

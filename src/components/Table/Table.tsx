import React, { ReactElement, useMemo, useRef, useState } from 'react';

import { useFetchTanks } from 'hooks/useFetchTanks';
import { escapeRegexSpecialCharacters, removeDiacritics } from 'helpers';
import { TableHeader } from './TableHeader';
import { TanksList } from './TanksList';
import { Pagination } from './Pagination';
import './Table.scss';

interface TableProps {
  defaultLimitPerPage?: number;
  paginationCustomClassName?: string;
  searchPlaceholder?: string;
  tableCustomClassName?: string;
  tableHeaderCustomClassName?: string;
  tableName?: string;
  tankListCustomClassName?: string;
}

/**
 * A table component for displaying tank data with search, pagination, and customizable options.
 *
 * @component
 * @example
 * <Table
 *  defaultLimitPerPage={15}
 *  searchPlaceholder={'Custom placeholder'}
 *  tableName={'Танкотека'}
 * />
 *
 * @param {TableProps} props - properties passed to the component.
 * @param {number} [props.defaultLimitPerPage] - initial number of items displayed per page, by default - 10.
 * @param {string} [props.paginationCustomClassName] - custom class to add styles to tankList styles.
 * @param {string} [props.searchPlaceholder] - placeholder text for the search input field.
 * @param {string} [props.tableCustomClassName] - custom class to add styles to table styles.
 * @param {string} [props.tableHeaderCustomClassName] - custom class to add styles to tankList styles.
 * @param {string} [props.tableName] - name of the table displayed above the data.
 * @param {string} [props.tankListCustomClassName] - custom class to add styles to tankList styles.
 *
 * @returns {ReactElement} Rendered Table component.
 */
export const Table = ({
  defaultLimitPerPage,
  paginationCustomClassName,
  searchPlaceholder,
  tableCustomClassName,
  tableHeaderCustomClassName,
  tableName,
  tankListCustomClassName,
}: TableProps): ReactElement => {
  const [filteredName, setFilteredName] = useState('');
  const [limitPerPage, setLimitPerPage] = useState(
    (defaultLimitPerPage !== undefined && Math.round(Math.abs(defaultLimitPerPage))) || 10
  );
  const [currentPage, setCurrentPage] = useState(1);
  const ref = useRef<HTMLDivElement>(null);

  const { data, error, loading } = useFetchTanks();

  const filteredTanks = useMemo(() => {
    if (!filteredName) return data;

    const regex = new RegExp(escapeRegexSpecialCharacters(filteredName), 'i');
    return data.filter(tank => regex.test(removeDiacritics(tank.name)));
  }, [data, escapeRegexSpecialCharacters, filteredName, removeDiacritics]);

  const tanksOnCurrentPage = useMemo(() => {
    if (limitPerPage === 0) return [];
    if (limitPerPage === undefined) return filteredTanks;

    const start = limitPerPage * (currentPage - 1);
    return filteredTanks.slice(start, start + limitPerPage);
  }, [currentPage, filteredTanks, limitPerPage]);

  return (
    <div className={`table ${tableCustomClassName}`} ref={ref}>
      <TableHeader
        customClassName={tableHeaderCustomClassName}
        defaultLimitPerPage={defaultLimitPerPage !== undefined ? Math.round(Math.abs(defaultLimitPerPage)) : undefined}
        limitPerPage={limitPerPage}
        searchPlaceholder={searchPlaceholder}
        setCurrentPage={setCurrentPage}
        setFilteredName={setFilteredName}
        setLimitPerPage={setLimitPerPage}
        tableName={tableName}
      />
      <TanksList customClassName={tankListCustomClassName} data={tanksOnCurrentPage} error={error} loading={loading} />
      {!loading && !error && !!tanksOnCurrentPage.length && (
        <div className={'table__pagination'}>
          <Pagination
            allItems={filteredTanks}
            currentPage={currentPage}
            customClassName={paginationCustomClassName}
            itemsPerPage={limitPerPage}
            scrollTo={() => ref.current?.scrollIntoView({ behavior: 'smooth' })}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

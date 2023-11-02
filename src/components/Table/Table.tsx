import React, { ReactElement, useMemo, useRef, useState } from 'react';

import { useFetchTanks } from 'hooks/useFetchTanks';
import { removeDiacritics } from 'helpers/removeDiacritics';
import { TableHeader } from './TableHeader';
import { TanksList } from './TanksList';
import { Pagination } from './Pagination';
import './Table.scss';

interface TableProps {
  defaultLimitPerPage?: number;
  searchPlaceholder?: string;
  tableName?: string;
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
 * @param {string} [props.searchPlaceholder] - placeholder text for the search input field.
 * @param {string} [props.tableName] - name of the table displayed above the data.
 *
 * @returns {ReactElement} Rendered Table component.
 */
export const Table = ({ defaultLimitPerPage, searchPlaceholder, tableName }: TableProps): ReactElement => {
  const [filteredName, setFilteredName] = useState('');
  const [limitPerPage, setLimitPerPage] = useState(defaultLimitPerPage || 10);
  const [currentPage, setCurrentPage] = useState(1);
  const ref = useRef<HTMLDivElement>(null);

  const { data, error, loading } = useFetchTanks();

  const filteredTanks = useMemo(() => {
    if (!filteredName) return data;

    const regex = new RegExp(filteredName, 'i'); // 'i' - флаг регистронезависимого поиска
    return data.filter(tank => regex.test(removeDiacritics(tank.name)));
  }, [data, filteredName, removeDiacritics]);

  const tanksOnCurrentPage = useMemo(() => {
    if (limitPerPage === 0) return [];
    if (limitPerPage === undefined) return filteredTanks;

    const start = limitPerPage * (currentPage - 1);
    return filteredTanks.slice(start, start + limitPerPage);
  }, [currentPage, filteredTanks, limitPerPage]);

  return (
    <div className={'table'} ref={ref}>
      <TableHeader
        defaultLimitPerPage={defaultLimitPerPage}
        limitPerPage={limitPerPage}
        searchPlaceholder={searchPlaceholder}
        setCurrentPage={setCurrentPage}
        setFilteredName={setFilteredName}
        setLimitPerPage={setLimitPerPage}
        tableName={tableName}
      />
      <TanksList data={tanksOnCurrentPage} error={error} loading={loading} />
      {!loading && !error && !!tanksOnCurrentPage.length && (
        <Pagination
          allItems={filteredTanks}
          currentPage={currentPage}
          itemsPerPage={limitPerPage}
          scrollTo={() => ref.current?.scrollIntoView({ behavior: 'smooth' })}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

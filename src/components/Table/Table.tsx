import React, { ReactElement, useMemo, useState } from 'react';

import { useFetchTanks } from 'hooks/useFetchTanks';
import { TableHeader } from './TableHeader';
import { TanksList } from './TanksList';
import { Loader } from './Loader';
import { Error } from './Error';
import { Pagination } from './Pagination';
import './Table.scss';

interface TableProps {
  defaultLimitPerPage?: number;
  searchPlaceholder?: string;
}

export const Table = ({ defaultLimitPerPage, searchPlaceholder }: TableProps): ReactElement => {
  const [filteredName, setFilteredName] = useState('');
  const [limitPerPage, setLimitPerPage] = useState(defaultLimitPerPage || 10);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, loading, meta } = useFetchTanks();

  const removeDiacritics = (text: string): string => {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  const currentTanks = useMemo(() => {
    if (!filteredName) return data;
    const regex = new RegExp(filteredName, 'i'); // 'i' - флаг регистронезависимого поиска
    return data.filter(tank => regex.test(removeDiacritics(tank.name)));
  }, [data, filteredName, removeDiacritics]);

  const tanksOnCurrentPage = useMemo(() => {
    if (!limitPerPage) return currentTanks;
    const start = limitPerPage * (currentPage - 1);
    return currentTanks.slice(start, start + limitPerPage);
  }, [currentPage, currentTanks, limitPerPage]);

  return (
    <div className={'table'}>
      <TableHeader
        limitPerPage={limitPerPage}
        searchPlaceholder={searchPlaceholder}
        setFilteredName={setFilteredName}
        setLimitPerPage={setLimitPerPage}
      />
      {loading ? <Loader /> : error ? <Error error={error} /> : <TanksList data={tanksOnCurrentPage} />}
      {!loading && !error && currentTanks && (
        <Pagination
          allItems={currentTanks}
          currentPage={currentPage}
          itemsPerPage={limitPerPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

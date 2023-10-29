import React, { ReactElement, useMemo, useState } from 'react';

import { useFetchTanks } from 'hooks/useFetchTanks';
import { TableHeader } from './TableHeader';
import { TanksList } from './TanksList';
// import { Pagination } from './Pagination';
import './Table.scss';

interface TableProps {
  defaultLimitPerPage?: number;
  searchPlaceholder?: string;
}

export const Table = ({ defaultLimitPerPage, searchPlaceholder }: TableProps): ReactElement => {
  const [filteredName, setFilteredName] = useState('');
  const [limitPerPage, setLimitPerPage] = useState(defaultLimitPerPage || 0);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, loading, meta } = useFetchTanks();

  const removeDiacritics = (text: string): string => {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  const sanitizeInput = (input: string): string => {
    return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  const currentTanks = useMemo(() => {
    if (!filteredName) return data;
    const sanitizedSearchTerm = sanitizeInput(filteredName);
    const regex = new RegExp(sanitizedSearchTerm, 'i'); // 'i' - флаг регистронезависимого поиска
    return data.filter(tank => regex.test(removeDiacritics(tank.name)));
  }, [data, filteredName, removeDiacritics, sanitizeInput]);

  const numOfPages = useMemo(() => {
    return Math.ceil(currentTanks.length / limitPerPage);
  }, [currentTanks.length, limitPerPage]);

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
      {loading ? 'Loading...' : <TanksList data={tanksOnCurrentPage} />}
      {/*{tanksOnCurrentPage.length ? (*/}
      {/*  <Pagination currentPage={currentPage} numOfPages={numOfPages} setCurrentPage={setCurrentPage} />*/}
      {/*) : (*/}
      {/*  'Loader...'*/}
      {/*)}*/}
    </div>
  );
};

import React, { ReactElement, useMemo, useRef, useState } from 'react';

import { useFetchTanks } from 'hooks/useFetchTanks';
import { TableHeader } from './TableHeader';
import { TanksList } from './TanksList';
import { Pagination } from './Pagination';
import './Table.scss';

interface TableProps {
  defaultLimitPerPage?: number;
  searchPlaceholder?: string;
  tableName?: string;
}

export const Table = ({ defaultLimitPerPage, searchPlaceholder, tableName }: TableProps): ReactElement => {
  const [filteredName, setFilteredName] = useState('');
  const [limitPerPage, setLimitPerPage] = useState(defaultLimitPerPage || 10);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, loading } = useFetchTanks();

  const ref = useRef<HTMLDivElement>(null);

  const removeDiacritics = (text: string): string => {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  const currentTanks = useMemo(() => {
    if (!filteredName) return data;
    const regex = new RegExp(filteredName, 'i'); // 'i' - флаг регистронезависимого поиска
    return data.filter(tank => regex.test(removeDiacritics(tank.name)));
  }, [data, filteredName, removeDiacritics]);

  const tanksOnCurrentPage = useMemo(() => {
    if (limitPerPage === 0) return [];
    if (limitPerPage === undefined) return currentTanks;
    const start = limitPerPage * (currentPage - 1);
    return currentTanks.slice(start, start + limitPerPage);
  }, [currentPage, currentTanks, limitPerPage]);

  return (
    <div className={'table'} ref={ref}>
      <TableHeader
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
          allItems={currentTanks}
          currentPage={currentPage}
          itemsPerPage={limitPerPage}
          scrollTo={() => ref.current?.scrollIntoView({ behavior: 'smooth' })}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

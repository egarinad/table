import React, { ReactElement, useCallback, useMemo, useState } from 'react';

import { useFetchTanks } from 'hooks/useFetchTanks';
import { TableHeader } from './TableHeader';
import { TanksList } from './TanksList';
import './Table.scss';

interface TableProps {
  defaultLimitPerPage?: number;
  searchPlaceholder?: string;
}

export const Table = ({ defaultLimitPerPage, searchPlaceholder }: TableProps): ReactElement => {
  const [filteredName, setFilteredName] = useState('');
  const [limitPerPage, setLimitPerPage] = useState(defaultLimitPerPage || 5);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, loading, meta } = useFetchTanks();

  const currentTanks = useMemo(() => {
    return filteredName ? data.filter(tank => tank.name.includes(filteredName)) : data;
  }, [currentPage, data, filteredName, limitPerPage]);
  console.log(currentTanks);

  return (
    <div className={'table'}>
      <TableHeader
        limitPerPage={limitPerPage}
        searchPlaceholder={searchPlaceholder}
        setFilteredName={setFilteredName}
        setLimitPerPage={setLimitPerPage}
      />
      {loading ? 'Loading...' : <TanksList data={currentTanks} />}
    </div>
  );
};

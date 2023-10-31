import React, { useState, useEffect, useCallback, ReactElement, useMemo } from 'react';

import { TankType } from 'types/tankTypes';
import './Pagination.scss';

interface PaginationProps {
  allItems: TankType[];
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination = ({ allItems, currentPage, itemsPerPage, setCurrentPage }: PaginationProps): ReactElement => {
  const [numPages, setNumPages] = useState<number>(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [JSON.stringify(allItems), itemsPerPage]);

  useEffect(() => {
    setNumPages(Math.ceil(allItems.length / itemsPerPage));
  }, [allItems, itemsPerPage]);

  const handlePrevClick = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage, setCurrentPage]);

  const handleNextClick = useCallback(() => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, numPages, setCurrentPage]);

  const handlePageClick = useCallback(
    (page: number) => {
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  const calculateVisiblePages = (): number => {
    const viewportWidth = window.innerWidth;
    if (viewportWidth >= 1200) {
      return 9;
    } else if (viewportWidth >= 820) {
      return 7;
    } else if (viewportWidth >= 600) {
      return 5;
    } else {
      return 3;
    }
  };

  const [visiblePages, setVisiblePages] = useState<number>(calculateVisiblePages());

  window.addEventListener('resize', () => {
    const currentVisiblePages = calculateVisiblePages();
    // console.log(visiblePage, currentVisiblePages);
    if (visiblePages !== currentVisiblePages) {
      // console.log('set', visiblePages, currentVisiblePages);
      setVisiblePages(prev => (prev !== currentVisiblePages ? currentVisiblePages : prev));
    }
  });

  console.log(visiblePages);

  const pages = useMemo(() => {
    const startPage =
      currentPage <= Math.floor(visiblePages / 2)
        ? 1
        : Math.min(currentPage - Math.floor(visiblePages / 2), numPages - visiblePages + 1);
    const endPage = Math.min(startPage + visiblePages - 1, numPages);
    return Array.from({ length: endPage - startPage + 1 }, (_, index) => index + startPage);
  }, [currentPage, numPages, visiblePages]);

  return (
    <div className='pagination'>
      <button
        className={`pagination__button pagination__button--prev ${
          currentPage === 1 ? 'pagination__button--disabled' : ''
        }`}
        disabled={currentPage === 1}
        onClick={handlePrevClick}
      >
        Prev
      </button>
      {!pages.includes(1) && visiblePages > 4 && (
        <>
          <button className={'pagination__button'} key={1} onClick={() => handlePageClick(1)}>
            1
          </button>
          {!pages.includes(2) && <div className={'pagination__ellipsis'}>...</div>}
        </>
      )}
      {pages.map(page => (
        <button
          className={`pagination__button ${page === currentPage ? 'pagination__button_active' : ''}`}
          key={page}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}
      {!pages.includes(numPages) && visiblePages > 4 && (
        <>
          {!pages.includes(numPages - 1) && <div className={'pagination__ellipsis'}>...</div>}
          <button className={'pagination__button'} key={numPages} onClick={() => handlePageClick(numPages)}>
            {numPages}
          </button>
        </>
      )}
      <button
        className={`pagination__button pagination__button_next ${
          currentPage === numPages ? 'pagination__button_disabled' : ''
        }`}
        disabled={currentPage === numPages}
        onClick={handleNextClick}
      >
        Next
      </button>
    </div>
  );
};

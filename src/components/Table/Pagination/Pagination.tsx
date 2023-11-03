import React, { useState, useEffect, useCallback, ReactElement, useMemo } from 'react';

import { usePaginationObserver } from 'hooks/usePaginationObserver';
import { TankType } from 'types/tankTypes';
import './Pagination.scss';

interface PaginationProps {
  allItems: TankType[];
  currentPage: number;
  customClassName?: string;
  itemsPerPage: number;
  scrollTo: () => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * <b>Pagination</b> component for navigating through a list of items, allowing users to switch between pages.
 *
 * @component
 * @example
 * <Pagination
 *   allItems={tankData}
 *   currentPage={currentPage}
 *   itemsPerPage={itemsPerPage}
 *   scrollTo={scrollToTop}
 *   setCurrentPage={setCurrentPage}
 * />
 *
 * @param {PaginationProps} props - properties passed to the component.
 * @param {TankType[]} props.allItems - array of items to be paginated.
 * @param {number} props.currentPage - current active page number.
 * @param {string} [props.customClassName] - custom class to add styles to pagination styles.
 * @param {number} props.itemsPerPage - number of items displayed per page.
 * @param {Function} props.scrollTo - function to scroll to the top of the component.
 * @param {Function} props.setCurrentPage - function to update the current active page.
 *
 * @returns {ReactElement} Rendered Pagination component.
 */
export const Pagination = ({
  allItems,
  currentPage,
  customClassName,
  itemsPerPage,
  scrollTo,
  setCurrentPage,
}: PaginationProps): ReactElement => {
  const [numPages, setNumPages] = useState<number>(1);

  const { targetRef, visiblePages } = usePaginationObserver();

  useEffect(() => {
    setCurrentPage(1);
    setNumPages(Math.ceil(allItems.length / itemsPerPage));
  }, [JSON.stringify(allItems), itemsPerPage]);

  const handlePrevClick = useCallback(() => {
    if (currentPage > 1) {
      scrollTo();
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage, setCurrentPage]);

  const handleNextClick = useCallback(() => {
    if (currentPage < numPages) {
      scrollTo();
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, numPages, setCurrentPage]);

  const handlePageClick = useCallback(
    (page: number) => {
      scrollTo();
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  const pages = useMemo(() => {
    const startPage =
      currentPage <= Math.floor(visiblePages / 2)
        ? 1
        : Math.min(currentPage - Math.floor(visiblePages / 2), numPages - visiblePages + 1) || 1;
    const endPage = Math.min(startPage + visiblePages - 1, numPages);
    return Array.from({ length: endPage - startPage + 1 }, (_, index) => index + startPage);
  }, [currentPage, numPages, visiblePages]);

  return (
    <div className={`pagination ${customClassName || ''}`} data-testid={'pagination'} ref={targetRef}>
      <button
        className={`pagination__button pagination__button_prev ${
          currentPage === 1 ? 'pagination__button_disabled' : ''
        }`}
        disabled={currentPage === 1}
        onClick={handlePrevClick}
      >
        Prev
      </button>
      {!pages.includes(1) && visiblePages > 3 && (
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
          onClick={() => {
            handlePageClick(page);
          }}
        >
          {page}
        </button>
      ))}
      {!pages.includes(numPages) && visiblePages > 3 && (
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

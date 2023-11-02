import React from 'react';
import { expect, describe, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

import { Table } from './Table';

const data = {
  data: {
    '1': {
      images: {
        contour_icon: 'http://api.tanki.su/static/2.75.1_lst/wot/encyclopedia/vehicle/contour/ussr-R04_T-34.png',
      },
      name: 'Т-34',
      nation: 'ussr',
      tier: 5,
      type: 'mediumTank',
    },
    '33': {
      images: {
        contour_icon: 'http://api.tanki.su/static/2.75.1_lst/wot/encyclopedia/vehicle/contour/usa-A21_T14.png',
      },
      name: 'T14',
      nation: 'usa',
      tier: 5,
      type: 'heavyTank',
    },
    '49': {
      images: {
        contour_icon: 'http://api.tanki.su/static/2.75.1_lst/wot/encyclopedia/vehicle/contour/china-Ch01_Type59.png',
      },
      name: 'Type 59',
      nation: 'china',
      tier: 8,
      type: 'mediumTank',
    },
    '81': {
      images: {
        contour_icon:
          'http://api.tanki.su/static/2.75.1_lst/wot/encyclopedia/vehicle/contour/uk-GB01_Medium_Mark_I.png',
      },
      name: 'Vickers Medium Mk. I',
      nation: 'uk',
      tier: 1,
      type: 'mediumTank',
    },
    '305': {
      images: {
        contour_icon: 'http://api.tanki.su/static/2.75.1_lst/wot/encyclopedia/vehicle/contour/china-Ch02_Type62.png',
      },
      name: 'Type 62',
      nation: 'china',
      tier: 7,
      type: 'lightTank',
    },
  },
  meta: {
    count: 5,
    limit: 5,
    page: 1,
    page_total: 163,
    total: 812,
  },
  status: 'ok',
};

const server = setupServer(
  http.get(
    'https://api.tanki.su/wot/encyclopedia/vehicles/?application_id=2b0adae8aa6efcbaf9abba08c10e8a3d&fields=images.contour_icon,+name,+nation,+tier,+type',
    () => {
      return HttpResponse.json(data);
    }
  )
);

const serverWithError = setupServer(
  http.get(
    'https://api.tanki.su/wot/encyclopedia/vehicles/?application_id=2b0adae8aa6efcbaf9abba08c10e8a3d&fields=images.contour_icon,+name,+nation,+tier,+type',
    () => {
      return HttpResponse.json({
        error: {
          code: '407',
          message: 'REQUEST_LIMIT_EXCEEDED',
        },
        status: 'error',
      });
    }
  )
);

const ResizeObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
}));
vi.stubGlobal('ResizeObserver', ResizeObserverMock);

describe('Table Component', () => {
  it('table component with mock data', async () => {
    server.listen({ onUnhandledRequest: 'error' });

    render(<Table defaultLimitPerPage={5} searchPlaceholder={'Custom placeholder'} />);

    await waitFor(() => expect(screen.getAllByTestId('tank-item')).toHaveLength(5));
    expect(Object.values(data.data).map(item => expect(screen.getByText(item.name))));
    let paginationChildren = screen.getByTestId('pagination').children;
    expect(paginationChildren).toHaveLength(3);

    const limitInput = screen.getByPlaceholderText('Default - 5');
    const searchInput = screen.getByPlaceholderText('Custom placeholder');

    fireEvent.change(limitInput, { target: { value: 2 } });
    await waitFor(() => expect(screen.getAllByTestId('tank-item')).toHaveLength(2));
    expect(screen.getByText('Т-34'));
    expect(screen.getByText('T14'));
    paginationChildren = screen.getByTestId('pagination').children;
    expect(paginationChildren).toHaveLength(5);

    fireEvent.change(limitInput, { target: { value: 5 } });
    fireEvent.change(searchInput, { target: { value: 'T' } });
    await waitFor(() => expect(screen.getAllByTestId('tank-item')).toHaveLength(3));
    expect(screen.getByText('Type 59'));
    expect(screen.getByText('Type 62'));
    expect(screen.getByText('T14'));
    expect(paginationChildren).toHaveLength(3);

    fireEvent.change(searchInput, { target: { value: '1234' } });
    await waitFor(() => expect(screen.getAllByTestId('tank-item')).toHaveLength(3));

    server.resetHandlers();
    server.close();
  });
  it('table component with error', async () => {
    serverWithError.listen({ onUnhandledRequest: 'error' });
    render(<Table />);
    await waitFor(() => expect(screen.getByText('407: REQUEST_LIMIT_EXCEEDED')));
    serverWithError.resetHandlers();
    serverWithError.close();
  });
});

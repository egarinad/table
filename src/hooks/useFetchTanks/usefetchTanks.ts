import { useEffect, useState } from 'react';
import { axiosInstance } from 'config/axios';
import { AxiosError } from 'axios';
import { ErrorType, MetaType, ResponseType, TankType } from 'types/tankTypes';

type StateType = {
  data: Array<TankType>;
  error: AxiosError | ErrorType | null;
  loading: boolean;
  meta: MetaType | null;
};

export const useFetchTanks = () => {
  const [state, setState] = useState<StateType>({
    data: [],
    error: null,
    loading: true,
    meta: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setState({ ...state, loading: true });
      try {
        const { data } = await axiosInstance.get<ResponseType>('', {
          params: {
            fields: 'crew, images.contour_icon, name, nation, tier, type',
            // limit: limitPerPage,
            // page_no: pageNum,
          },
          signal: controller.signal,
        });
        if (data.status === 'ok') {
          setState({
            ...state,
            data: Object.values(data.data),
            loading: false,
            meta: data.meta,
          });
        } else {
          setState({ ...state, error: { code: data.error.code, message: data.error.message }, loading: false });
        }
      } catch (error) {
        if ((error as any).name === 'CanceledError') {
          // do nothing
        } else {
          if (error instanceof AxiosError) setState({ ...state, error: error, loading: false });
          else setState({ ...state, error: { code: '404', message: 'Something went wrong' }, loading: false });
        }
      }
    };

    fetchData();
    return () => {
      controller.abort();
    };
  }, []);

  return state;
};

export type TankType = {
  name: string;
  nation: string;
  tier: number;
};

export interface DataType {
  [number: number]: TankType;
}

export type MetaType = {
  count: number;
  limit: number;
  page: number;
  page_total: number;
  total: number;
};
export type ErrorType = {
  code: string;
  message: string;
};

export type ResponseType =
  | {
      data: DataType;
      meta: MetaType;
      status: 'ok';
    }
  | {
      error: ErrorType;
      status: 'error';
    };

export type TankType = {
  crew: Array<any>;
  images: { contour_icon: string };
  name: string;
  nation: keyof typeof NationFlags;
  tier: keyof typeof Tiers;
  type: keyof typeof Class;
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

export enum Class {
  'heavyTank' = 'heavyTank',
  'AT-SPG' = 'AT-SPG',
  'mediumTank' = 'mediumTank',
  'lightTank' = 'lightTank',
  'SPG' = 'SPG',
}

export enum NationFlags {
  'china' = 'src/assets/flags/china.png',
  'czech' = 'src/assets/flags/czech.png',
  'france' = 'src/assets/flags/france.png',
  'germany' = 'src/assets/flags/germany.png',
  'italy' = 'src/assets/flags/italy.png',
  'japan' = 'src/assets/flags/japan.png',
  'poland' = 'src/assets/flags/poland.png',
  'sweden' = 'src/assets/flags/sweden.png',
  'uk' = 'src/assets/flags/uk.png',
  'usa' = 'src/assets/flags/usa.png',
  'ussr' = 'src/assets/flags/ussr.png',
}

export const Tiers = {
  '1': 'I',
  '2': 'II',
  '3': 'III',
  '4': 'IV',
  '5': 'V',
  '6': 'VI',
  '7': 'VII',
  '8': 'VIII',
  '9': 'IX',
  '10': 'X',
} as const;

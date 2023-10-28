import React from 'react';
import { TankType } from 'types/tankTypes';

import './TanksList.scss';

interface TanksListProps {
  data: Array<TankType>;
}

export const TanksList = ({ data }: TanksListProps) => {
  return (
    <div className={'tank-list'}>
      {data.map(tank => (
        <div className={'tank-list__item item'} key={tank.name}>
          <div className={'item__name'}>{tank.name}</div>
          <div className={'item__tier'}>{tank.tier}</div>
          <div className={'item__nation'}>{tank.nation}</div>
        </div>
      ))}
    </div>
  );
};

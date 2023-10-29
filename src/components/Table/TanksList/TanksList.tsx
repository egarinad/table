import React from 'react';

import { NationFlags, TankType, Tiers } from 'types/tankTypes';
import './TanksList.scss';

interface TanksListProps {
  data: Array<TankType>;
}

export const TanksList = ({ data }: TanksListProps) => {
  return (
    <div className={'tank-list'}>
      <div className={'tank-list__header'}></div>
      {data.length ? (
        data.map(tank => (
          <div className={'tank-list__item item'} key={tank.name}>
            <div className={'item__field item__field_name'}>{tank.name}</div>
            <div className={'item__field item__field_type'}>{tank.type}</div>
            <img alt={'icon'} className={'item__field item__field_icon'} src={tank.images.contour_icon} />
            <div className={'item__field item__field_tier'}>{Tiers[tank.tier]}</div>
            <img alt={'nation'} className={'item__field item__field_nation'} src={NationFlags[tank.nation]} />
          </div>
        ))
      ) : (
        <div>No data</div>
      )}
    </div>
  );
};

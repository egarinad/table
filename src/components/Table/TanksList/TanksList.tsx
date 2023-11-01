import React from 'react';
import { AxiosError } from 'axios';

import { ErrorType, NationFlags, TankType, Tiers } from 'types/tankTypes';
import { icons } from 'assets/tankTypeIcons';
import { Error } from 'components/Table/Error';
import { Loader } from 'components/Table/Loader';
import './TanksList.scss';

interface TanksListProps {
  data: Array<TankType>;
  error: AxiosError | ErrorType | null;
  loading: boolean;
}

export const TanksList = ({ data, error, loading }: TanksListProps) => {
  return (
    <div className={'tank-list'}>
      {error ? (
        <Error error={error} />
      ) : loading ? (
        <Loader />
      ) : data.length ? (
        data.map(tank => (
          <div className={'tank-list__item item'} key={tank.name}>
            <div className={'item__field item__field_name'}>{tank.name}</div>
            <div className={'item__field item__field_icon'}>
              <img alt={'icon'} src={tank.images.contour_icon} />
            </div>
            <div className={'item__field item__field_type'}>{icons[tank.type]}</div>
            <div className={'item__field item__field_tier'}>{Tiers[tank.tier]}</div>
            <div className={'item__field item__field_nation'}>
              <img alt={'nation'} src={NationFlags[tank.nation]} />
            </div>
          </div>
        ))
      ) : (
        <div className={'tank-list__no-data'}>No data found with you filters</div>
      )}
    </div>
  );
};

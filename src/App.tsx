import React from 'react';

import { Table } from 'components/Table';
import './index.css';

function App() {
  return (
    <div className={'wrapper'}>
      <Table
        defaultLimitPerPage={15}
        searchPlaceholder={'Custom placeholder'}
        // tableClassName={'tableCustomStyle'}
        tableName={'Танкотека'}
      />
    </div>
  );
}

export default App;

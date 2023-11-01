import React from 'react';

import { Table } from 'components/Table';
import './index.css';

function App() {
  return (
    <div className={'wrapper'}>
      <Table searchPlaceholder={'Custom placeholder'} tableName={'Танкотека'} />
    </div>
  );
}

export default App;

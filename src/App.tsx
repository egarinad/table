import React from 'react';

import { Table } from 'components/Table';
import './index.css';

function App() {
  return (
    <div className={'wrapper'}>
      <Table searchPlaceholder={'Custom placeholder'} tableName={'ТАНКОТЕКА'} />
    </div>
  );
}

export default App;

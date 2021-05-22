import './index.css';
import { Table } from './table/Table.js';

function App() {

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  const lorem = 'lorem ipsum dolor sit amet consectetur adipisicing elit asperiores officiis in ullam expedita rem quibusdam est odit possimus fugiat necessitatibus neque nostrum accusamus nam eaque assumenda excepturi odio delectus odit';
  const textArray = lorem.split(' ');

  const tableColumns = [
    { name: 'id', key: 'id' },
    { name: 'date', key: 'date' },
    { name: 'is valid', key: 'isValid' },
    { name: 'text', key: 'text' },
  ]

  const tableData = [];
  for(let i = 0; i < 314; i++) {
    const randomIndex = Math.floor(Math.random() * 30);
    tableData.push({
      id: i + 1,
      date: `${Math.round(getRandomArbitrary(10, 30))}.0${Math.round(getRandomArbitrary(1, 9))}.20${Math.round(getRandomArbitrary(10, 50))}`,
      isValid: Boolean(Math.round(Math.random())).toString(),
      text: textArray[randomIndex],
    })
  }

  return (
    <div className="container">
      <Table 
        columns={tableColumns}
        data={tableData}
        pagination={{initPage: 1, limitPerPage: 50}}
        tableName='Test table'
        grid='.5fr repeat(3, 1fr)'
      />
    </div>
  );
}

export default App;

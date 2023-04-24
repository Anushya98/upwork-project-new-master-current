import React, { useState, useEffect } from 'react';

function CountByMonthTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:5000/project');
      const data = await response.json();
      setData(data);
    }
    fetchData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Month</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        {data && data.map(item => (
          <tr key={item._id}>
            <td>{item._id}</td>
            <td>{item.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default CountByMonthTable;
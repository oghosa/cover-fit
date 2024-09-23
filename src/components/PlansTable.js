import { useState } from 'react';

export default function PlansTable({ plans }) {
  console.log('PlansTable received plans:', plans);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const sortedPlans = [...plans].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th onClick={() => requestSort('hmo')} className="cursor-pointer">HMO</th>
          <th onClick={() => requestSort('plan')} className="cursor-pointer">Plan</th>
          <th onClick={() => requestSort('priceRange')} className="cursor-pointer">Price Range</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {sortedPlans.map((plan) => (
          <tr key={plan.id}>
            <td>{plan.hmo}</td>
            <td>{plan.plan}</td>
            <td>{plan.priceRange}</td>
            <td>{plan.details}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

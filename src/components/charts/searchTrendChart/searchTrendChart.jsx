// components/SearchTrendChart.js

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './searchTrendChart.module.scss';

const SearchTrendChart = ({ data }) => {
  if (!data || data.length === 0) return <p>No trend data</p>;

  const formattedData = data.map(item => ({
    name: `${item.month.substring(0, 3)} ${item.year}`,
    value: item.value,
  }));

  return (
    <div className={styles.chartCard}>
      <h6>Monthly Search Trend</h6>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData} margin={{ top: 20, right: 20, left: -10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(val) => (val / 1_000_000) + 'M'} />
          <Tooltip formatter={(val) => val.toLocaleString()} />
          <Line type="monotone" dataKey="value" stroke="#fff" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SearchTrendChart;

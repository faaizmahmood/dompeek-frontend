// components/trafficChart/trafficChart.tsx
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const TrafficChart = ({ data }) => {
  const isValidData =
    data &&
    parseFloat(data.BounceRate) > 0 &&
    parseFloat(data.PagePerVisit) > 0 &&
    parseFloat(data.TimeOnSite) > 0;

  if (!isValidData) {
    return (
      <div className="text-center py-4">
        <h6 className="mb-2">Traffic Engagement</h6>
        <p style={{ color: '#999' }}>Not enough data to render traffic chart.</p>
      </div>
    );
  }

  const chartData = [
    { name: 'Bounce Rate', value: parseFloat(data.BounceRate) * 100 },
    { name: 'Pages per Visit', value: parseFloat(data.PagePerVisit) },
    { name: 'Avg. Time on Site (min)', value: parseFloat(data.TimeOnSite) / 60 },
  ];

  return (
    <div style={{ textAlign: 'center' }} className="d-flex flex-column align-items-center">
      <h6 className="mb-3">Traffic Engagement</h6>
      <PieChart width={330} height={220}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={70}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default TrafficChart;

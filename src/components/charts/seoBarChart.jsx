import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const SeoBarChart = ({ data, styles }) => {
  const isValidData = Array.isArray(data) && data.length > 0 && data.some(d => d.value > 0);

  if (!isValidData) {
    return (
      <div className={`${styles.card} p-4`} style={{ backgroundColor: '#0f172a', borderRadius: '10px', color: '#ccc' }}>
        <h6 className="mb-3">SEO Difficulty</h6>
        <p className="text-center mb-0">Not enough data to render SEO difficulty chart.</p>
      </div>
    );
  }

  return (
    <div className={`${styles.card} p-3`} style={{ backgroundColor: '#0f172a', borderRadius: '10px' }}>
      <h6 className="mb-3">SEO Difficulty</h6>
      <ResponsiveContainer width="100%" height={250} className="mt-3">
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#ffffff" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SeoBarChart;

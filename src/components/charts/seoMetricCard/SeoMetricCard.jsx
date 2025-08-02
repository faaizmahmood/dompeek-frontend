import { Box, Typography, CircularProgress, Paper } from '@mui/material';

const SeoMetricCard = ({ styles, title, value, showChart = false }) => {
  const numericValue = Number(value);
  const percentage = !isNaN(numericValue) ? Math.min(numericValue, 100) : 0;

  return (
    <div className="col-md-3 col-sm-6 mt-md-3 mt-3">
      <Paper elevation={3} className={styles.seoCard} sx={{ padding: 2, }}>
        <h6>{title}</h6>

        {showChart && !isNaN(numericValue) ? (
          <Box position="relative" display="inline-flex" sx={{ mt: 2, mb: 1, textAlign:'center' }} >
            <CircularProgress
              variant="determinate"
              value={percentage}
              size={100}
              thickness={5}
              sx={{ color: '#4ade80' }}
            />
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h6" component="div" color="#fff" fontWeight={600}>
                {`${percentage}%`}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Typography variant="body1" sx={{ mt: 2 }}>{value || 'N/A'}</Typography>
        )}
      </Paper>
    </div>
  );
};

export default SeoMetricCard;

import { getChartData } from './src/lib/getChartData';

getChartData()
  .then(data => {
    console.log('Result:', JSON.stringify(data, null, 2));
  })
  .catch(err => {
    console.error('Error:', err);
  });

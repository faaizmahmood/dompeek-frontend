/* eslint-disable no-unused-vars */

import heatMap from '../../../src/assets/imgs/heat-map.jpg'

const WorldHeatMap = ({ tldUsageData }) => {


  return (
    <div style={{ width: '100%' }}>
    <h5 className="text-white">Heat Map</h5>

      <img src={heatMap} className='mt-3 ' style={{width:'100%', height:'500px', borderRadius:'10px'}} />

    </div>
  );
};

export default WorldHeatMap;

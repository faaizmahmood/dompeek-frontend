import { useEffect, useState } from "react";
import apiService from "../../../../utils/apiClient";
import TabLoading from '../../../../components/tabLoading/tabLoading';
import styles from './geolocation.module.scss'; // SCSS module
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaMapMarkerAlt } from 'react-icons/fa';


const Geolocation = ({ whoisData }) => {
  const [geoData, setGeoData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGeolocation = async () => {
      try {
        const domain = whoisData?.domainName;
        if (!domain) return;

        setLoading(true);
        const res = await apiService.get('/domain/ip-geolocation', {domain});

        setGeoData(res.data?.geolocation);
      } catch (error) {
        console.error('Error fetching geolocation data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGeolocation();
  }, [whoisData?.domainName]);

  if (loading) return <TabLoading />;

  if (!geoData) return <p className="text-white">No geolocation data available.</p>;

  return (
    <div className={` ${styles.geoCard}`}>

            <div className={`d-flex gap-3 ${styles.tab_head}`}>
                <FaMapMarkerAlt color='#fff' size={40} className='mt-2' />
                <div>
                    <h4>Geolocation</h4>
                    <p>{whoisData?.domainName || 'N/A'}</p>
                </div>
            </div>

      <div className="row mt-4">
        <div className="col-md-6 mb-3">
          <div className={`card ${styles.cardItem}`}>
            <div className="card-body">
              <h6>IP</h6>
              <p>{geoData.ip}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className={`card ${styles.cardItem}`}>
            <div className="card-body">
              <h6>Hostname</h6>
              <p>{geoData?.hostname}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className={`card ${styles.cardItem}`}>
            <div className="card-body">
              <h6>Location</h6>
              <p>{geoData?.city}, {geoData?.region}, {geoData?.country}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className={`card ${styles.cardItem}`}>
            <div className="card-body">
              <h6>Coordinates</h6>
              <p>{geoData?.loc}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className={`card ${styles.cardItem}`}>
            <div className="card-body">
              <h6>Timezone</h6>
              <p>{geoData?.timezone}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className={`card ${styles.cardItem}`}>
            <div className="card-body">
              <h6>ISP / Org</h6>
              <p>{geoData?.org}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Geolocation;

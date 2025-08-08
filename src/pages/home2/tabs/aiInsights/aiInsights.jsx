import styles from './aiInsights.module.scss';
import { BsStars } from "react-icons/bs";
import { RiGitBranchFill } from "react-icons/ri";
import { FaStore } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { FaInfoCircle } from "react-icons/fa";

const AiInsights = ({ loading, aiSummary, aiLoading }) => {
  if (loading) {
    return <div>Fetching base overview data...</div>;
  }

  if (aiLoading) {
    return <div>Generating AI insights for you...</div>;
  }

  return (
    <>
      {aiSummary ? (
        <section className={styles.aiInsights}>
          <div className='row'>
            <div className='col-8'>
              <div className={styles.card}>

                <div className='row'>

                  <div className='col-6'>
                    <h4>
                      <BsStars size={25} className='me-2' />
                      AI-Powered Domain Summary
                    </h4>
                    <p>
                      Based on comparable sales and analytics, the estimated value of this domain is!
                    </p>
                  </div>

                  <div className='col-6'>

                    <div className={styles.priceCard}>


                      <h1 className='text-white'>
                        ${aiSummary?.predicted_price_usd || 'N/A'}
                      </h1>

                    </div>

                  </div>

                </div>


                <div className='mt-5'>

                  {/* Price & Suggested Use Cases */}
                  <div className='row mt-4'>
                    <div className='col-6'>
                      <h6>
                        <RiGitBranchFill size={25} className='me-2' />
                        Suggested Use Cases
                      </h6>
                      {Array.isArray(aiSummary?.suggested_use_cases) &&
                        aiSummary.suggested_use_cases.map((ele, ind) => (
                          <h5 key={ind}>{ele}</h5>
                        ))}
                    </div>

                    <div className='col-6'>
                      <h6>
                        <FaStore size={25} className='me-2' />
                        Ideal Buyers</h6>
                      {Array.isArray(aiSummary?.ideal_buyers) &&
                        aiSummary.ideal_buyers.map((ele, ind) => (
                          <h5 key={ind}>{ele}</h5>
                        ))}
                    </div>
                  </div>

                  {/* Ideal Buyers & Flags */}
                  <div className='row mt-4'>
                    <div className='col-6'>
                      {/* Warnings */}
                      <h6>
                        <IoIosWarning color='red' size={25} className='me-2' />
                        Warnings
                      </h6>
                      {Array.isArray(aiSummary?.flags?.warnings) &&
                        aiSummary.flags.warnings.map((ele, ind) => (
                          <h5 key={ind}>{ele}</h5>
                        ))}
                    </div>

                    <div className='col-6'>


                      {/* Strengths */}
                      <h6 className='mt'>
                        <HiMiniCheckBadge color='green' size={25} className='me-2' />
                        Strengths
                      </h6>
                      {Array.isArray(aiSummary?.flags?.strengths) &&
                        aiSummary.flags.strengths.map((ele, ind) => (
                          <h5 key={ind}>{ele}</h5>
                        ))}
                    </div>
                  </div>
                </div>

                <div className={`mt-4 ${styles.similar_domains}`}>
                  <h4 className='d-flex'>
                    <FaInfoCircle color='blue' size={25} className='me-2' />
                    <span className=''>View Similar Sold Domains</span>
                  </h4>
                </div>

              </div>
            </div>
          </div>
        </section>
      ) : (
        <div>Failed to fetch AI insights.</div>
      )}
    </>
  );
};

export default AiInsights;

/* eslint-disable no-unused-vars */
import styles from './aiInsights.module.scss';
import { IoIosWarning } from "react-icons/io";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { FaCircleXmark } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import TimelineChart from '../../../../components/aiCharts/timelineChart/timelineChart';
import SEOScoreChart from '../../../../components/aiCharts/seoScoreChart/seoScoreChart';
import Speedometer from '../../../../components/aiCharts/speedometer/speedometer';
import PersonasChart from '../../../../components/aiCharts/personasChart/personasChart';
import CompetitiveSnapshotChart from '../../../../components/aiCharts/competitiveSnapshotChart/competitiveSnapshotChart';
import OverviewSkeleton from '../../../../components/overviewSkeleton/overviewSkeleton';

// Icons
import summaryIcon from '../../../../assets/icons/summary.png'
import maketIcon from '../../../../assets/icons/market.png'
import buyerMatchIcon from '../../../../assets/icons/match.png'
import liquadityIcon from '../../../../assets/icons/liquadity.png'
import historyIcon from '../../../../assets/icons/history.png'
import seoIcon from '../../../../assets/icons/seoScore.png'
import trustIcon from '../../../../assets/icons/trust.png'
import snapshotIcon from '../../../../assets/icons/snapshot.png'
import botIcon from '../../../../assets/icons/bot.png'
import preventIcon from '../../../../assets/icons/caution.png'
import cautionIcon from '../../../../assets/icons/caution.png'
import goodIcon from '../../../../assets/icons/caution.png'
import leaderIcon from '../../../../assets/icons/leader.png'
import averageIcon from '../../../../assets/icons/average.png'
import laggingIcon from '../../../../assets/icons/lagging.png'

import Icon from '../../../../components/icon/icon';

const AiInsights = ({ loading, aiSummary, aiData, aiLoading, isDomainAvailable }) => {


  const summary = aiData?.summary?.data
  const historySeo = aiData?.historySeo?.data
  const trustRiskCompetitive = aiData?.trustRiskCompetitive?.data
  const buyerMatchDomainLiquidity = aiData?.buyerMatchDomainLiquidity?.data
  const aiRecommendations = aiData?.aiRecommendations?.data

  if (loading) {
    return <OverviewSkeleton />;
  }

  if (aiLoading) {
    return <OverviewSkeleton />;
  }

  return (
    <>

      {summary ? (
        <section className={styles.aiInsights}>

          <div className='mb-3'>
            <div className={`${styles.card} ${styles.avalibility}`}>

              <div className='d-flex justify-content-center gap-4'>
                {isDomainAvailable ? (
                  <>
                    <FaCircleCheck size={40} color='#08A900' />
                    <h2>This domain is available</h2>
                  </>
                ) : (
                  <>
                    <FaCircleXmark size={40} color='#D30000' />
                    <h2>This domain is already registered.</h2>
                  </>
                )}
              </div>

            </div>
          </div>

          {/* Row First - Summary */}
          <div className='row'>
            <div className='col-lg-6'>
              <div className={styles.card}>

                <div className='row '>

                  <div className='col-12'>
                    <h4>
                      <Icon path={summaryIcon} />
                      {/* <BsStars size={25} className='me-2' /> */}
                      Summary
                    </h4>
                    {/* <p>
                      Based on comparable sales and analytics, the estimated value of this domain is!
                    </p> */}
                  </div>

                  <div className='col-12 mt-3'>

                    <div className={styles.priceCard}>

                      <h1 className='text-white'>
                        {summary?.predicted_price_usd
                          ? `$${Number(summary.predicted_price_usd).toLocaleString()}`
                          : 'N/A'}
                      </h1>

                    </div>
                  </div>
                  <h5 className={`mt-4 ${styles.para}`}> {summary?.summary}</h5>
                </div>


                <div className='mt-3'>

                  {/* Ideal Buyers & Flags */}
                  <div className='row'>
                    <div className='col-6'>
                      {/* Warnings */}
                      <h6>
                        <IoIosWarning color='red' size={25} className='me-2' />
                        Warnings
                      </h6>
                      {Array.isArray(summary?.flags?.warnings) &&
                        summary.flags.warnings.map((ele, ind) => (
                          <h5 key={ind}>{ele}</h5>
                        ))}
                    </div>

                    <div className='col-6'>


                      {/* Strengths */}
                      <h6 className='mt'>
                        <HiMiniCheckBadge color='green' size={25} className='me-2' />
                        Strengths
                      </h6>
                      {Array.isArray(summary?.flags?.strengths) &&
                        summary.flags.strengths.map((ele, ind) => (
                          <h5 key={ind}>{ele}</h5>
                        ))}
                    </div>
                  </div>
                </div>

                {/* <div className={`mt-4 ${styles.similar_domains}`}>
                  <h4 className='d-flex'>
                    <FaInfoCircle color='blue' size={25} className='me-2' />
                    <span className=''>View Similar Sold Domains</span>
                  </h4>
                </div> */}

              </div>
            </div>

            <div className='col-lg-6 mt-lg-0 mt-3'>
              <div className={styles.card}>
                <h4>
                  <Icon path={maketIcon} />
                  {/* <AiOutlineAppstore size={25} className='me-2' /> */}
                  Market Summary & Industry Fit
                </h4>

                <div className='row mt-4'>
                  <div className='col-12'>
                    <h6>
                      Suggested Use Cases
                    </h6>
                    {Array.isArray(summary?.suggested_use_cases) &&
                      summary.suggested_use_cases.map((ele, ind) => (
                        <h5 key={ind}>{ele}</h5>
                      ))}
                  </div>

                  <div className='col-6 mt-3'>
                    <h6>
                      Ideal Buyers</h6>
                    {Array.isArray(summary?.ideal_buyers) &&
                      summary.ideal_buyers.map((ele, ind) => (
                        <h5 key={ind}>{ele?.buyer_type}</h5>
                      ))}
                  </div>

                  <div className='col-6 mt-3'>
                    <h6>
                      Geographic Targets</h6>
                    {Array.isArray(summary?.geo_targets) &&
                      summary.geo_targets.map((ele, ind) => (
                        <h5 key={ind}>{ele}</h5>
                      ))}
                  </div>

                  <div className='col-12 mt-3'>
                    <h6>
                      Industries</h6>
                    {Array.isArray(summary?.industries) &&
                      summary.industries.map((ele, ind) => (
                        <h5 key={ind}>{ele?.industry_name} - score {ele?.demand_score}</h5>
                      ))}
                  </div>
                </div>

              </div>
            </div>

          </div>


          {/* Row4 - Buyer Match Domain Liquidity */}
          <div className='row mt-4'>

            <div className='col-lg-6'>

              <div className={styles.card}>
                <h4> <Icon path={buyerMatchIcon} />Buyer Match</h4>


                <div className='mt-4'>

                  <PersonasChart personas={buyerMatchDomainLiquidity?.buyer_match?.personas} />

                </div>

              </div>


            </div>

            <div className='col-lg-6 mt-lg-0 mt-3'>

              <div className={styles.card}>
                <h4><Icon path={liquadityIcon} />Liquidity Score</h4>

                <div className='mt-4'>

                  {/* <h6>Score</h6> */}
                  {/* <h5>{buyerMatchDomainLiquidity?.domain_liquidity?.liquidity_score}</h5> */}

                </div>

                <div className='mt-4'>

                  {/* <h6>Spedo Mete Chart Data is ready to make chart!!!</h6> */}

                  <Speedometer speedometer_data={buyerMatchDomainLiquidity?.domain_liquidity?.speedometer_data} />

                </div>
              </div>

            </div>

          </div>


          {/* Row2 - SEO Strength and History */}

          <div className='row mt-4'>

            <div className='col-lg-6'>
              <div className={styles.card}>
                <h4><Icon path={historyIcon} /> Domain History & Age Impact</h4>

                <h5 className={`mt-3 ${styles.para}`}>{historySeo?.history_and_age?.commentary}</h5>

                {/* Chart Here */}
                {/* <p>!!!Timeline here!!!</p> */}

                <div className='mt-5'>
                  <TimelineChart timeline={historySeo?.history_and_age?.timeline} />
                </div>

              </div>
            </div>

            <div className='col-lg-6 mt-lg-0 mt-3'>
              <div className={styles.card}>

                <h4><Icon path={seoIcon} />SEO Strength Breakdown</h4>

                <div className='mt-3'>
                  <h6>
                    Overall SEO Score ( {historySeo?.seo_strength_breakdown?.overall_score} )</h6>

                  {/* <h1 className='text-white'></h1> */}

                </div>

                {/* Chart Here */}
                <div className='mt-2'>
                  <SEOScoreChart chartData={historySeo?.seo_strength_breakdown?.chart_data} />
                </div>

                <div className='mt-2'>
                  <h6>
                    {/* <MdAttractions size={20} className='me-2' /> */}
                    Improvement Actions</h6>
                  {Array.isArray(historySeo?.seo_strength_breakdown?.improvement_actions) &&
                    historySeo?.seo_strength_breakdown?.improvement_actions.map((ele, ind) => (
                      <h5 key={ind}>{ele}</h5>
                    ))}
                </div>

              </div>
            </div>

          </div>


          {/* Row 3 - Trust & Risk Assessment, Competitive Snapshot */}

          <div className='row mt-4'>

            <div className='col-lg-6'>
              <div className={styles.card}>
                <h4><Icon path={trustIcon} />Trust & Risk Assessment</h4>

                <div className='mt-4'>
                  <h6>AI Recommendation</h6>
                  <h5>
                    {trustRiskCompetitive?.trust_risk?.summary}
                  </h5>
                </div>

                <div className='row'>

                  <div className='col-6'>
                    <div className='mt-4'>
                      <h6>Pros</h6>
                      <h5 className={styles.para}>
                        {Array.isArray(trustRiskCompetitive?.trust_risk?.security_strengths) &&
                          trustRiskCompetitive?.trust_risk?.security_strengths.map((ele, ind) => (
                            <h5 key={ind}>{ele}</h5>
                          ))}
                      </h5>
                    </div>
                  </div>

                  <div className='col-6'>
                    <div className='mt-4'>
                      <h6>Trust Level</h6>
                      <h5>

                        {trustRiskCompetitive?.trust_risk?.trust_score} (
                        {trustRiskCompetitive?.trust_risk?.trust_score <= 40 ? (
                          <>
                            <Icon path={leaderIcon} size={1} /> Low
                          </>
                        ) : trustRiskCompetitive?.trust_risk?.trust_score <= 70 ? (
                          <>
                            <Icon path={averageIcon} size={1} /> Medium
                          </>
                        ) : (
                          <>
                            <Icon path={laggingIcon} size={1} /> High
                          </>
                        )}
                        )
                      </h5>
                    </div>
                  </div>

                </div>

                <div className='mt-4'>
                  <h6>Cons</h6>
                  <h5>
                    {Array.isArray(trustRiskCompetitive?.trust_risk?.key_risks) &&
                      trustRiskCompetitive?.trust_risk?.key_risks.map((ele, ind) => (
                        <h5 key={ind}>{ele}</h5>
                      ))}
                  </h5>
                </div>

              </div>
            </div>

            <div className='col-lg-6 mt-lg-0 mt-3'>
              <div className={styles.card}>
                <h4><Icon path={snapshotIcon} />Competitive Snapshot</h4>

                <div className='mt-4'>

                  <div className='row'>

                    <div className='col-7'>
                      <h6>Opportunities</h6>
                      <h5>
                        {Array.isArray(trustRiskCompetitive?.competitive_snapshot?.opportunities) &&
                          trustRiskCompetitive?.competitive_snapshot?.opportunities.map((ele, ind) => (
                            <h5 key={ind}>{ele}</h5>
                          ))}
                      </h5>
                    </div>

                    <div className='col-5'>
                      <div className=''>

                        <h6>Positioning</h6>
                        <h5>
                          {trustRiskCompetitive?.competitive_snapshot?.positioning && (
                            <>
                              <Icon
                                path={
                                  trustRiskCompetitive.competitive_snapshot.positioning === "leader"
                                    ? leaderIcon
                                    : trustRiskCompetitive.competitive_snapshot.positioning === "average"
                                      ? averageIcon
                                      : laggingIcon
                                }
                                size={1}
                              />{" "}
                              {trustRiskCompetitive.competitive_snapshot.positioning}
                            </>
                          )}
                        </h5>

                      </div>
                    </div>

                  </div>

                </div>

                <div className='mt-4'>

                  <h6>Metrics Comparison</h6>
                  <CompetitiveSnapshotChart data={trustRiskCompetitive?.competitive_snapshot?.metrics_comparison} />

                </div>


              </div>
            </div>


          </div>


          {/* Row 5 - Recomendation */}

          <div className='mt-4'>

            <div className={styles.card}>

              <h4><Icon path={botIcon} />AI Recommendations</h4>

              <div className='mt-4'>
                <h6>Investment Recommendation</h6>
                <h5>
                  {aiRecommendations?.investment_recommendation && (
                    <>
                      <Icon
                        path={
                          aiRecommendations.investment_recommendation === "Buy"
                            ? goodIcon
                            : aiRecommendations.investment_recommendation === "Caution"
                              ? cautionIcon
                              : preventIcon
                        }
                        size={1}
                      />{" "}
                      {aiRecommendations.investment_recommendation}
                    </>
                  )}
                </h5>

              </div>

              <div className='mt-4'>

                <h6>Recommendations</h6>

                {(aiRecommendations?.recommendations || []).map((ele, ind) => (
                  <h5 key={ind}>
                    {ele}
                  </h5>
                ))}
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

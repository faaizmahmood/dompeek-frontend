import { NavLink } from 'react-router-dom'
import styles from './features.module.scss'

// ICON IMPORTS
import { FaTools, FaChartLine, FaHistory, FaRobot, FaCode } from 'react-icons/fa'

const Features = () => {

    const featuresData = [
        {
            title: 'Domain Essentials',
            description: 'The core tools for any domain lookup',
            icon: <FaTools />,
            items: [
                { title: 'WHOIS Lookup', description: 'Owner info' },
                { title: 'DNS Records', description: 'A, MX, NS, etc.' },
                { title: 'SSL Checker', description: 'Expiry, issuer' },
                { title: 'Blacklist Check', description: 'Spam/malware' },
                { title: 'Availability', description: 'Free/taken/for sale' },
                { title: 'Domain Age/Status', description: 'Created/Expiry' }
            ]
        },
        {
            title: 'SEO & Valuation Insights',
            description: 'Metrics to evaluate brandability and traffic potential',
            icon: <FaChartLine />,
            items: [
                { title: 'Domain Appraisal', description: 'Est. market value' },
                { title: 'Keyword Match', description: 'Common terms' },
                { title: 'SEO Score', description: 'DA/PA, backlinks' },
                { title: 'Brandability', description: 'Short, catchy' },
                { title: 'Traffic (basic)', description: 'Est. visits/API' }
            ]
        },
        {
            title: 'Historical & Security Info',
            description: 'Get behind-the-scenes domain history',
            icon: <FaHistory />,
            items: [
                { title: 'WHOIS History', description: 'Past ownership' },
                { title: 'DNS/SSL Changes', description: 'Past server/IP' },
                { title: 'Abuse History', description: 'Blacklists/report' },
                { title: 'Archive.org Snapshots', description: '(Coming Soon)' }
            ]
        },
        {
            title: 'AI-Powered Features (Coming Soon)',
            description: 'Let AI guide your domain decisions',
            icon: <FaRobot />,
            items: [
                { title: 'Smart Suggestions', description: 'Similar domains [Coming Soon]' },
                { title: 'End User Finder', description: 'Buyers match [Coming Soon]' },
                { title: 'AI Scoring', description: 'Sale potential [Pro Feature]' }
            ]
        },
        {
            title: 'Developer Tools',
            description: 'Programmatic access and reporting',
            icon: <FaCode />,
            items: [
                { title: 'API Access', description: 'Get API key [Pro Feature]' },
                { title: 'Bulk Domain Check', description: 'Upload list [Coming Soon]' },
                { title: 'Export as PDF', description: 'Download report' }
            ]
        }
    ]

    return (
        <main className={styles.features}>

            <section className={`${styles.hero} container py-5 `}>
                <div className='text-center mt-5'>
                    <h2>All-in-One Domain Analytics & Intelligence</h2>
                    <p className='mt-3'>Discover powerful tools to analyze, evaluate, and enhance your domain decisions with ease.</p>
                    <div className='mt-4'>
                        <NavLink to='/signup'><button>Try it Free</button></NavLink>
                        <button className='ms-2'>Explore Top Domains</button>
                    </div>
                </div>
            </section>

            {featuresData.map((ele, ind) => (
                <section className={`${styles.featuresCards} container mt-5`} key={ind}>
                    <h3 className='d-flex align-items-center gap-2'>
                        <span className={styles.icon}>{ele.icon}</span>
                        {ele.title}
                    </h3>
                    {/* <p className='text-muted'>{ele.description}</p> */}

                    <div className='row mt-4'>
                        {ele.items.map((i, itemIndex) => (
                            <div className='col-md-4 col-sm-6 p-2' key={itemIndex}>
                                <div className={styles.featuresCardsItem}>
                                    <h4>{i.title}</h4>
                                    <h5>{i.description}</h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </main>
    )
}

export default Features

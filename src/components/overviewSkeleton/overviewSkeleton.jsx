// components/SkeletonOverview.jsx
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const OverviewSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#1E293B" highlightColor="#101D2E">
      <div className="container bg-dark text-white p-4 rounded">
        <Skeleton height={40} width={300} className="mb-3" style={{borderRadius:'10px'}} />
        <Skeleton count={1} height={2} style={{borderRadius:'10px'}} />

        <div className="row my-4">
          <div className="col-4">
            <Skeleton height={250} style={{borderRadius:'10px'}} />
          </div>
          <div className="col-8">
            <Skeleton height={250} style={{borderRadius:'10px'}} />
          </div>
        </div>

        <Skeleton height={30} width={200} style={{borderRadius:'10px'}} />
        <div className="row mt-3">
          {[...Array(6)].map((_, i) => (
            <div className="col-6 mb-3" key={i}>
              <Skeleton height={80} style={{borderRadius:'10px'}} />
            </div>
          ))}
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default OverviewSkeleton;

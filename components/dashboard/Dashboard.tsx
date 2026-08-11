import Stats from './Stats';
import ChartSection from './ChartSection';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6 flex items-end justify-between gap-6 max-sm:flex-col max-sm:items-start max-sm:gap-2">
        <div>
          <p className="m-0 text-[11px] font-extrabold tracking-[0.09em] text-[#44777d] uppercase">
            Live workspace snapshot
          </p>
          <h2 className="mt-1 text-[28px] font-bold tracking-[-0.04em] max-sm:text-[25px]">
            Overview
          </h2>
        </div>
        <p className="m-0 max-w-120 text-sm leading-relaxed text-[#687787]">
          Track occupancy, bookings, and member activity across your spaces.
        </p>
      </div>
      <Stats />
      <ChartSection />
    </div>
  );
};

export default Dashboard;

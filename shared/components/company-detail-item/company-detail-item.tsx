import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import React, { FC, useState } from 'react';
import { BarChart, IChartData } from '../bar-chart/bar-chart';
import { BixModal } from '../bix-modal/bix-modal';
import classes from './company-detail-item.module.scss';

interface CompanyDetailItemProps {
  icon: JSX.Element;
  label: string;
  value: string;
  change?: 'up' | 'down';
  modalTitle?: string;
  modalChartData?: IChartData[];
}

export const CompanyDetailItem: FC<CompanyDetailItemProps> = ({
  icon,
  label,
  value,
  change,
  modalTitle,
  modalChartData,
}) => {
  const [chartModalOpen, setChartModalOpen] = useState(false);
  return (
    <div className={classes.companyDetailItem}>
      <div className={classes.icon}>{icon}</div>
      <div className={classes.companyDetailData}>
        <div className={classes.label}>{label}</div>
        <div className={classes.value}>
          {value}{' '}
          {change === 'up' ? (
            <span onClick={() => setChartModalOpen(true)}>
              <TrendingUpIcon className={classes.trendUp} />
            </span>
          ) : change === 'down' ? (
            <span onClick={() => setChartModalOpen(true)}>
              <TrendingDownIcon className={classes.trendDown} />
            </span>
          ) : undefined}
        </div>
        {modalChartData && (
          <BixModal open={chartModalOpen} onClose={() => setChartModalOpen(false)} title={modalTitle}>
            <BarChart data={modalChartData} label={label} />
          </BixModal>
        )}
      </div>
    </div>
  );
};

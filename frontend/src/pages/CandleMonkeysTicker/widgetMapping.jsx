import React from 'react';

import AdvancedStatsWidget from './widgets/AdvancedStats/Widget';
import AnalystRecommendationsWidget from './widgets/AnalystRecommendations/Widget';
import DividendsWidget from './widgets/Dividends/Widget';
import EarningsWidget from './widgets/Earnings/Widget';
import EarningsDetailedView from './widgets/Earnings/DetailedView';
import FundamentalsWidget from './widgets/Fundamentals/Widget';
import HeaderWidget from './widgets/Header/Widget';
import NewsWidget from './widgets/News/Widget';
import OHLCWidget from './widgets/OHLC/Widget';
import PeersGroupWidget from './widgets/PeersGroup/Widget';
import PerformanceWidget from './widgets/Performance/Widget';
import PriceBoxWidget from './widgets/PriceBox/Widget';
import PriceChartWidget from './widgets/PriceChart/Widget';
import ProfileWidget from './widgets/Profile/Widget';

const CompanyWidgetMapping = {
  companyHeader: {
    widgetContent: () => <HeaderWidget />,
  },
  companyAnalystRecommendations: {
    widgetContent: () => <AnalystRecommendationsWidget />,
  },
  companyPerformance: {
    widgetContent: () => <PerformanceWidget />,
  },
  companyPriceBox: {
    widgetContent: () => <PriceBoxWidget />,
  },
  companyPriceChart: {
    widgetContent: () => <PriceChartWidget />,
  },
  companyEarnings: {
    widgetContent: () => <EarningsWidget />,
    detailedContent: () => <EarningsDetailedView />,
  },
  companyDividends: {
    widgetContent: () => <DividendsWidget />,
  },
  // companyQuickStats: () => <CompanyQuickStats quickStats={quickStats} />,
  companyPeersGroup: {
    widgetContent: () => <PeersGroupWidget />,
  },
  companyNews: {
    widgetContent: () => <NewsWidget />,
  },
  companyOHLC: {
    widgetContent: () => <OHLCWidget />,
  },
  companyFundamentals: {
    widgetContent: () => <FundamentalsWidget />,
  },
  companyProfile: {
    widgetContent: () => <ProfileWidget />,
  },
  companyAdvancedStats: {
    widgetContent: () => <AdvancedStatsWidget />,
  },
};

export default CompanyWidgetMapping;

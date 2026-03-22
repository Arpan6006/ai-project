'use client';
import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, ISeriesApi, CandlestickData, WhitespaceData } from 'lightweight-charts';

interface TradingChartProps {
  data: any[];
  volumeData: any[];
  activeIndicators: Set<string>;
}

const TradingChart: React.FC<TradingChartProps> = ({ data, volumeData, activeIndicators }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<'Histogram'> | null>(null);
  const indicatorSeriesRef = useRef<Map<string, ISeriesApi<'Line'>>>(new Map());

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#161A1E' },
        textColor: '#848E9C',
      },
      grid: {
        vertLines: { color: '#2B3139' },
        horzLines: { color: '#2B3139' },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      timeScale: {
        borderColor: '#2B3139',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const series = chart.addCandlestickSeries({
      upColor: '#2dbd85',
      downColor: '#f6465d',
      borderVisible: false,
      wickUpColor: '#2dbd85',
      wickDownColor: '#f6465d',
    });

    const volumeSeries = chart.addHistogramSeries({
      color: '#26a69a',
      priceFormat: { type: 'volume' },
      priceScaleId: '', // Overlay on main scale
    });

    volumeSeries.priceScale().applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
    });

    chartRef.current = chart;
    seriesRef.current = series;
    volumeSeriesRef.current = volumeSeries;

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current!.clientWidth });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (!chartRef.current || !seriesRef.current) return;

    if (data.length > 0) {
      seriesRef.current.setData(data as CandlestickData[]);

      // Update volume data
      if (volumeSeriesRef.current) {
        volumeSeriesRef.current.setData(volumeData);
      }

      // Handle Indicators
      const chart = chartRef.current;
      const indicatorMap = indicatorSeriesRef.current;

      const indicatorConfigs: Record<string, { type: 'Line', color: string, field: string }> = {
        'SMA 20': { type: 'Line', color: '#2962FF', field: 'sma_20' },
        'SMA 50': { type: 'Line', color: '#FF6D00', field: 'sma_50' },
        'EMA 12': { type: 'Line', color: '#E91E63', field: 'ema_12' },
        'VWAP': { type: 'Line', color: '#9C27B0', field: 'vwap' },
      };

      // Clear series that are no longer active
      const toRemove: string[] = [];
      indicatorMap.forEach((s, name) => {
        if (!activeIndicators.has(name) && !['BB_Upper', 'BB_Lower'].includes(name)) {
          toRemove.push(name);
        }
      });

      toRemove.forEach(name => {
        const s = indicatorMap.get(name);
        if (s) {
          try {
            chart.removeSeries(s);
          } catch (e) {
            console.warn(`Could not remove series ${name}`, e);
          }
          indicatorMap.delete(name);
        }
      });

      // Add/Update active indicators
      activeIndicators.forEach(name => {
        const config = indicatorConfigs[name];
        if (!config) return;

        let s = indicatorMap.get(name);
        if (!s) {
          s = chart.addLineSeries({
            color: config.color,
            lineWidth: 2,
            priceLineVisible: false,
          });
          indicatorMap.set(name, s);
        }

        if (s) {
          const lineData = data
            .map(d => ({ time: d.time, value: d[config.field] }))
            .filter(d => d.value !== 0 && d.value !== undefined);

          s.setData(lineData);
        }
      });

      // Special handling for Bollinger Bands (Upper and Lower)
      if (activeIndicators.has('Bollinger Bands')) {
        let upperS = indicatorMap.get('BB_Upper');
        let lowerS = indicatorMap.get('BB_Lower');

        if (!upperS) {
          upperS = chart.addLineSeries({ color: 'rgba(33, 150, 243, 0.4)', lineWidth: 1, priceLineVisible: false });
          indicatorMap.set('BB_Upper', upperS);
        }
        if (!lowerS) {
          lowerS = chart.addLineSeries({ color: 'rgba(33, 150, 243, 0.4)', lineWidth: 1, priceLineVisible: false });
          indicatorMap.set('BB_Lower', lowerS);
        }

        const upperData = data.map(d => ({ time: d.time, value: d.bb_upper })).filter(d => d.value !== 0);
        const lowerData = data.map(d => ({ time: d.time, value: d.bb_lower })).filter(d => d.value !== 0);

        if (upperS) upperS.setData(upperData);
        if (lowerS) lowerS.setData(lowerData);
      } else {
        ['BB_Upper', 'BB_Lower'].forEach(k => {
          const s = indicatorMap.get(k);
          if (s) {
            chart.removeSeries(s);
            indicatorMap.delete(k);
          }
        });
      }
    }
  }, [data, volumeData, activeIndicators]);

  return <div ref={chartContainerRef} style={{ width: '100%', height: '100%' }} />;
};

export default TradingChart;

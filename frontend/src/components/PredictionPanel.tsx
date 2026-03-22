import React from 'react';
import styles from '../styles/Dashboard.module.css';

interface Prediction {
  direction: string;
  probability: number;
  confidence: number;
}

interface Signal {
  name: string;
  value: string;
  status: 'bullish' | 'bearish';
}

interface PredictionPanelProps {
  prediction: Prediction;
  signals: Signal[];
  timeframe: string;
}

const PredictionPanel: React.FC<PredictionPanelProps> = ({ prediction, signals, timeframe }) => {
  const isUp = prediction.direction === 'UP';
  const isDown = prediction.direction === 'DOWN';

  return (
    <div className={styles.predictionPanel}>
      <div className={styles.signalTitle}>Next {timeframe.replace('m', ' Min').replace('h', ' Hour').replace('d', ' Day')} Candle</div>
      <div className={styles.signalReadout}>
        <div className={`${styles.signalDirection} ${isUp ? styles.statusBullish : isDown ? styles.statusBearish : ''}`}>
          {isUp ? '↑' : isDown ? '↓' : ''} {prediction.direction}
        </div>
        <div className={styles.confidenceValue}>
          Confidence <span style={{ color: '#fff' }}>{prediction.confidence}%</span>
        </div>
      </div>

      <div className={styles.confidenceBar}>
        <div
          className={styles.confidenceFill}
          style={{ width: `${prediction.confidence}%` }}
        />
      </div>

      <div className={styles.signalTitle} style={{ marginTop: '20px' }}>Analysis Signals</div>
      <div className={styles.analysisList}>
        {signals.map((signal, idx) => (
          <div key={idx} className={styles.analysisItem}>
            <div className={styles.analysisName}>
              {signal.status === 'bullish' ? '📈' : '📉'} {signal.name}
            </div>
            <div className={`${styles.analysisValue} ${signal.status === 'bullish' ? styles.statusBullish : styles.statusBearish}`}>
              {signal.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredictionPanel;

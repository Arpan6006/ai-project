from sqlalchemy import Column, Integer, String, Float, DateTime, JSON, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()

class OHLCV(Base):
    __tablename__ = 'ohlcv'
    id = Column(Integer, primary_key=True)
    symbol = Column(String, index=True)
    timeframe = Column(String)
    timestamp = Column(DateTime, index=True)
    open = Column(Float)
    high = Column(Float)
    low = Column(Float)
    close = Column(Float)
    volume = Column(Float)

class ModelMetadata(Base):
    """
    Registry for per-symbol/timeframe models.
    """
    __tablename__ = 'model_metadata'
    id = Column(Integer, primary_key=True)
    symbol = Column(String, index=True)
    timeframe = Column(String)
    model_type = Column(String) # LSTM, XGBoost, Ensemble
    version = Column(String)
    metrics = Column(JSON) # Store fresh metrics: accuracy, sharpe, etc.
    last_trained = Column(DateTime, default=datetime.utcnow)
    path = Column(String)

class TrainingLog(Base):
    """
    Logs every training session for audit and drift analysis.
    """
    __tablename__ = 'training_logs'
    id = Column(Integer, primary_key=True)
    symbol = Column(String)
    timeframe = Column(String)
    status = Column(String) # Success, Failed
    error_msg = Column(String, nullable=True)
    duration_sec = Column(Float)
    metrics_at_training = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)

class PredictionRecord(Base):
    __tablename__ = 'predictions'
    id = Column(Integer, primary_key=True)
    symbol = Column(String, index=True)
    timeframe = Column(String)
    prediction = Column(String)
    probability = Column(Float)
    confidence_interval = Column(JSON)
    features_used = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)

import os
import joblib
import logging
from typing import Optional, Any
from model_engine.models.base_model import BaseModel

class ModelManager:
    """
    Manages loading, saving, and versioning of models per symbol and timeframe.
    Ensures that predictions are always symbol-specific.
    """
    
    def __init__(self, model_dir: str = "models/registry"):
        self.model_dir = model_dir
        os.makedirs(self.model_dir, exist_ok=True)
        self.logger = logging.getLogger(__name__)

    def _get_model_path(self, symbol: str, timeframe: str, model_type: str) -> str:
        return os.path.join(self.model_dir, f"{symbol}_{timeframe}_{model_type}.joblib")

    def save_model(self, model: Any, symbol: str, timeframe: str, model_type: str):
        """Saves a trained model to the registry."""
        path = self._get_model_path(symbol, timeframe, model_type)
        try:
            joblib.dump(model, path)
            self.logger.info(f"Model saved: {path}")
        except Exception as e:
            self.logger.error(f"Failed to save model {path}: {e}")

    def load_model(self, symbol: str, timeframe: str, model_type: str) -> Optional[Any]:
        """Loads a model from the registry if it exists."""
        path = self._get_model_path(symbol, timeframe, model_type)
        if os.path.exists(path):
            try:
                return joblib.load(path)
            except Exception as e:
                self.logger.error(f"Failed to load model {path}: {e}")
        return None

    def model_exists(self, symbol: str, timeframe: str, model_type: str) -> bool:
        return os.path.exists(self._get_model_path(symbol, timeframe, model_type))

    def get_ensemble(self, symbol: str, timeframe: str) -> Optional[Any]:
        """Load or initialize the ensemble for a given stock/timeframe."""
        lstm_path = self._get_model_path(symbol, timeframe, "lstm")
        xgb_path = self._get_model_path(symbol, timeframe, "xgb")
        
        if os.path.exists(lstm_path) and os.path.exists(xgb_path):
            lstm = self.load_model(symbol, timeframe, "lstm")
            xgb = self.load_model(symbol, timeframe, "xgb")
            from model_engine.models.ensemble import EnsembleStrategy
            return EnsembleStrategy(models=[lstm, xgb])
        return None

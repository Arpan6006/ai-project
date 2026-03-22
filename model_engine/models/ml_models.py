import xgboost as xgb
import lightgbm as lgb
import numpy as np
import joblib
from typing import Dict, Any
from .base_model import BaseModel

class XGBoostModel(BaseModel):
    """
    Gradient Boosted Trees for non-linear pattern recognition in price features.
    """
    def __init__(self, params: Dict[str, Any] = None):
        if params is None:
            params = {
                'objective': 'multi:softprob',
                'num_class': 3,
                'max_depth': 6,
                'learning_rate': 0.05,
                'n_estimators': 100
            }
        self.model = xgb.XGBClassifier(**params)

    def train(self, X: np.ndarray, y: np.ndarray):
        self.model.fit(X, y)

    def predict(self, X: np.ndarray) -> Dict[str, Any]:
        # Expects X to be 2D (num_samples, num_features)
        probs = self.model.predict_proba(X)[0]
        idx = np.argmax(probs)
        directions = {0: -1, 1: 0, 2: 1}
        return {
            "direction": directions[idx],
            "probability": float(probs[idx])
        }

    def save(self, path: str):
        joblib.dump(self.model, path)

    def load(self, path: str):
        self.model = joblib.load(path)

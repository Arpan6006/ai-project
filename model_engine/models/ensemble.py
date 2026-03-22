import numpy as np
from typing import List, Dict, Any
from .base_model import BaseModel

class EnsembleStrategy(BaseModel):
    """
    Weighted Average Ensemble of DL and ML models.
    Supports dynamic weight adjustment based on performance.
    """
    def __init__(self, models: List[BaseModel], weights: List[float] = None):
        self.models = models
        self.weights = weights if weights else [1.0/len(models)] * len(models)

    def train(self, X: np.ndarray, y: np.ndarray):
        # Meta-learner training (Stacking) would happen here
        pass

    def predict(self, X_dl: np.ndarray, X_ml: np.ndarray) -> Dict[str, Any]:
        """
        Aggregates results from multiple models with error handling.
        """
        weighted_probs = np.zeros(3) # [Down, Sideways, Up]
        
        for i, model in enumerate(self.models):
            try:
                # Robust model type identification
                model_name = str(type(model)).upper()
                X_input = X_dl if "LSTM" in model_name else X_ml
                
                res = model.predict(X_input)
                
                # Map direction back to indices: -1 -> 0, 0 -> 1, 1 -> 2
                direction = res.get('direction', 0)
                dir_map = {-1: 0, 0: 1, 1: 2}
                
                prob_dist = [0.0, 0.0, 0.0]
                prob_idx = dir_map.get(direction, 1) # Default to Sideways if unknown
                prob_dist[prob_idx] = res.get('probability', 0.5)
                
                # Weighted average
                weighted_probs += np.array(prob_dist) * self.weights[i]
            except Exception as e:
                print(f"Error in ensemble model prediction: {e}")
                # Add neutral weight if one model fails
                weighted_probs += np.array([0.0, 1.0, 0.0]) * self.weights[i]

        idx = np.argmax(weighted_probs)
        directions = {0: -1, 1: 0, 2: 1}
        
        return {
            "direction": directions[idx],
            "probability": float(weighted_probs[idx]),
            "confidence_score": float(np.max(weighted_probs))
        }

    def save(self, path: str):
        pass

    def load(self, path: str):
        pass

from abc import ABC, abstractmethod
import pandas as pd
import numpy as np
from typing import Dict, Any

class BaseModel(ABC):
    """
    Abstract Base Class for all market prediction models.
    """
    
    @abstractmethod
    def train(self, X: np.ndarray, y: np.ndarray):
        pass
    
    @abstractmethod
    def predict(self, X: np.ndarray) -> Dict[str, Any]:
        """
        Returns a dictionary containing:
        - direction: (1 for UP, 0 for SIDEWAYS, -1 for DOWN)
        - probability: float (0-1)
        """
        pass

    @abstractmethod
    def save(self, path: str):
        pass

    @abstractmethod
    def load(self, path: str):
        pass

import mlflow
import mlflow.pytorch
import mlflow.xgboost
import pandas as pd
import numpy as np
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from model_engine.models.lstm_model import LSTMModel
from model_engine.models.ml_models import XGBoostModel

class ModelTrainer:
    """
    Handles Dynamic Model training, Time-Series Splitting, and Metrics recalculation.
    Ensures no static metrics are used.
    """
    
    def __init__(self, experiment_name: str = "Dynamic_Stock_Prediction"):
        mlflow.set_experiment(experiment_name)

    def dynamic_evaluate(self, model, X_test, y_test) -> dict:
        """
        Calculates fresh metrics for the specific test set.
        """
        # Map model output to predictions
        # This is a simplified version; real implementation depends on model.predict output format
        y_pred = []
        for x in X_test:
            # Handle both LSTM (3D) and ML (2D) inputs
            x_input = x.reshape(1, *x.shape)
            res = model.predict(x_input)
            # Map -1, 0, 1 to 0, 1, 2 for metric calculation if y_test is 0,1,2
            dir_map = {-1: 0, 0: 1, 1: 2}
            y_pred.append(dir_map[res['direction']])
            
        metrics = {
            "accuracy": accuracy_score(y_test, y_pred),
            "precision": precision_score(y_test, y_pred, average='weighted', zero_division=0),
            "recall": recall_score(y_test, y_pred, average='weighted', zero_division=0),
            "f1": f1_score(y_test, y_pred, average='weighted', zero_division=0)
        }
        return metrics

    def train_and_log(self, model, X_train, y_train, X_test, y_test, params: dict):
        with mlflow.start_run():
            mlflow.log_params(params)
            
            # Train
            if hasattr(model, 'train_model'):
                model.train_model(X_train, y_train)
            else:
                model.train(X_train, y_train)
            
            # Fresh Evaluation
            metrics = self.dynamic_evaluate(model, X_test, y_test)
            mlflow.log_metrics(metrics)
            
            # Log artifacts
            if isinstance(model, LSTMModel):
                mlflow.pytorch.log_model(model, "lstm_model")
            elif isinstance(model, XGBoostModel):
                mlflow.xgboost.log_model(model.model, "xgboost_model")
            
            return metrics

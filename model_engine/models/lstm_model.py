import torch
import torch.nn as nn
import numpy as np
from typing import Dict, Any
from .base_model import BaseModel

class LSTMModel(nn.Module, BaseModel):
    """
    Institutional LSTM architecture for time-series forecasting.
    Supports sequence processing with recurrent gates.
    """
    def __init__(self, input_size: int, hidden_size: int = 128, num_layers: int = 2, output_size: int = 3):
        super(LSTMModel, self).__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True, dropout=0.2)
        self.fc = nn.Linear(hidden_size, output_size)
        self.softmax = nn.Softmax(dim=1)

    def forward(self, x):
        # x: (batch, seq_len, input_size)
        out, _ = self.lstm(x)
        out = self.fc(out[:, -1, :]) # Take last step
        return self.softmax(out)

    def train_model(self, X: np.ndarray, y: np.ndarray, epochs: int = 50, lr: float = 0.001):
        """
        X: (num_samples, seq_len, input_size)
        y: (num_samples,) -> classes 0, 1, 2
        """
        self.train()
        criterion = nn.CrossEntropyLoss()
        optimizer = torch.optim.Adam(self.parameters(), lr=lr)
        
        # Convert to tensors
        X_train = torch.FloatTensor(X)
        y_train = torch.LongTensor(y)
        
        for epoch in range(epochs):
            optimizer.zero_grad()
            outputs = self.forward(X_train)
            loss = criterion(outputs, y_train)
            loss.backward()
            optimizer.step()
            
            if (epoch + 1) % 10 == 0:
                print(f'Epoch [{epoch+1}/{epochs}], Loss: {loss.item():.4f}')

    def predict(self, X: np.ndarray) -> Dict[str, Any]:
        """
        X: (1, seq_len, input_size) or (seq_len, input_size)
        """
        self.eval()
        if len(X.shape) == 2:
            X = np.expand_dims(X, axis=0)
            
        with torch.no_grad():
            tensor_X = torch.FloatTensor(X)
            # Ensure compatibility if tensors move to GPU later
            outputs = self.forward(tensor_X)
            probs = outputs.cpu().numpy()[0]
            # 0: Down, 1: Sideways, 2: Up
            idx = np.argmax(probs)
            directions = {0: -1, 1: 0, 2: 1}
            return {
                "direction": directions[idx],
                "probability": float(probs[idx]),
                "raw_probs": probs.tolist()
            }
            
    def save(self, path: str):
        torch.save(self.state_dict(), path)

    def load(self, path: str):
        self.load_state_dict(torch.load(path))

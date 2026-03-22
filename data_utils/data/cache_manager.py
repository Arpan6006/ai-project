import redis
import json
import logging
from typing import Optional, Any

class CacheManager:
    """
    Manages real-time data caching using Redis to ensure low-latency access.
    """
    
    def __init__(self, redis_url: str):
        self.redis = redis.from_url(redis_url, decode_responses=True)
        self.logger = logging.getLogger(__name__)

    def set_tick(self, symbol: str, data: dict):
        """Stores the latest tick for a symbol."""
        try:
            self.redis.set(f"tick:{symbol}", json.dumps(data))
        except Exception as e:
            self.logger.error(f"Failed to cache tick for {symbol}: {e}")

    def get_tick(self, symbol: str) -> Optional[dict]:
        """Retrieves the latest tick for a symbol."""
        data = self.redis.get(f"tick:{symbol}")
        return json.loads(data) if data else None

    def cache_prediction(self, symbol: str, timeframe: str, prediction: dict):
        """Caches model predictions with an expiry."""
        key = f"prediction:{symbol}:{timeframe}"
        self.redis.setex(key, 300, json.dumps(prediction)) # 5 min expiry

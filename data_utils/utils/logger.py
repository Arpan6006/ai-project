import logging
import sys
from structlog import wrap_logger, PrintLogger
from structlog.processors import JSONRenderer

def setup_logger(name: str):
    logging.basicConfig(
        format="%(message)s",
        stream=sys.stdout,
        level=logging.INFO,
    )
    
    logger = wrap_logger(
        PrintLogger(),
        processors=[
            JSONRenderer()
        ]
    )
    return logger

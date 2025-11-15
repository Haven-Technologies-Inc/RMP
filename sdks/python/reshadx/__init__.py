"""
ReshADX Python SDK
Official Python SDK for ReshADX - Open Banking API for Africa
"""

__version__ = "1.0.0"

from .utils.errors import (
    AuthenticationError,
    NotFoundError,
    RateLimitError,
    ReshADXError,
    ServerError,
    ValidationError,
)

__all__ = [
    "ReshADXError",
    "ValidationError",
    "AuthenticationError",
    "NotFoundError",
    "RateLimitError",
    "ServerError",
]

# Client will be added once resources are implemented
# from .client import ReshADX
# __all__.append("ReshADX")

# ReshADX Python SDK

Official Python SDK for ReshADX - Open Banking API for Africa.

## Installation

```bash
pip install reshadx
```

## Quick Start

```python
from reshadx import ReshADX

# Initialize the client
client = ReshADX(
    api_key="your-api-key",
    environment="sandbox"  # or "production"
)

# Register a new user
response = client.auth.register(
    email="user@example.com",
    password="SecurePassword123!",
    first_name="John",
    last_name="Doe",
    phone_number="+233201234567"
)

print(f"User ID: {response.user_id}")
print(f"Access Token: {response.tokens.access_token}")

# Get accounts
accounts = client.accounts.list()
for account in accounts.accounts:
    print(f"{account.account_name}: {account.currency} {account.balance / 100}")

# Get transactions
transactions = client.transactions.list(
    start_date="2024-01-01",
    end_date="2024-12-31",
    limit=50
)

for txn in transactions.transactions:
    print(f"{txn.date}: {txn.description} - {txn.amount / 100}")
```

## Features

- **Complete API Coverage**: All ReshADX API endpoints
- **Type Hints**: Full type annotations with Pydantic models
- **Automatic Retries**: Built-in retry logic for failed requests
- **Error Handling**: Custom exception classes for different error types
- **Token Management**: Automatic access token injection
- **Python 3.8+**: Support for Python 3.8 and above

## Documentation

For detailed documentation, visit [https://docs.reshadx.com](https://docs.reshadx.com)

## Development

This SDK is currently under active development. More features and complete resource implementations will be added soon.

### Planned Features

- Complete resource implementations (Auth, Link, Accounts, Transactions, etc.)
- Webhook signature verification helpers
- Async/await support
- Rate limit handling with backoff
- Comprehensive test suite

## License

MIT

## Support

- Documentation: https://docs.reshadx.com
- Issues: https://github.com/reshadx/reshadx/issues
- Email: support@reshadx.com

# Ghana Open Data Exchange API Documentation

## Overview

Ghana Open Data Exchange (GHODEX) is an open banking platform that provides secure, standardized access to financial data from Ghanaian banks, mobile money providers, and microfinance institutions. Similar to Plaid in the US, GHODEX enables developers to build fintech applications with access to verified financial data.

## Base URL

```
Production: https://api.ghodex.com/v1
Sandbox: https://sandbox.ghodex.com/v1
```

## Authentication

All API requests require authentication using your Client ID and Secret. Include these in the request body:

```json
{
  "client_id": "your_client_id",
  "secret": "your_secret"
}
```

## Core Concepts

### Link Token
A short-lived token used to initialize the GHODEX Link flow. Users authenticate with their financial institution through Link.

### Public Token
A temporary token returned after successful Link authentication. Must be exchanged for an Access Token.

### Access Token
A permanent token used to access user's financial data. Store securely on your server.

### Item
Represents a user's connection to a financial institution. Each Item has an associated Access Token.

---

## API Endpoints

### 1. Link Token

#### Create Link Token
Initialize the Link flow to connect a user's account.

**Endpoint:** `POST /link/token/create`

**Request:**
```json
{
  "client_id": "your_client_id",
  "secret": "your_secret",
  "client_name": "Your App Name",
  "user": {
    "client_user_id": "unique_user_id_123",
    "legal_name": "Kwame Mensah",
    "phone_number": "+233501234567",
    "email_address": "kwame@email.com"
  },
  "products": ["auth", "transactions", "balance"],
  "country_codes": ["GH"],
  "language": "en",
  "webhook": "https://yourapp.com/webhook",
  "redirect_uri": "https://yourapp.com/oauth-redirect"
}
```

**Response:**
```json
{
  "link_token": "link-sandbox-abc123...",
  "expiration": "2024-11-13T14:30:00Z",
  "request_id": "req_12345"
}
```

---

### 2. Exchange Token

#### Exchange Public Token for Access Token
Convert the temporary public token to a permanent access token.

**Endpoint:** `POST /item/public_token/exchange`

**Request:**
```json
{
  "client_id": "your_client_id",
  "secret": "your_secret",
  "public_token": "public-sandbox-xyz789..."
}
```

**Response:**
```json
{
  "access_token": "access-sandbox-abc123...",
  "item_id": "item_abc123",
  "request_id": "req_12345"
}
```

---

### 3. Accounts

#### Get Accounts
Retrieve account information for all accounts associated with an Item.

**Endpoint:** `POST /accounts/get`

**Request:**
```json
{
  "client_id": "your_client_id",
  "secret": "your_secret",
  "access_token": "access-sandbox-abc123...",
  "options": {
    "account_ids": ["acc_123", "acc_456"]  // Optional
  }
}
```

**Response:**
```json
{
  "accounts": [
    {
      "account_id": "acc_savings_001",
      "balances": {
        "available": 15420.50,
        "current": 15420.50,
        "limit": null,
        "iso_currency_code": "GHS",
        "unofficial_currency_code": null
      },
      "mask": "4567",
      "name": "Savings Account",
      "official_name": "GCB Savings Account",
      "type": "depository",
      "subtype": "savings",
      "verification_status": "automatically_verified"
    }
  ],
  "item": {
    "item_id": "item_abc123",
    "institution_id": "ins_gcb_bank",
    "webhook": "https://yourapp.com/webhook",
    "error": null,
    "available_products": ["auth", "balance", "transactions"],
    "billed_products": ["auth", "transactions"],
    "consent_expiration_time": "2025-02-13T00:00:00Z",
    "update_type": "background"
  },
  "request_id": "req_12345"
}
```

---

### 4. Balance

#### Get Balance
Retrieve real-time balance information for accounts.

**Endpoint:** `POST /balance/get`

**Request:**
```json
{
  "client_id": "your_client_id",
  "secret": "your_secret",
  "access_token": "access-sandbox-abc123..."
}
```

**Response:**
```json
{
  "accounts": [
    {
      "account_id": "acc_savings_001",
      "balances": {
        "available": 15420.50,
        "current": 15420.50,
        "limit": null,
        "iso_currency_code": "GHS"
      },
      "name": "Savings Account",
      "type": "depository",
      "subtype": "savings"
    }
  ],
  "item": { /* Item object */ },
  "request_id": "req_12345"
}
```

---

### 5. Transactions

#### Get Transactions
Fetch transaction history for a specified date range.

**Endpoint:** `POST /transactions/get`

**Request:**
```json
{
  "client_id": "your_client_id",
  "secret": "your_secret",
  "access_token": "access-sandbox-abc123...",
  "start_date": "2024-10-01",
  "end_date": "2024-11-13",
  "options": {
    "account_ids": ["acc_123"],  // Optional
    "count": 100,                // Optional, default 100
    "offset": 0                  // Optional, for pagination
  }
}
```

**Response:**
```json
{
  "accounts": [ /* Account objects */ ],
  "transactions": [
    {
      "transaction_id": "txn_001",
      "account_id": "acc_savings_001",
      "amount": -125.50,
      "iso_currency_code": "GHS",
      "category": ["Food and Drink", "Restaurants"],
      "category_id": "13005000",
      "date": "2024-11-12",
      "authorized_date": "2024-11-12",
      "name": "KFC Airport City",
      "merchant_name": "KFC",
      "payment_channel": "in_store",
      "pending": false,
      "location": {
        "address": "Airport City",
        "city": "Accra",
        "region": "Greater Accra",
        "country": "GH"
      },
      "payment_meta": {
        "reference_number": "REF123456",
        "payment_method": "debit_card"
      }
    }
  ],
  "total_transactions": 45,
  "item": { /* Item object */ },
  "request_id": "req_12345"
}
```

---

### 6. Identity

#### Get Identity
Retrieve identity information including Ghana Card verification.

**Endpoint:** `POST /identity/get`

**Request:**
```json
{
  "client_id": "your_client_id",
  "secret": "your_secret",
  "access_token": "access-sandbox-abc123..."
}
```

**Response:**
```json
{
  "accounts": [ /* Account objects */ ],
  "identity": {
    "addresses": [
      {
        "data": {
          "city": "Accra",
          "region": "Greater Accra",
          "street": "123 Independence Avenue",
          "postal_code": "GA-123-4567",
          "country": "Ghana"
        },
        "primary": true
      }
    ],
    "emails": [
      {
        "data": "kwame.mensah@email.com",
        "primary": true,
        "type": "primary"
      }
    ],
    "names": ["Kwame Mensah"],
    "phone_numbers": [
      {
        "data": "+233501234567",
        "primary": true,
        "type": "mobile"
      }
    ],
    "ghana_card": {
      "number": "GHA-XXXXXXXXX-X",
      "verified": true,
      "issued_date": "2020-01-15",
      "expiry_date": "2030-01-15"
    }
  },
  "item": { /* Item object */ },
  "request_id": "req_12345"
}
```

---

### 7. Income Verification

#### Get Income
Retrieve income and employment verification data.

**Endpoint:** `POST /income/get`

**Request:**
```json
{
  "client_id": "your_client_id",
  "secret": "your_secret",
  "access_token": "access-sandbox-abc123..."
}
```

**Response:**
```json
{
  "income_streams": [
    {
      "account_id": "acc_checking_001",
      "stream_id": "stream_salary_001",
      "name": "Monthly Salary",
      "confidence": "HIGH",
      "days": 365,
      "monthly_flow": 5500.00,
      "start_date": "2023-01-01",
      "end_date": "2024-11-13",
      "category": ["Income", "Salary"]
    }
  ],
  "last_year_income": 66000.00,
  "projected_yearly_income": 80400.00,
  "number_of_income_streams": 2,
  "request_id": "req_12345"
}
```

---

### 8. Payment Initiation

#### Create Payment
Initiate a payment to a mobile money or bank account.

**Endpoint:** `POST /payment_initiation/payment/create`

**Request:**
```json
{
  "client_id": "your_client_id",
  "secret": "your_secret",
  "recipient_id": "recipient_abc123",
  "reference": "Invoice #12345",
  "amount": {
    "currency": "GHS",
    "value": 500.00
  }
}
```

**Response:**
```json
{
  "payment_id": "payment_xyz789",
  "payment_token": "payment_token_abc...",
  "reference": "Invoice #12345",
  "amount": {
    "currency": "GHS",
    "value": 500.00
  },
  "status": "PAYMENT_STATUS_INPUT_NEEDED",
  "recipient_id": "recipient_abc123",
  "created_at": "2024-11-13T10:30:00Z",
  "last_status_update": "2024-11-13T10:30:00Z"
}
```

---

### 9. Item Management

#### Get Item
Retrieve information about an Item.

**Endpoint:** `POST /item/get`

**Request:**
```json
{
  "client_id": "your_client_id",
  "secret": "your_secret",
  "access_token": "access-sandbox-abc123..."
}
```

#### Remove Item
Remove an Item (disconnect user's financial institution).

**Endpoint:** `POST /item/remove`

**Request:**
```json
{
  "client_id": "your_client_id",
  "secret": "your_secret",
  "access_token": "access-sandbox-abc123..."
}
```

**Response:**
```json
{
  "removed": true,
  "request_id": "req_12345"
}
```

---

### 10. Institutions

#### Get Institutions
Retrieve list of supported financial institutions.

**Endpoint:** `POST /institutions/get`

**Request:**
```json
{
  "client_id": "your_client_id",
  "secret": "your_secret",
  "country_codes": ["GH"],
  "options": {
    "products": ["auth", "transactions"]  // Optional filter
  }
}
```

**Response:**
```json
{
  "institutions": [
    {
      "institution_id": "ins_gcb_bank",
      "name": "GCB Bank Limited",
      "type": "bank",
      "products": ["auth", "balance", "transactions", "identity"],
      "country_codes": ["GH"],
      "url": "https://www.gcbbank.com.gh",
      "primary_color": "#00529B",
      "logo_url": "https://...",
      "oauth": true,
      "status": {
        "item_logins": {
          "status": "HEALTHY",
          "last_status_change": "2024-11-13T10:00:00Z"
        }
      }
    }
  ],
  "request_id": "req_12345"
}
```

---

## Webhooks

GHODEX uses webhooks to send real-time notifications about events.

### Webhook Events

| Event Type | Description |
|------------|-------------|
| `INITIAL_UPDATE` | Initial transaction data is available |
| `HISTORICAL_UPDATE` | Historical transaction data is ready |
| `DEFAULT_UPDATE` | New transaction data is available |
| `TRANSACTIONS_REMOVED` | Transactions have been removed |
| `ITEM_ERROR` | An error occurred with an Item |
| `USER_PERMISSION_REVOKED` | User revoked access to their data |

### Webhook Payload

```json
{
  "webhook_type": "TRANSACTIONS",
  "webhook_code": "DEFAULT_UPDATE",
  "item_id": "item_abc123",
  "error": null,
  "new_transactions": 5,
  "removed_transactions": []
}
```

### Configuring Webhooks

Set webhook URL when creating a Link Token or update it later:

**Endpoint:** `POST /item/webhook/update`

```json
{
  "client_id": "your_client_id",
  "secret": "your_secret",
  "access_token": "access-sandbox-abc123...",
  "webhook": "https://yourapp.com/webhook"
}
```

---

## Products

### Available Products

| Product | Description | Use Cases |
|---------|-------------|-----------|
| `auth` | Account and routing numbers | ACH transfers, account verification |
| `identity` | Identity verification with Ghana Card | KYC, identity verification |
| `balance` | Real-time account balances | Overdraft protection, spending insights |
| `transactions` | Categorized transaction history | Personal finance, expense tracking |
| `liabilities` | Loan and credit data | Credit decisioning, debt management |
| `payment` | Payment initiation | Bill pay, peer-to-peer transfers |
| `income` | Income verification | Lending, underwriting |
| `assets` | Asset verification reports | Mortgage, lending |
| `transfer` | Money transfer | Wallet funding, payouts |

---

## Supported Institutions

GHODEX supports 23+ financial institutions in Ghana:

### Banks
- GCB Bank Limited
- Ecobank Ghana
- Stanbic Bank Ghana
- Absa Bank Ghana
- Standard Chartered Bank
- CAL Bank
- Fidelity Bank Ghana
- Zenith Bank Ghana
- And more...

### Mobile Money Providers
- MTN Mobile Money
- Vodafone Cash
- AirtelTigo Money

### Microfinance & Credit Unions
- Sinapi Aba Savings and Loans
- Opportunity International
- Ghana Credit Union

---

## Error Handling

### Error Response Format

```json
{
  "error_type": "INVALID_REQUEST",
  "error_code": "INVALID_ACCESS_TOKEN",
  "error_message": "The provided access token is invalid",
  "display_message": "Unable to connect. Please try again.",
  "request_id": "req_12345",
  "status": 400,
  "documentation_url": "https://docs.ghodex.com/errors/invalid-access-token"
}
```

### Common Error Types

| Error Type | HTTP Status | Description |
|------------|-------------|-------------|
| `INVALID_REQUEST` | 400 | Invalid request parameters |
| `INVALID_INPUT` | 400 | Invalid input data |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `API_ERROR` | 500 | Internal server error |
| `ITEM_ERROR` | 400 | Issue with the Item (e.g., login required) |
| `OAUTH_ERROR` | 400 | OAuth authentication error |

---

## Rate Limits

- **Sandbox:** 100 requests per minute
- **Development:** 500 requests per minute
- **Production:** 1000 requests per minute

Rate limit headers are included in all responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1699891200
```

---

## Sandbox Testing

### Test Credentials

**Successful Authentication:**
- Username: `user_good`
- Password: `pass_good`

**Failed Authentication:**
- Username: `user_bad`
- Password: `pass_bad`

### Sandbox Features

1. **Mock Institutions:** All Ghana institutions available
2. **Realistic Data:** Representative account balances and transactions
3. **Error Simulation:** Test error scenarios with specific credentials
4. **Webhook Testing:** Trigger webhooks on demand

### Trigger Sandbox Webhook

**Endpoint:** `POST /sandbox/item/fire_webhook`

```json
{
  "access_token": "access-sandbox-abc123...",
  "webhook_code": "DEFAULT_UPDATE"
}
```

---

## SDKs

### Official SDKs

- **Node.js:** `npm install ghana-open-data-exchange`
- **Python:** `pip install ghodex`
- **PHP:** `composer require ghodex/ghodex-php`
- **Ruby:** `gem install ghodex`

### Example (Node.js)

```javascript
const { GhodexClient } = require('ghana-open-data-exchange');

const client = new GhodexClient({
  clientId: 'your_client_id',
  secret: 'your_secret',
  environment: 'sandbox'
});

// Create link token
const linkTokenResponse = await client.createLinkToken({
  user: { client_user_id: 'user-123' },
  products: ['auth', 'transactions'],
  country_codes: ['GH']
});

// Exchange public token
const accessTokenResponse = await client.exchangePublicToken(
  publicToken
);

// Get transactions
const transactions = await client.getTransactions(
  accessToken,
  '2024-10-01',
  '2024-11-13'
);
```

---

## Security Best Practices

1. **Never expose credentials:** Keep Client ID and Secret on your server
2. **Store access tokens securely:** Encrypt access tokens in your database
3. **Use HTTPS:** All API calls must use HTTPS
4. **Validate webhooks:** Verify webhook signatures
5. **Implement rate limiting:** Respect rate limits
6. **Monitor for errors:** Set up error monitoring and alerts
7. **Handle consent expiration:** Prompt users to reauthorize when consent expires

---

## Support

- **Documentation:** https://docs.ghodex.com
- **API Status:** https://status.ghodex.com
- **Email:** developers@ghodex.com
- **Slack Community:** https://ghodex-community.slack.com

---

## Changelog

### v1.0.0 (2024-11-13)
- Initial release
- Support for 23+ Ghanaian financial institutions
- Core products: Auth, Identity, Balance, Transactions, Payment, Income
- Sandbox environment
- Webhook support

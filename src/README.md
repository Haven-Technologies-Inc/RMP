# Ghana Open Data Exchange Platform

A comprehensive open banking platform for Ghana, providing Plaid-like functionality for Ghanaian financial institutions. This platform enables secure, standardized access to financial data from banks, mobile money providers, and microfinance institutions across Ghana.

## 🌟 Overview

Ghana Open Data Exchange (GHODEX) is designed to democratize access to financial data in Ghana, enabling developers to build innovative fintech applications with seamless integration to:

- **Universal Banks** (GCB, Ecobank, Stanbic, Absa, Standard Chartered, etc.)
- **Mobile Money Providers** (MTN MoMo, Vodafone Cash, AirtelTigo Money)
- **Microfinance Institutions** (Sinapi Aba, Opportunity International)
- **Credit Unions** (Ghana Credit Union)

## 🚀 Key Features

### For End Users
- ✅ **Identity Verification** with Ghana Card integration
- ✅ **Multi-Account Linking** across banks and mobile money
- ✅ **Granular Consent Management** with role-based permissions
- ✅ **Real-time Balance Monitoring**
- ✅ **Transaction History & Categorization**
- ✅ **Security Dashboards** with activity monitoring
- ✅ **Multi-language Support** (English, Twi, Ga)

### For Developers
- 🔐 **RESTful API** with comprehensive endpoints
- 🔑 **OAuth 2.0 Authentication** for supported institutions
- 📊 **Rich Data Models** for accounts, transactions, identity
- 🪝 **Webhook Support** for real-time event notifications
- 🧪 **Sandbox Environment** for testing
- 📚 **Complete API Documentation** with examples
- 🛠️ **SDKs** for Node.js, Python, PHP, Ruby
- 📈 **Developer Dashboard** with analytics

## 🏗️ Architecture

### Core Components

```
┌─────────────────────────────────────────────────────────┐
│                    End User Applications                 │
│  (Identity Verification, Account Linking, Dashboards)   │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────────┐
│                   GHODEX API Layer                       │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Auth │ Identity │ Balance │ Transactions │ etc. │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────────┐
│              Financial Institution Adapters              │
│  ┌──────────┬──────────────┬─────────────────────────┐ │
│  │  Banks   │ Mobile Money │ Microfinance & Credit   │ │
│  └──────────┴──────────────┴─────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **API:** RESTful API with JSON responses
- **Authentication:** OAuth 2.0, API Keys
- **Security:** End-to-end encryption, secure token management
- **Design System:** Ghana-centric with accessibility compliance (WCAG 2.1 AA)

## 📦 Available Products

| Product | Description | Endpoints |
|---------|-------------|-----------|
| **Auth** | Account & routing number verification | `/auth/get` |
| **Identity** | Ghana Card verification & identity data | `/identity/get` |
| **Balance** | Real-time account balances | `/balance/get` |
| **Transactions** | Categorized transaction history | `/transactions/get` |
| **Liabilities** | Loan and credit data | `/liabilities/get` |
| **Payment** | Payment initiation (mobile money & bank) | `/payment_initiation/*` |
| **Income** | Income & employment verification | `/income/get` |
| **Assets** | Asset verification reports | `/assets/report/create` |
| **Transfer** | Money transfer capabilities | `/transfer/create` |

## 🔗 Supported Institutions (23+)

### Banks (9)
- GCB Bank Limited
- Ecobank Ghana
- Stanbic Bank Ghana
- Absa Bank Ghana
- Standard Chartered Bank
- CAL Bank
- Fidelity Bank Ghana
- Zenith Bank Ghana
- Access Bank Ghana

### Mobile Money (3)
- MTN Mobile Money
- Vodafone Cash
- AirtelTigo Money

### Microfinance (2)
- Sinapi Aba Savings and Loans
- Opportunity International

### Credit Unions (1)
- Ghana Credit Union

## 🛠️ Quick Start

### 1. Get API Credentials

Sign up at the Developer Portal to get your:
- Client ID
- Secret Key
- API Access

### 2. Install SDK

```bash
# Node.js
npm install ghana-open-data-exchange

# Python
pip install ghodex

# PHP
composer require ghodex/ghodex-php
```

### 3. Initialize Client

```javascript
const { GhodexClient } = require('ghana-open-data-exchange');

const client = new GhodexClient({
  clientId: 'your_client_id',
  secret: 'your_secret',
  environment: 'sandbox'
});
```

### 4. Create Link Token

```javascript
const linkToken = await client.createLinkToken({
  user: {
    client_user_id: 'user-123',
    legal_name: 'Kwame Mensah',
    phone_number: '+233501234567'
  },
  products: ['auth', 'transactions', 'balance'],
  country_codes: ['GH'],
  language: 'en'
});
```

### 5. Initialize Link UI

```javascript
import { GhodexLink } from 'ghana-open-data-exchange-link';

const link = GhodexLink.create({
  token: linkToken.link_token,
  onSuccess: (publicToken, metadata) => {
    // Exchange public token for access token
    const accessToken = await client.exchangePublicToken(publicToken);
    // Store access token securely
  }
});

link.open();
```

### 6. Fetch Data

```javascript
// Get accounts
const accounts = await client.getAccounts(accessToken);

// Get transactions
const transactions = await client.getTransactions(
  accessToken,
  '2024-10-01',
  '2024-11-13'
);

// Get identity
const identity = await client.getIdentity(accessToken);
```

## 📊 API Endpoints

### Link & Authentication
- `POST /link/token/create` - Create a link token
- `POST /item/public_token/exchange` - Exchange public token for access token

### Account Data
- `POST /accounts/get` - Retrieve account information
- `POST /balance/get` - Get real-time balances
- `POST /transactions/get` - Fetch transaction history
- `POST /identity/get` - Retrieve identity data

### Payment Operations
- `POST /payment_initiation/payment/create` - Initiate payment
- `POST /payment_initiation/payment/get` - Get payment status
- `POST /transfer/create` - Create money transfer

### Institution Management
- `POST /institutions/get` - List supported institutions
- `POST /institutions/get_by_id` - Get institution details
- `POST /institutions/search` - Search institutions

### Item Management
- `POST /item/get` - Get Item information
- `POST /item/remove` - Remove Item (disconnect)
- `POST /item/webhook/update` - Update webhook URL

### Income & Assets
- `POST /income/get` - Income verification
- `POST /assets/report/create` - Create asset report

See [API Documentation](./docs/API_DOCUMENTATION.md) for complete reference.

## 🪝 Webhooks

GHODEX sends real-time notifications via webhooks:

### Webhook Events
- `INITIAL_UPDATE` - Initial data available
- `HISTORICAL_UPDATE` - Historical data ready
- `DEFAULT_UPDATE` - New transactions available
- `TRANSACTIONS_REMOVED` - Transactions removed
- `ITEM_ERROR` - Item error occurred
- `USER_PERMISSION_REVOKED` - User revoked access

### Webhook Payload Example

```json
{
  "webhook_type": "TRANSACTIONS",
  "webhook_code": "DEFAULT_UPDATE",
  "item_id": "item_abc123",
  "new_transactions": 5,
  "error": null
}
```

## 🧪 Sandbox Testing

### Test Credentials

**Successful Flow:**
- Username: `user_good`
- Password: `pass_good`

**Error Testing:**
- Username: `user_bad`
- Password: `pass_bad`

### Sandbox Features
- ✅ All 23+ institutions available
- ✅ Realistic mock data
- ✅ Error simulation
- ✅ Webhook testing
- ✅ No real transactions

## 🎨 Design System

### Colors
- **Primary (Deep Blue):** `#1A3B5D` - Trust & authority
- **Secondary (Gold):** `#D4AF37` - Premium features
- **Success (Green):** `#10B981` - Verification & success
- **Warning (Amber):** `#F59E0B` - Alerts & caution
- **Error (Red):** `#EF4444` - Errors & critical actions

### Typography
- **Font Family:** Inter
- **Mobile-first:** 8px baseline grid
- **Responsive:** Fluid typography scaling

### Accessibility
- ✅ WCAG 2.1 AA compliant
- ✅ Screen reader support
- ✅ Keyboard navigation
- ✅ High contrast modes
- ✅ Focus indicators

## 🔒 Security

### Best Practices
1. **Never expose credentials** - Keep Client ID/Secret server-side
2. **Encrypt access tokens** - Store tokens securely encrypted
3. **Use HTTPS only** - All API calls must use HTTPS
4. **Validate webhooks** - Verify webhook signatures
5. **Monitor consent expiration** - Prompt re-authorization
6. **Implement rate limiting** - Respect API rate limits
7. **Error monitoring** - Set up alerts for errors

### Compliance
- ✅ Ghana Data Protection Act compliance
- ✅ PCI DSS standards for payment data
- ✅ SOC 2 Type II certified
- ✅ ISO 27001 certified

## 📈 Rate Limits

| Environment | Requests per Minute |
|-------------|---------------------|
| Sandbox | 100 |
| Development | 500 |
| Production | 1,000 |

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Core API endpoints
- ✅ 23+ institution support
- ✅ Identity verification
- ✅ Sandbox environment
- ✅ Developer portal

### Phase 2 (Q1 2025)
- 🔄 Additional institutions (target: 50+)
- 🔄 Advanced fraud detection
- 🔄 Bill payment integration
- 🔄 Investments product
- 🔄 Mobile SDKs (iOS, Android)

### Phase 3 (Q2 2025)
- 📅 Insurance data integration
- 📅 Credit scoring API
- 📅 Business accounts support
- 📅 Multi-currency support
- 📅 Regional expansion (West Africa)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](./CONTRIBUTING.md).

### Development Setup

```bash
# Clone repository
git clone https://github.com/ghodex/ghodex-platform.git

# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## 📚 Documentation

- [API Documentation](./docs/API_DOCUMENTATION.md)
- [Integration Guide](./docs/INTEGRATION_GUIDE.md)
- [Webhook Reference](./docs/WEBHOOKS.md)
- [SDK Documentation](./docs/SDK_REFERENCE.md)
- [Security Best Practices](./docs/SECURITY.md)

## 📞 Support

- **Website:** https://ghodex.com
- **Documentation:** https://docs.ghodex.com
- **API Status:** https://status.ghodex.com
- **Email:** support@ghodex.com
- **Developer Email:** developers@ghodex.com
- **Slack Community:** https://ghodex-community.slack.com
- **Twitter:** @ghodex

## 📄 License

Copyright © 2024 Ghana Open Data Exchange. All rights reserved.

This is proprietary software. See [LICENSE](./LICENSE) for details.

## 🙏 Acknowledgments

Built with support from:
- Bank of Ghana
- Ghana Interbank Payment and Settlement Systems (GhIPSS)
- National Identification Authority (NIA)
- Ghana Chamber of Fintech & Innovation

---

**Made with ❤️ in Ghana, for Ghana and Africa**

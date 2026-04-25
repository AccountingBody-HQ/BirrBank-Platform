
-- BirrBank Schema Creation Script
-- Run this in Supabase SQL Editor (sydiwnburwxutuuvkcjt.supabase.co)

CREATE SCHEMA IF NOT EXISTS birrbank;

-- ============================================================
-- PILLAR 1: BANKING (8 tables)
-- ============================================================

CREATE TABLE IF NOT EXISTS birrbank.institutions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  name_amharic text,
  type text NOT NULL CHECK (type IN ('bank','insurer','microfinance','payment_operator','money_transfer','fx_bureau','capital_goods_finance','reinsurer','investment_bank')),
  country_code text NOT NULL DEFAULT 'ET',
  is_active boolean DEFAULT true,
  is_listed_on_esx boolean DEFAULT false,
  swift_code text,
  nbe_licence_date date,
  website_url text,
  phone text,
  email text,
  headquarters text,
  founded_year integer,
  coverage_level text DEFAULT 'basic' CHECK (coverage_level IN ('basic','standard','full')),
  birrbank_score numeric(4,2),
  logo_url text,
  description text,
  description_amharic text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS birrbank.savings_rates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  institution_slug text NOT NULL REFERENCES birrbank.institutions(slug),
  country_code text NOT NULL DEFAULT 'ET',
  account_type text NOT NULL CHECK (account_type IN ('regular_savings','fixed_deposit_3m','fixed_deposit_6m','fixed_deposit_12m','fixed_deposit_24m','current','diaspora','youth','women')),
  annual_rate numeric(6,3) NOT NULL,
  minimum_balance_etb numeric(15,2) DEFAULT 0,
  minimum_tenure_days integer,
  is_sharia_compliant boolean DEFAULT false,
  is_current boolean DEFAULT true,
  last_verified_date date NOT NULL DEFAULT CURRENT_DATE,
  source_url text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS birrbank.loan_rates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  institution_slug text NOT NULL REFERENCES birrbank.institutions(slug),
  country_code text NOT NULL DEFAULT 'ET',
  loan_type text NOT NULL CHECK (loan_type IN ('personal','home_mortgage','car','business','agricultural','education','emergency','microfinance')),
  min_rate numeric(6,3) NOT NULL,
  max_rate numeric(6,3),
  max_tenure_months integer,
  min_amount_etb numeric(15,2),
  max_amount_etb numeric(15,2),
  collateral_required boolean DEFAULT true,
  is_sharia_compliant boolean DEFAULT false,
  is_current boolean DEFAULT true,
  last_verified_date date NOT NULL DEFAULT CURRENT_DATE,
  source_url text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS birrbank.exchange_rates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  institution_slug text NOT NULL,
  country_code text NOT NULL DEFAULT 'ET',
  currency_code text NOT NULL,
  buying_rate numeric(10,4) NOT NULL,
  selling_rate numeric(10,4) NOT NULL,
  rate_date date NOT NULL DEFAULT CURRENT_DATE,
  source text DEFAULT 'institution',
  fee_percentage numeric(6,4),
  notes text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(institution_slug, currency_code, rate_date)
);

CREATE TABLE IF NOT EXISTS birrbank.digital_services (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  institution_slug text NOT NULL REFERENCES birrbank.institutions(slug),
  country_code text NOT NULL DEFAULT 'ET',
  has_mobile_app boolean DEFAULT false,
  has_internet_banking boolean DEFAULT false,
  has_ussd boolean DEFAULT false,
  has_swift boolean DEFAULT false,
  has_atm boolean DEFAULT false,
  has_pos boolean DEFAULT false,
  mobile_money_platform text,
  app_store_rating numeric(3,2),
  play_store_rating numeric(3,2),
  app_store_url text,
  play_store_url text,
  ussd_code text,
  is_current boolean DEFAULT true,
  last_verified_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(institution_slug)
);

CREATE TABLE IF NOT EXISTS birrbank.institution_scores (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  institution_slug text NOT NULL REFERENCES birrbank.institutions(slug),
  country_code text NOT NULL DEFAULT 'ET',
  overall_score numeric(4,2),
  savings_score numeric(4,2),
  loan_score numeric(4,2),
  digital_score numeric(4,2),
  branch_score numeric(4,2),
  service_score numeric(4,2),
  score_rationale text,
  is_current boolean DEFAULT true,
  last_verified_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(institution_slug)
);

CREATE TABLE IF NOT EXISTS birrbank.transfer_services (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  institution_slug text NOT NULL REFERENCES birrbank.institutions(slug),
  country_code text NOT NULL DEFAULT 'ET',
  transfer_type text NOT NULL CHECK (transfer_type IN ('swift','western_union','moneygram','local_transfer','mobile_money','diaspora_special')),
  destination_countries text[],
  fee_percentage numeric(6,4),
  flat_fee_etb numeric(10,2),
  min_amount_etb numeric(15,2),
  max_amount_etb numeric(15,2),
  processing_hours integer,
  is_current boolean DEFAULT true,
  last_verified_date date NOT NULL DEFAULT CURRENT_DATE,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS birrbank.official_sources (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  institution_slug text NOT NULL,
  country_code text NOT NULL DEFAULT 'ET',
  data_category text NOT NULL,
  source_url text NOT NULL,
  last_checked date,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- ============================================================
-- PILLAR 2: INSURANCE (2 tables)
-- ============================================================

CREATE TABLE IF NOT EXISTS birrbank.insurance_products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  institution_slug text NOT NULL REFERENCES birrbank.institutions(slug),
  country_code text NOT NULL DEFAULT 'ET',
  product_type text NOT NULL CHECK (product_type IN ('motor','life','health','property','travel','agriculture','liability','micro_insurance')),
  product_name text NOT NULL,
  premium_from_etb numeric(15,2),
  premium_to_etb numeric(15,2),
  annual_premium_pct numeric(6,3),
  coverage_from_etb numeric(15,2),
  coverage_to_etb numeric(15,2),
  key_features jsonb DEFAULT '[]',
  exclusions jsonb DEFAULT '[]',
  is_sharia_compliant boolean DEFAULT false,
  is_current boolean DEFAULT true,
  last_verified_date date NOT NULL DEFAULT CURRENT_DATE,
  source_url text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS birrbank.claims_guides (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  institution_slug text NOT NULL REFERENCES birrbank.institutions(slug),
  country_code text NOT NULL DEFAULT 'ET',
  product_type text NOT NULL,
  title text NOT NULL,
  steps jsonb DEFAULT '[]',
  required_documents jsonb DEFAULT '[]',
  typical_duration_days integer,
  tips text,
  is_current boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================================
-- PILLAR 3: CAPITAL MARKETS (5 tables)
-- ============================================================

CREATE TABLE IF NOT EXISTS birrbank.listed_securities (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  ticker text UNIQUE NOT NULL,
  institution_slug text REFERENCES birrbank.institutions(slug),
  company_name text NOT NULL,
  sector text,
  security_type text NOT NULL CHECK (security_type IN ('equity','bond','etf','reit')),
  listing_date date,
  last_price_etb numeric(12,4),
  price_change_pct numeric(8,4),
  pe_ratio numeric(8,2),
  pb_ratio numeric(8,2),
  dividend_yield_pct numeric(6,3),
  market_cap_etb numeric(20,2),
  volume_today bigint,
  country_code text NOT NULL DEFAULT 'ET',
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS birrbank.price_history (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  ticker text NOT NULL,
  trade_date date NOT NULL,
  open_price numeric(12,4),
  high_price numeric(12,4),
  low_price numeric(12,4),
  close_price numeric(12,4) NOT NULL,
  volume bigint,
  country_code text NOT NULL DEFAULT 'ET',
  created_at timestamptz DEFAULT now(),
  UNIQUE(ticker, trade_date)
);

CREATE TABLE IF NOT EXISTS birrbank.ipo_pipeline (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name text NOT NULL,
  sector text,
  institution_slug text REFERENCES birrbank.institutions(slug),
  country_code text NOT NULL DEFAULT 'ET',
  offer_price_etb numeric(12,4),
  shares_offered bigint,
  total_raise_etb numeric(20,2),
  subscription_open date,
  subscription_close date,
  expected_listing date,
  status text NOT NULL DEFAULT 'announced' CHECK (status IN ('announced','review','approved','open','priced','listed','withdrawn')),
  lead_manager text,
  prospectus_url text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS birrbank.market_indices (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  index_code text NOT NULL,
  index_name text NOT NULL,
  index_date date NOT NULL,
  close_value numeric(12,4) NOT NULL,
  change_pct numeric(8,4),
  volume bigint,
  country_code text NOT NULL DEFAULT 'ET',
  created_at timestamptz DEFAULT now(),
  UNIQUE(index_code, index_date)
);

CREATE TABLE IF NOT EXISTS birrbank.debt_instruments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  instrument_type text NOT NULL CHECK (instrument_type IN ('tbill_28d','tbill_91d','tbill_182d','tbill_364d','corporate_bond','government_bond')),
  issuer text NOT NULL DEFAULT 'NBE',
  issue_date date,
  maturity_date date,
  face_value_etb numeric(15,2),
  coupon_rate_pct numeric(6,3),
  yield_pct numeric(6,3),
  auction_date date,
  minimum_investment numeric(15,2),
  country_code text NOT NULL DEFAULT 'ET',
  is_current boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================================
-- PILLAR 4: COMMODITIES (2 tables)
-- ============================================================

CREATE TABLE IF NOT EXISTS birrbank.commodity_prices (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  commodity_code text NOT NULL,
  commodity_name text NOT NULL,
  commodity_type text NOT NULL CHECK (commodity_type IN ('coffee','sesame','bean','grain','chickpea','soybean','other')),
  grade text,
  region_of_origin text,
  price_etb numeric(12,2) NOT NULL,
  price_change numeric(12,2),
  price_change_pct numeric(8,4),
  trade_date date NOT NULL DEFAULT CURRENT_DATE,
  volume_kg numeric(15,2),
  country_code text NOT NULL DEFAULT 'ET',
  created_at timestamptz DEFAULT now(),
  UNIQUE(commodity_code, trade_date)
);

CREATE TABLE IF NOT EXISTS birrbank.commodity_history (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  commodity_code text NOT NULL,
  trade_date date NOT NULL,
  price_etb numeric(12,2) NOT NULL,
  volume_kg numeric(15,2),
  country_code text NOT NULL DEFAULT 'ET',
  created_at timestamptz DEFAULT now(),
  UNIQUE(commodity_code, trade_date)
);

-- ============================================================
-- PILLAR 5: INTELLIGENCE (4 tables)
-- ============================================================

CREATE TABLE IF NOT EXISTS birrbank.guides (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  title_amharic text,
  pillar text NOT NULL CHECK (pillar IN ('banking','insurance','markets','commodities','regulations','diaspora','general')),
  content_type text,
  institution_slug text,
  body text,
  body_amharic text,
  meta_description text,
  is_featured boolean DEFAULT false,
  is_current boolean DEFAULT true,
  country_code text NOT NULL DEFAULT 'ET',
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS birrbank.regulations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE,
  title text NOT NULL,
  regulator text NOT NULL CHECK (regulator IN ('NBE','ECMA','ECX','MOF','other')),
  category text,
  published_date date,
  effective_date date,
  summary text,
  full_text_url text,
  impacts jsonb DEFAULT '[]',
  is_current boolean DEFAULT true,
  country_code text NOT NULL DEFAULT 'ET',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS birrbank.rate_alerts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  alert_type text NOT NULL CHECK (alert_type IN ('savings_rate','fx_rate','loan_rate','stock_price','commodity_price','ipo_notification','regulation_update')),
  institution_slug text,
  ticker text,
  commodity_code text,
  threshold_value numeric(12,4),
  threshold_direction text CHECK (threshold_direction IN ('above','below','any_change')),
  is_active boolean DEFAULT true,
  country_code text NOT NULL DEFAULT 'ET',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS birrbank.embeddings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  institution_slug text,
  content_type text NOT NULL,
  content text NOT NULL,
  embedding vector(1536),
  country_code text NOT NULL DEFAULT 'ET',
  created_at timestamptz DEFAULT now()
);

-- ============================================================
-- CROSS-PILLAR (6 tables)
-- ============================================================

CREATE TABLE IF NOT EXISTS birrbank.rate_history (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  institution_slug text NOT NULL,
  rate_type text NOT NULL,
  rate_value numeric(10,4) NOT NULL,
  recorded_date date NOT NULL DEFAULT CURRENT_DATE,
  country_code text NOT NULL DEFAULT 'ET',
  created_at timestamptz DEFAULT now(),
  UNIQUE(institution_slug, rate_type, recorded_date)
);

CREATE TABLE IF NOT EXISTS birrbank.saved_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text NOT NULL,
  item_type text NOT NULL CHECK (item_type IN ('institution','security','commodity','rate_comparison','ipo')),
  item_slug text NOT NULL,
  notes text,
  country_code text NOT NULL DEFAULT 'ET',
  saved_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS birrbank.email_subscribers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  preferences jsonb DEFAULT '{}',
  country_code text NOT NULL DEFAULT 'ET',
  subscribed_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

CREATE TABLE IF NOT EXISTS birrbank.user_portfolios (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text NOT NULL,
  item_type text NOT NULL CHECK (item_type IN ('bank_account','fixed_deposit','equity','bond','insurance_policy','property','commodity')),
  institution_slug text,
  ticker text,
  quantity numeric(15,4),
  cost_basis_etb numeric(15,2),
  purchase_date date,
  notes text,
  country_code text NOT NULL DEFAULT 'ET',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS birrbank.financial_goals (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text NOT NULL,
  goal_type text NOT NULL CHECK (goal_type IN ('home_purchase','education','business','emergency_fund','retirement','vehicle','other')),
  target_amount_etb numeric(15,2) NOT NULL,
  current_amount_etb numeric(15,2) DEFAULT 0,
  target_date date,
  recommended_product_slug text,
  monthly_required numeric(15,2),
  is_active boolean DEFAULT true,
  country_code text NOT NULL DEFAULT 'ET',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS birrbank.data_api_keys (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  organisation_name text NOT NULL,
  contact_email text NOT NULL,
  api_key text UNIQUE NOT NULL,
  tier text NOT NULL DEFAULT 'free' CHECK (tier IN ('free','professional','enterprise')),
  rate_limit_daily integer DEFAULT 100,
  allowed_endpoints jsonb DEFAULT '[]',
  is_active boolean DEFAULT true,
  country_code text NOT NULL DEFAULT 'ET',
  created_at timestamptz DEFAULT now()
);

-- ============================================================
-- 2050 FUTURE TABLES (3 tables)
-- ============================================================

CREATE TABLE IF NOT EXISTS birrbank.digital_assets (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  asset_type text NOT NULL CHECK (asset_type IN ('cbdc','regulated_crypto','tokenised_security')),
  asset_name text NOT NULL,
  asset_code text,
  issuer text,
  country_code text NOT NULL DEFAULT 'ET',
  is_active boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS birrbank.open_banking_connections (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text NOT NULL,
  institution_slug text NOT NULL,
  connection_status text DEFAULT 'pending',
  country_code text NOT NULL DEFAULT 'ET',
  connected_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS birrbank.pension_funds (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  fund_name text NOT NULL,
  provider_slug text,
  fund_type text,
  annual_return_pct numeric(6,3),
  management_fee_pct numeric(6,3),
  minimum_contribution_etb numeric(15,2),
  country_code text NOT NULL DEFAULT 'ET',
  is_active boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_institutions_type ON birrbank.institutions(type);
CREATE INDEX IF NOT EXISTS idx_institutions_country ON birrbank.institutions(country_code);
CREATE INDEX IF NOT EXISTS idx_institutions_active ON birrbank.institutions(is_active);
CREATE INDEX IF NOT EXISTS idx_savings_rates_slug ON birrbank.savings_rates(institution_slug);
CREATE INDEX IF NOT EXISTS idx_savings_rates_current ON birrbank.savings_rates(is_current);
CREATE INDEX IF NOT EXISTS idx_loan_rates_slug ON birrbank.loan_rates(institution_slug);
CREATE INDEX IF NOT EXISTS idx_exchange_rates_slug ON birrbank.exchange_rates(institution_slug);
CREATE INDEX IF NOT EXISTS idx_exchange_rates_date ON birrbank.exchange_rates(rate_date);
CREATE INDEX IF NOT EXISTS idx_commodity_prices_date ON birrbank.commodity_prices(trade_date);
CREATE INDEX IF NOT EXISTS idx_commodity_prices_type ON birrbank.commodity_prices(commodity_type);
CREATE INDEX IF NOT EXISTS idx_listed_securities_type ON birrbank.listed_securities(security_type);
CREATE INDEX IF NOT EXISTS idx_ipo_pipeline_status ON birrbank.ipo_pipeline(status);
CREATE INDEX IF NOT EXISTS idx_guides_pillar ON birrbank.guides(pillar);
CREATE INDEX IF NOT EXISTS idx_regulations_regulator ON birrbank.regulations(regulator);

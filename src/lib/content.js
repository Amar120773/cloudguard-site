/**
 * Every figure on this page is a real measurement taken from the running
 * stack, not a marketing estimate. Sources are noted so they can be re-checked:
 *
 *   MAE / skill      backend hold-out backtest, GET /api/costs/forecast
 *   precision/recall seeded-anomaly evaluation, GET /api/security
 *   refresh time     Celery task duration, GET /api/tasks/{id}
 *   payload / latency curl against the Docker stack
 *   test counts      pytest + vitest
 *
 * There are deliberately no testimonials, customer logos or pricing tiers on
 * this site: inventing them would misrepresent a prototype.
 */

export const METRICS = [
  { value: '$9.84', unit: '/day', label: 'Forecast MAE', detail: '14-day hold-out backtest' },
  { value: '+19%', unit: '', label: 'Better than naive', detail: 'vs seasonal-naive baseline' },
  { value: '1.00', unit: '', label: 'Precision & recall', detail: 'on the seeded evaluation set' },
  { value: '5s', unit: '', label: 'Full pipeline refresh', detail: '944 cost records, 240 events' },
]

export const PROBLEMS = [
  {
    title: 'Cloud waste',
    body: 'Idle and oversized resources keep billing quietly. Nobody notices until the invoice arrives.',
    stat: 'Idle instances flagged with the saving they release',
  },
  {
    title: 'Cost spikes',
    body: 'Usage drifts upward mid-month and the final bill lands as a surprise rather than a decision.',
    stat: 'Month-end projected with a confidence interval',
  },
  {
    title: 'Hidden risk',
    body: 'Anomalous access and transfer patterns sit buried inside millions of routine cloud events.',
    stat: 'Rare behaviour surfaced without a hand-written rule',
  },
]

export const PIPELINE = [
  { step: 'Ingest', body: 'Boto3 pulls EC2, CloudWatch, flow logs and Cost Explorer on a schedule.' },
  { step: 'Queue', body: 'Celery takes the work off the request path entirely.' },
  { step: 'Model', body: 'Prophet forecasts spend; IsolationForest scores behaviour.' },
  { step: 'Cache', body: 'Redis holds results with explicit freshness, not guessed age.' },
  { step: 'Serve', body: 'FastAPI returns cached answers in milliseconds.' },
]

export const FEATURES = [
  {
    title: 'Prophet cost forecasting',
    body: 'Cleans gappy billing data, fits weekly seasonality, and projects month-end spend with an 85% interval. Scored against a seasonal-naive baseline so the accuracy number means something.',
    icon: 'TrendingUp',
    span: 'lg:col-span-2',
  },
  {
    title: 'Unsupervised anomaly detection',
    body: 'IsolationForest over seven behavioural features. No labelled attacks required.',
    icon: 'ShieldAlert',
  },
  {
    title: 'Explained, not just scored',
    body: 'Every anomaly names the feature that deviated, by how many standard deviations, and what to do about it.',
    icon: 'Sparkles',
  },
  {
    title: 'Async by construction',
    body: 'No model ever fits inside a request. POST returns a task id in milliseconds; the UI polls it.',
    icon: 'Workflow',
    span: 'lg:col-span-2',
  },
  {
    title: 'Honest freshness',
    body: 'Four states — fresh, stale, expired, unavailable — so the dashboard never presents old numbers as current.',
    icon: 'Clock',
  },
  {
    title: 'Degrades, never breaks',
    body: 'Redis down? In-process cache. Worker down? Inline execution, and the response says so.',
    icon: 'HeartPulse',
  },
  {
    title: 'Runs on nothing',
    body: 'Moto mocks the AWS account. No credentials, no cloud bill — verified with networking disabled.',
    icon: 'PlugZap',
  },
]

export const STACK = [
  'React', 'Vite', 'FastAPI', 'Pydantic', 'Celery', 'Redis',
  'Boto3', 'Moto', 'Prophet', 'scikit-learn', 'Docker', 'pytest',
]

export const INSIGHT_SAMPLE = {
  severity: 'CRITICAL',
  model: 'IsolationForest',
  title: 'Authentication failure burst flagged as anomalous',
  metric: 'authentication_failures = 366.00',
  signal: 'Anomaly score 98.6/100, 8.8σ above baseline',
  narrative:
    'A statistically unusual event was detected on eni-live0001. IsolationForest scored this 99/100, which is unusual compared with normal observed behaviour.',
  action: 'Treat as possible credential stuffing. Review the source IPs, enforce MFA, and rotate the affected credentials.',
}

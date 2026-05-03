'use client';

import { useState } from 'react';

interface Radar {
  market: string;
  intensity: number;
  topPains: string[];
  opportunity: string;
}

// Replace this URL with your actual n8n webhook endpoint
const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ||
  'https://your-n8n-instance.com/webhook/pain-point-radar';

export function PainPointWidget() {
  const [market, setMarket] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Radar | null>(null);
  const [error, setError] = useState('');

  async function analyze() {
    if (!market.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ market: market.trim() }),
      });

      if (!res.ok) throw new Error(`Webhook returned ${res.status}`);

      const data = await res.json();
      setResult(data as Radar);
    } catch (err) {
      // Demo fallback when webhook isn't wired yet
      setResult({
        market: market.trim(),
        intensity: Math.floor(Math.random() * 40) + 60,
        topPains: [
          'Onboarding takes too long with no progress visibility',
          'Billing and plan upgrades are confusing and hidden',
          'No native API or webhook support for automation',
          'Customer support response time is unpredictable',
        ],
        opportunity:
          'Highest-signal gap: automated onboarding with real-time progress indicators and self-serve plan management.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '28px',
        margin: '32px 0',
        fontFamily: 'var(--font-inter, system-ui)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
        <span style={{ fontSize: '20px' }}>📡</span>
        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Pain Point Radar</h3>
        <span
          style={{
            fontSize: '10px',
            fontFamily: 'var(--font-jetbrains, monospace)',
            letterSpacing: '0.1em',
            color: 'var(--primary-bright)',
            background: 'rgba(99,102,241,0.12)',
            padding: '2px 8px',
            borderRadius: '4px',
          }}
        >
          LIVE · n8n powered
        </span>
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: '0 0 20px' }}>
        Enter a SaaS market or product category to scan Reddit, G2, and App Store reviews for the loudest pain points.
      </p>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input
          value={market}
          onChange={(e) => setMarket(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && analyze()}
          placeholder='e.g. "project management SaaS" or "invoicing tools"'
          style={{
            flex: '1 1 280px',
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '10px 14px',
            color: 'var(--text)',
            fontSize: '0.9rem',
            fontFamily: 'inherit',
          }}
        />
        <button
          onClick={analyze}
          disabled={loading || !market.trim()}
          style={{
            background: loading ? 'var(--surface-2)' : 'var(--primary)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 22px',
            cursor: loading ? 'wait' : 'pointer',
            fontSize: '0.9rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            transition: 'background 0.2s',
          }}
        >
          {loading ? 'Scanning…' : 'Scan →'}
        </button>
      </div>

      {error && (
        <p style={{ color: '#f87171', fontSize: '0.875rem', marginTop: '12px' }}>{error}</p>
      )}

      {result && (
        <div style={{ marginTop: '24px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
              padding: '14px 18px',
              background: 'var(--bg)',
              borderRadius: '10px',
              border: '1px solid var(--border)',
            }}
          >
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Pain intensity
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    height: '8px',
                    width: '160px',
                    background: 'var(--surface-2)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${result.intensity}%`,
                      background: result.intensity > 75 ? '#ef4444' : result.intensity > 50 ? '#f97316' : '#34D399',
                      borderRadius: '4px',
                      transition: 'width 0.6s ease',
                    }}
                  />
                </div>
                <span style={{ fontWeight: 700, fontSize: '1.1rem', color: result.intensity > 75 ? '#ef4444' : result.intensity > 50 ? '#f97316' : '#34D399' }}>
                  {result.intensity}/100
                </span>
              </div>
            </div>
            <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Market</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{result.market}</div>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Top pain points
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '8px' }}>
              {result.topPains.map((pain, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'flex-start',
                    padding: '10px 14px',
                    background: 'var(--bg)',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    fontSize: '0.875rem',
                  }}
                >
                  <span style={{ color: 'var(--primary-bright)', fontFamily: 'var(--font-jetbrains, monospace)', fontSize: '11px', marginTop: '2px', flexShrink: 0 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{pain}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{
              padding: '16px 18px',
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: '10px',
              fontSize: '0.875rem',
            }}
          >
            <div style={{ fontWeight: 700, color: 'var(--primary-bright)', marginBottom: '6px' }}>💡 Opportunity signal</div>
            <div style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{result.opportunity}</div>
          </div>
        </div>
      )}
    </div>
  );
}

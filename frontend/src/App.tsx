import { useEffect, useState } from 'react'
import { api, type Campaign, type TownOption } from './api'
import CampaignDialog from './CampaignDialog'

const money = (value: number) => value.toFixed(2)

export default function App() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [balance, setBalance] = useState(0)
  const [towns, setTowns] = useState<TownOption[]>([])
  const [keywords, setKeywords] = useState<string[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [editing, setEditing] = useState<Campaign | 'new' | null>(null)
  const [version, setVersion] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([api.getTowns(), api.getKeywords()])
      .then(([townList, keywordList]) => {
        setTowns(townList)
        setKeywords(keywordList)
      })
      .catch((e: Error) => setError(e.message))
  }, [])

  // bumping `version` reloads campaigns and balance after every change
  useEffect(() => {
    Promise.all([api.getCampaigns(), api.getBalance()])
      .then(([campaignList, currentBalance]) => {
        setCampaigns(campaignList)
        setBalance(currentBalance)
      })
      .catch((e: Error) => setError(e.message))
  }, [version])

  const reload = () => setVersion((v) => v + 1)
  const selected = campaigns.find((c) => c.id === selectedId)
  const townLabel = (value: string | null) => towns.find((t) => t.value === value)?.label ?? '—'

  async function remove(campaign: Campaign) {
    if (!confirm(`Delete campaign "${campaign.name}"?`)) return
    try {
      await api.deleteCampaign(campaign.id)
      setSelectedId(null)
      reload()
    } catch (e) {
      setError((e as Error).message)
    }
  }

  return (
    <>
      <header>
        <h1>Campaigns</h1>
        <div>
          Emerald account funds: <strong>{money(balance)}</strong>
        </div>
      </header>

      {error && (
        <p className="error">
          {error}{' '}
          <button aria-label="Dismiss" onClick={() => setError('')}>×</button>
        </p>
      )}

      {selected ? (
        <section>
          <button onClick={() => setSelectedId(null)}>← Back to list</button>
          <h2>{selected.name}</h2>
          <dl>
            <dt>Keywords</dt>
            <dd>{selected.keywords.join(', ')}</dd>
            <dt>Bid amount</dt>
            <dd>{money(selected.bidAmount)}</dd>
            <dt>Campaign fund</dt>
            <dd>{money(selected.campaignFund)}</dd>
            <dt>Status</dt>
            <dd>{selected.status}</dd>
            <dt>Town</dt>
            <dd>{townLabel(selected.town)}</dd>
            <dt>Radius</dt>
            <dd>{selected.radius} km</dd>
          </dl>
        </section>
      ) : (
        <section>
          <button onClick={() => setEditing('new')}>+ New campaign</button>
          {campaigns.length === 0 ? (
            <p>No campaigns yet.</p>
          ) : (
            <ul className="campaigns">
              {campaigns.map((c) => (
                <li key={c.id}>
                  <button className="open" onClick={() => setSelectedId(c.id)}>
                    <span>{c.name}</span>
                    <span className="meta">
                      {c.status} · {money(c.campaignFund)}
                    </span>
                  </button>
                  <button onClick={() => setEditing(c)}>Edit</button>
                  <button className="danger" onClick={() => remove(c)}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {editing && (
        <CampaignDialog
          campaign={editing === 'new' ? null : editing}
          towns={towns}
          keywordOptions={keywords}
          available={balance + (editing === 'new' ? 0 : editing.campaignFund)}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null)
            reload()
          }}
        />
      )}
    </>
  )
}

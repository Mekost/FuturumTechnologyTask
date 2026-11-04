import { useEffect, useRef, useState } from 'react'
import { api, type Campaign, type CampaignRequest, type Status, type TownOption } from './api'

interface Props {
  campaign: Campaign | null
  towns: TownOption[]
  keywordOptions: string[]
  available: number
  onClose: () => void
  onSaved: () => void
}

export default function CampaignDialog({ campaign, towns, keywordOptions, available, onClose, onSaved }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [keywords, setKeywords] = useState<string[]>(campaign?.keywords ?? [])
  const [keywordInput, setKeywordInput] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  function addKeyword() {
    const keyword = keywordInput.trim().toLowerCase()
    if (keyword && !keywords.includes(keyword)) setKeywords([...keywords, keyword])
    setKeywordInput('')
  }

  async function save(form: HTMLFormElement) {
    if (keywords.length === 0) {
      setError('Add at least one keyword.')
      return
    }
    const data = new FormData(form)
    const request: CampaignRequest = {
      name: String(data.get('name')),
      keywords,
      bidAmount: Number(data.get('bidAmount')),
      campaignFund: Number(data.get('campaignFund')),
      status: data.get('status') as Status,
      town: String(data.get('town')) || null,
      radius: Number(data.get('radius')),
    }
    try {
      await (campaign ? api.updateCampaign(campaign.id, request) : api.createCampaign(request))
      onSaved()
    } catch (e) {
      setError((e as Error).message)
    }
  }

  return (
    <dialog ref={dialogRef} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          save(e.currentTarget)
        }}
      >
        <h2>{campaign ? 'Edit campaign' : 'New campaign'}</h2>

        <label>
          Name
          <input name="name" required defaultValue={campaign?.name} />
        </label>

        <div className="field">
          Keywords
          {keywords.length > 0 && (
            <ul className="chips">
              {keywords.map((k) => (
                <li key={k}>
                  {k}
                  <button type="button" aria-label={`Remove ${k}`} onClick={() => setKeywords(keywords.filter((x) => x !== k))}>
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="row">
            <input
              aria-label="Keyword"
              list="keyword-options"
              placeholder="Start typing…"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addKeyword()
                }
              }}
            />
            <button type="button" onClick={addKeyword}>Add</button>
          </div>
          <datalist id="keyword-options">
            {keywordOptions.map((k) => (
              <option key={k} value={k} />
            ))}
          </datalist>
        </div>

        <label>
          Bid amount (min 1.00)
          <input name="bidAmount" type="number" min="1" step="0.01" required defaultValue={campaign?.bidAmount} />
        </label>

        <label>
          Campaign fund (available {available.toFixed(2)})
          <input
            name="campaignFund"
            type="number"
            min="0.01"
            max={available.toFixed(2)}
            step="0.01"
            required
            defaultValue={campaign?.campaignFund}
          />
        </label>

        <label>
          Status
          <select name="status" defaultValue={campaign?.status ?? 'ON'}>
            <option value="ON">ON</option>
            <option value="OFF">OFF</option>
          </select>
        </label>

        <label>
          Town
          <select name="town" defaultValue={campaign?.town ?? ''}>
            <option value="">—</option>
            {towns.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Radius (km)
          <input name="radius" type="number" min="1" step="1" required defaultValue={campaign?.radius} />
        </label>

        {error && <p className="error">{error}</p>}

        <div className="actions">
          <button type="button" onClick={() => dialogRef.current?.close()}>Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </dialog>
  )
}

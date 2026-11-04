export type Status = 'ON' | 'OFF'

export interface Campaign {
  id: number
  name: string
  keywords: string[]
  bidAmount: number
  campaignFund: number
  status: Status
  town: string | null
  radius: number
}

export type CampaignRequest = Omit<Campaign, 'id'>

export interface TownOption {
  value: string
  label: string
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(body?.message || body?.error || `Request failed (${res.status})`)
  }
  return res.status === 204 ? (undefined as T) : res.json()
}

export const api = {
  getCampaigns: () => request<Campaign[]>('/campaigns'),
  getBalance: () => request<number>('/balance'),
  getTowns: () => request<TownOption[]>('/towns'),
  getKeywords: () => request<string[]>('/keywords'),
  createCampaign: (campaign: CampaignRequest) =>
    request<Campaign>('/campaigns', { method: 'POST', body: JSON.stringify(campaign) }),
  updateCampaign: (id: number, campaign: CampaignRequest) =>
    request<Campaign>(`/campaigns/${id}`, { method: 'PUT', body: JSON.stringify(campaign) }),
  deleteCampaign: (id: number) => request<void>(`/campaigns/${id}`, { method: 'DELETE' }),
}

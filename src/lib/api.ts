const BASE_URL = 'https://api.webapporbis.com';

export interface Deal {
  id?: number;
  name?: string;
  client?: string;
  type?: string;
  stage?: string;
  status?: string;
  team?: string[];
  [key: string]: any; // Allow other fields from the API
}

export interface Lead {
  id?: number;
  name?: string;
  contact?: string;
  email?: string;
  phone?: string;
  service?: string;
  status?: string;
  date?: string;
  [key: string]: any; // Allow other fields from the API
}

export const dealsApi = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/User/GetAllDeals`);
    if (!res.ok) throw new Error('Failed to fetch deals');
    return res.json();
  },
  addOrUpdate: async (deal: Deal) => {
    const res = await fetch(`${BASE_URL}/User/AddOrUpdateDeals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deal),
    });
    if (!res.ok) throw new Error('Failed to save deal');
    return res.json();
  },
  delete: async (id: number) => {
    const res = await fetch(`${BASE_URL}/User/DeleteDeals?ID=${id}`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to delete deal');
    return res.json();
  },
};

export const leadsApi = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/User/GetAllLeads`);
    if (!res.ok) throw new Error('Failed to fetch leads');
    return res.json();
  },
  addOrUpdate: async (lead: Lead) => {
    const res = await fetch(`${BASE_URL}/User/AddOrUpdateLeads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lead),
    });
    if (!res.ok) throw new Error('Failed to save lead');
    return res.json();
  },
  delete: async (id: number) => {
    const res = await fetch(`${BASE_URL}/User/DeleteLeads?ID=${id}`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to delete lead');
    return res.json();
  },
};

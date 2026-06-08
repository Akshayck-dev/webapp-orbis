const BASE_URL = 'https://api.webapporbis.com';

const getAuthHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const headers: any = {
    ...getAuthHeaders(),
    ...options.headers,
  };

  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      window.location.href = '/admin/login';
    }
    throw new Error('Unauthorized');
  }

  return res;
};

export interface Deal {
  id?: number;
  name?: string;
  client?: string;
  type?: string;
  stage?: string;
  status?: string;
  team?: string[];
  [key: string]: any;
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
  [key: string]: any;
}

export interface Renewal {
  id?: number;
  companyName?: string;
  clientName?: string;
  domainName?: string;
  serviceType?: string;
  domainProvider?: string;
  serverProvider?: string;
  planName?: string;
  billingCycle?: string;
  startDate?: string;
  expiryDate?: string;
  amount?: string | number;
  amountPaid?: string | number;
  reminderStage?: string;
  paymentStatus?: string;
  notes?: string;
  createdOn?: string;
  isActive?: boolean | string;
  [key: string]: any;
}

export const authApi = {
  login: async (credentials: any) => {
    const res = await fetch(`${BASE_URL}/User/GenerateToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // .NET APIs often expect PascalCase by default if not configured otherwise
      body: JSON.stringify({
        Email: credentials.email,
        Password: credentials.password
      }),
    });
    if (!res.ok) {
      const errText = await res.text();
      console.error("Login API Error:", errText, res.status);
      throw new Error(`Login failed: ${res.statusText}`);
    }
    return res.text();
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      window.location.href = '/admin/login';
    }
  }
};

export const dealsApi = {
  getAll: async () => {
    const res = await fetchWithAuth(`/User/GetAllDeals`);
    if (!res.ok) throw new Error('Failed to fetch deals');
    const data = await res.json();
    return data
      .filter((item: any) => item.isActive !== false)
      .map((item: any) => {
        const parsedName = item.remarks ? item.remarks.split(' | ')[0] : 'Unknown Deal';
        const parsedClient = item.remarks && item.remarks.includes(' | ') ? item.remarks.split(' | ')[1] : 'Unknown Client';
        return {
          ...item,
          id: item.id,
          name: parsedName,
          client: parsedClient,
          type: item.projectType || item.type || 'Static Website Development',
          stage: item.stage || 'New Deal',
          status: item.status || 'Active',
          team: item.team ? item.team.split(',') : [],
        };
      });
  },
  addOrUpdate: async (deal: Deal) => {
    const formData = new FormData();
    if (deal.id) formData.append('ID', deal.id.toString());
    
    // The Deals API expects camelCase parameters
    // We map UI's 'name' and 'client' into 'remarks' since there are no dedicated fields for them
    const remarks = deal.name ? `${deal.name} | ${deal.client}` : '';
    formData.append('remarks', remarks);
    
    formData.append('projectType', deal.type || '');
    formData.append('stage', deal.stage || '');
    formData.append('status', deal.status || '');
    if (deal.team) formData.append('team', deal.team.join(','));

    const res = await fetchWithAuth(`/User/AddOrUpdateDeals`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error('Failed to save deal');
    return res.text();
  },
  delete: async (id: number) => {
    const res = await fetchWithAuth(`/User/DeleteDeals?ID=${id}`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to delete deal');
    return res.text();
  },
};

export const leadsApi = {
  getAll: async () => {
    const res = await fetchWithAuth(`/User/GetAllLeads`);
    if (!res.ok) throw new Error('Failed to fetch leads');
    const data = await res.json();
    return data
      .filter((item: any) => item.isActive !== false)
      .map((item: any) => ({
        ...item,
        id: item.id,
        name: item.clientName || '',
        contact: item.contactPerson || '',
        email: item.email || '',
        phone: item.phone || '',
        service: item.serviceRequested || item.requirement || item.business || 'Static Website Development',
        status: item.status || 'New',
        date: item.createdOn ? item.createdOn.split('T')[0] : '',
      }));
  },
  addOrUpdate: async (lead: Lead) => {
    const formData = new FormData();
    if (lead.id) formData.append('ID', lead.id.toString());
    formData.append('ClientName', lead.name || '');
    formData.append('ContactPerson', lead.contact || '');
    formData.append('Email', lead.email || '');
    formData.append('Phone', lead.phone || '');
    formData.append('ServiceRequested', lead.service || '');
    formData.append('Status', lead.status || '');
    formData.append('Date', lead.date || '');

    const res = await fetchWithAuth(`/User/AddOrUpdateLeads`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error('Failed to save lead');
    return res.text();
  },
  delete: async (id: number) => {
    const res = await fetchWithAuth(`/User/DeleteLeads?ID=${id}`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to delete lead');
    return res.text();
  },
};

export const renewalsApi = {
  getAll: async () => {
    const res = await fetchWithAuth(`/User/GetAllRenewals`);
    if (!res.ok) throw new Error('Failed to fetch renewals');
    const data = await res.json();
    return data
      .filter((item: any) => item.isActive !== false && item.isActive !== 'false')
      .map((item: any) => ({
        ...item,
        id: item.id,
        companyName: item.companyName || '',
        clientName: item.clientName || '',
        domainName: item.domainName || '',
        serviceType: item.serviceType || '',
        domainProvider: item.domainProvider || '',
        serverProvider: item.serverProvider || '',
        planName: item.planName || '',
        billingCycle: item.billingCycle || '',
        startDate: item.startDate || '',
        expiryDate: item.expiryDate || '',
        amount: item.amount || 0,
        amountPaid: item.amountPaid || 0,
        reminderStage: item.reminderStage || '',
        paymentStatus: item.paymentStatus || '',
        notes: item.notes || '',
      }));
  },
  addOrUpdate: async (renewal: Renewal) => {
    const formData = new FormData();
    if (renewal.id) formData.append('ID', renewal.id.toString());
    formData.append('CompanyName', renewal.companyName || '');
    formData.append('ClientName', renewal.clientName || '');
    formData.append('DomainName', renewal.domainName || '');
    formData.append('ServiceType', renewal.serviceType || '');
    formData.append('DomainProvider', renewal.domainProvider || '');
    formData.append('ServerProvider', renewal.serverProvider || '');
    formData.append('PlanName', renewal.planName || '');
    formData.append('BillingCycle', renewal.billingCycle || '');
    formData.append('StartDate', renewal.startDate || '');
    formData.append('ExpiryDate', renewal.expiryDate || '');
    formData.append('Amount', (renewal.amount || 0).toString());
    formData.append('AmountPaid', (renewal.amountPaid || 0).toString());
    formData.append('ReminderStage', renewal.reminderStage || '');
    formData.append('PaymentStatus', renewal.paymentStatus || '');
    formData.append('Notes', renewal.notes || '');
    formData.append('IsActive', 'true');

    const res = await fetchWithAuth(`/User/User/AddOrUpdateRenewal`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error('Failed to save renewal');
    return res.text();
  },
  delete: async (id: number) => {
    const res = await fetchWithAuth(`/User/DeleteRenewal?ID=${id}`, {
      method: 'GET',
    });
    if (!res.ok) throw new Error('Failed to delete renewal');
    return res.text();
  },
};

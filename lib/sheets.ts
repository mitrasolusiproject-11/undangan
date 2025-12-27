import { Guest } from '@/types/guest';

const SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;

export async function getGuests(): Promise<Guest[]> {
  if (!SCRIPT_URL) return [];

  try {
    const res = await fetch(SCRIPT_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch');
    
    // The Apps Script returns raw JSON array
    const data = await res.json();
    return data;
  } catch (error) {
    console.warn("Failed to fetch guests:", error);
    return [];
  }
}

export async function addGuestToSheet(guest: Omit<Guest, 'rowNumber'>) {
  if (!SCRIPT_URL) throw new Error('Apps Script URL not configured');

  const res = await fetch(SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify(guest),
  });

  const json = await res.json();
  if (json.status !== 'success') {
    throw new Error(json.message || 'Failed to add guest');
  }
}

export async function deleteGuestFromSheet(rowNumber: number) {
  if (!SCRIPT_URL) throw new Error('Apps Script URL not configured');

  const res = await fetch(SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'delete', rowNumber }),
  });

  const json = await res.json();
  if (json.status !== 'success') {
    throw new Error(json.message || 'Failed to delete guest');
  }
}

export async function updateGuestInSheet(rowNumber: number, guest: Omit<Guest, 'rowNumber' | 'addedAt'>) {
  if (!SCRIPT_URL) throw new Error('Apps Script URL not configured');

  const res = await fetch(SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({ 
      action: 'edit', 
      rowNumber,
      name: guest.name,
      category: guest.category,
      address: guest.address,
    }),
  });

  const json = await res.json();
  if (json.status !== 'success') {
    throw new Error(json.message || 'Failed to update guest');
  }
}

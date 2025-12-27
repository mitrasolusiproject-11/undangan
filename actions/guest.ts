'use server';

import { addGuestToSheet, getGuests, deleteGuestFromSheet, updateGuestInSheet } from '@/lib/sheets';
import { revalidatePath } from 'next/cache';

export type AddGuestState = {
  message?: string;
  error?: string;
  success?: boolean;
};

export async function addGuest(prevState: AddGuestState, formData: FormData): Promise<AddGuestState> {
  const name = formData.get('name') as string;
  const address = formData.get('address') as string;
  const category = formData.get('category') as string;

  if (!name || !address) {
    return { error: 'Name and Address are required.' };
  }

  try {
    const existingGuests = await getGuests();
    const isDuplicate = existingGuests.some(
      (guest) => guest.name.toLowerCase() === name.toLowerCase() && guest.address.toLowerCase() === address.toLowerCase()
    );

    if (isDuplicate) {
      return { error: 'This guest (Name + Address) already exists!' };
    }

    await addGuestToSheet({
      name,
      address,
      category: category || 'General',
      addedAt: new Date().toISOString(),
    });

    revalidatePath('/');
    return { success: true, message: 'Guest added successfully!' };
  } catch (error) {
    console.error('Failed to add guest:', error);
    return { error: 'Failed to add guest. Check server logs or sheet connection.' };
  }
}

export async function deleteGuest(rowNumber: number) {
  try {
    await deleteGuestFromSheet(rowNumber);
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete guest:', error);
    throw error;
  }
}

export async function updateGuest(rowNumber: number, name: string, category: string, address: string, originalName: string, originalAddress: string) {
  try {
    // Check for duplicates (excluding the current guest being edited)
    const existingGuests = await getGuests();
    const isDuplicate = existingGuests.some(
      (guest) => 
        guest.rowNumber !== rowNumber &&
        guest.name.toLowerCase() === name.toLowerCase() && 
        guest.address.toLowerCase() === address.toLowerCase()
    );

    if (isDuplicate) {
      throw new Error('This guest (Name + Address) already exists!');
    }

    await updateGuestInSheet(rowNumber, { name, category, address });
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Failed to update guest:', error);
    throw error;
  }
}

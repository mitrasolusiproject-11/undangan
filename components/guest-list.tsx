'use client';

import { Guest } from '@/types/guest';
import { Search, MapPin, Download, Trash2, Edit2, X } from 'lucide-react';
import { useState, useTransition } from 'react';
import { deleteGuest, updateGuest } from '@/actions/guest';

export function GuestList({ guests }: { guests: Guest[] }) {
  const [search, setSearch] = useState('');
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [editForm, setEditForm] = useState({ name: '', category: '', address: '' });

  const filteredGuests = guests.filter((guest) =>
    guest.name.toLowerCase().includes(search.toLowerCase()) ||
    guest.category.toLowerCase().includes(search.toLowerCase()) ||
    guest.address.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownload = () => {
    const headers = ['Name', 'Category', 'Address', 'Added At'];
    const csvContent = [
        headers.join(','),
        ...filteredGuests.map(g => 
            `"${g.name}","${g.category}","${g.address}","${g.addedAt}"`
        )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'guests_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = (rowNumber: number, name: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus "${name}"?`)) {
      return;
    }

    setDeletingId(rowNumber);
    startTransition(async () => {
      try {
        await deleteGuest(rowNumber);
      } catch (error) {
        alert('Gagal menghapus tamu. Silakan coba lagi.');
      } finally {
        setDeletingId(null);
      }
    });
  };

  const handleEditClick = (guest: Guest) => {
    setEditingGuest(guest);
    setEditForm({
      name: guest.name,
      category: guest.category,
      address: guest.address,
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGuest) return;

    startTransition(async () => {
      try {
        await updateGuest(
          editingGuest.rowNumber!,
          editForm.name,
          editForm.category,
          editForm.address,
          editingGuest.name,
          editingGuest.address
        );
        setEditingGuest(null);
      } catch (error: any) {
        alert(error.message || 'Gagal mengupdate tamu. Silakan coba lagi.');
      }
    });
  };

  return (
    <>
      <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl overflow-hidden flex flex-col h-full">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Daftar Tamu</h2>
            <p className="text-slate-500 text-sm">{filteredGuests.length} tamu ditemukan</p>
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search guests..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none text-sm w-full sm:w-64"
              />
            </div>
            
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 px-3 rounded-lg transition-all text-sm"
              title="Download Visible Data"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Address</th>
                <th className="px-6 py-4 text-right">Added</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredGuests.length > 0 ? (
                filteredGuests.map((guest, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{guest.name}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                        {guest.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <MapPin className="h-3.5 w-3.5" />
                        {guest.address}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-xs text-slate-400">
                      {new Date(guest.addedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEditClick(guest)}
                          disabled={isPending}
                          className="inline-flex items-center justify-center p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Edit guest"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(guest.rowNumber!, guest.name)}
                          disabled={isPending && deletingId === guest.rowNumber}
                          className="inline-flex items-center justify-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete guest"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Search className="h-8 w-8 text-slate-300 mb-2" />
                      <p>No guests found matching your search.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingGuest && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-800">Edit Guest</h3>
              <button
                onClick={() => setEditingGuest(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label htmlFor="edit-name" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Guest Name
                </label>
                <input
                  type="text"
                  id="edit-name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                />
              </div>

              <div>
                <label htmlFor="edit-category" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Category
                </label>
                <input
                  type="text"
                  id="edit-category"
                  value={editForm.category}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                />
              </div>

              <div>
                <label htmlFor="edit-address" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="edit-address"
                  value={editForm.address}
                  onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingGuest(null)}
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

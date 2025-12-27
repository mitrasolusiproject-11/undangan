'use client';

import { useFormStatus } from 'react-dom';
import { addGuest, AddGuestState } from '@/actions/guest';
import { useEffect, useRef, useActionState } from 'react';
import { Loader2, UserPlus, CheckCircle, AlertCircle } from 'lucide-react';

const initialState: AddGuestState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-95"
    >
      {pending ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Adding...
        </>
      ) : (
        <>
          <UserPlus className="h-5 w-5" />
          Add Guest
        </>
      )}
    </button>
  );
}

export function GuestForm() {
  const [state, formAction] = useActionState(addGuest, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">New Invitation</h2>
      <p className="text-slate-500 mb-6">Add a guest to your wedding list.</p>

      {state.error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{state.error}</p>
        </div>
      )}

      {state.success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3 text-green-700 animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{state.message}</p>
        </div>
      )}

      <form ref={formRef} action={formAction} className="space-y-5">
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-sm font-semibold text-slate-700">
            Guest Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="e.g. John Doe & Partner"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label htmlFor="category" className="block text-sm font-semibold text-slate-700">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              list="categories"
              placeholder="e.g. Family"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
            />
            <datalist id="categories">
              <option value="Family" />
              <option value="Friend" />
              <option value="Coworker" />
              <option value="VIP" />
            </datalist>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="address" className="block text-sm font-semibold text-slate-700">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              required
              placeholder="e.g. Jakarta"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
            />
          </div>
        </div>

        <div className="pt-2">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}

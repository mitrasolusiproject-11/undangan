import { GuestForm } from '@/components/guest-form';
import { GuestList } from '@/components/guest-list';
import { getGuests } from '@/lib/sheets';
import { Heart } from 'lucide-react';

export const dynamic = 'force-dynamic'; // Ensure we always fetch latest data

export default async function Home() {
  const guests = await getGuests();

  return (
    <main className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
      <header className="mb-10 text-center space-y-2">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Heart className="h-8 w-8 text-rose-500 fill-rose-500 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-heading">
            Wedding <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Invitations</span>
          </h1>
        </div>
        <p className="text-lg text-slate-600 font-medium">Manage your guest list with ease and style.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Section - Takes 4 columns */}
        <div className="lg:col-span-4 xl:col-span-4 lg:sticky lg:top-8">
            <GuestForm />
             
            {/* Quick Stats or Info could go here */}
            <div className="mt-6 bg-indigo-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <p className="opacity-80 text-sm font-medium mb-1">Total Guests</p>
                    <p className="text-4xl font-bold">{guests.length}</p>
                </div>
                <div className="absolute -bottom-4 -right-4 h-24 w-24 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute top-0 right-0 h-16 w-16 bg-white/5 rounded-full blur-xl"></div>
            </div>
        </div>

        {/* List Section - Takes 8 columns */}
        <div className="lg:col-span-8 xl:col-span-8 h-full min-h-[500px]">
          <GuestList guests={guests} />
        </div>
      </div>
    </main>
  );
}

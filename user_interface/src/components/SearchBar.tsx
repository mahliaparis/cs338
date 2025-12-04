import { useState } from 'react';
import { Search } from 'lucide-react';
import { OracleLogo } from './OracleLogo';

interface SearchBarProps {
  onSearch: (irId: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue.trim());
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-6">
          <OracleLogo className="w-20 h-20 drop-shadow-xl" />
        </div>
        <h2 className="text-transparent bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 bg-clip-text mb-3">
          Search the Electronic Health Record
        </h2>
        <p className="text-slate-600">Find patient data by entering their IR ID below</p>
      </div>
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur-xl"></div>
        <div className="relative">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Enter patient IR ID"
            className="w-full px-6 py-5 pr-16 border-2 border-teal-300/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-xl hover:shadow-2xl hover:shadow-teal-200/30 transition-all bg-white text-slate-900 placeholder:text-slate-400"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-gradient-to-br from-teal-500 via-cyan-500 to-emerald-500 text-white hover:shadow-lg hover:shadow-teal-400/50 hover:scale-105 transition-all"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
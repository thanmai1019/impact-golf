'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

// Define what a charity looks like based on our database
type Charity = {
  id: string;
  name: string;
  description: string;
  image_url: string;
};

export default function CharitiesPage() {
  const [charities, setCharities] = useState<Charity[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the charities from Supabase when the page loads
    const fetchCharities = async () => {
      const { data, error } = await supabase.from('charities').select('*');
      if (data) setCharities(data);
      setLoading(false);
    };
    fetchCharities();
  }, []);

  // Filter the charities based on what the user types in the search bar
  const filteredCharities = charities.filter(charity => 
    charity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    charity.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header & Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Our Charity Partners</h1>
            <p className="text-slate-600">Discover the causes your golf game is supporting.</p>
          </div>
          <div className="mt-4 md:mt-0 w-full md:w-72">
            <input 
              type="text" 
              placeholder="Search charities..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Charity Grid */}
        {loading ? (
          <p className="text-center text-slate-500">Loading charities...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {filteredCharities.map((charity) => (
              <div key={charity.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <img 
                  src={charity.image_url || 'https://via.placeholder.com/500x300?text=No+Image'} 
                  alt={charity.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2 text-slate-800">{charity.name}</h2>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">{charity.description}</p>
                  <button className="text-blue-600 font-semibold hover:text-blue-800">
                    Learn More &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredCharities.length === 0 && !loading && (
          <p className="text-center text-slate-500 mt-10">No charities found matching your search.</p>
        )}

      </div>
    </div>
  );
}
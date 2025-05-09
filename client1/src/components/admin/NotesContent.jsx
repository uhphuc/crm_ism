import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiTag, FiFilter, FiChevronDown, FiX } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { getAllNotes } from '../../api/admin';

const NotesContent = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [filter, setFilter] = useState('all'); // 'all', 'today', 'upcoming'
  const [userFilter, setUserFilter] = useState('all');
  const [showUserFilter, setShowUserFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setIsLoading(true);
        const response = await getAllNotes(filter);
        setNotes(response);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, [filter]);

  const getFormattedDate = (date) => {  
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  }

  // Get unique users from notes
  const uniqueUsers = [...new Set(
    notes.map(note => ({
      id: note.user.id,
      name: `${note.user.firstName} ${note.user.lastName}`
    }))
  )].reduce((unique, user) => {
    if (!unique.some(u => u.id === user.id)) {
      unique.push(user);
    }
    return unique;
  }, []);

  // Filter notes based on selected filters and search query
  const filteredNotes = notes.filter(note => {
    // Apply user filter
    if (userFilter !== 'all' && note.user.id !== userFilter) {
      return false;
    }
    
    // Apply search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        note.content.toLowerCase().includes(searchLower) ||
        note.customer.firstName.toLowerCase().includes(searchLower) ||
        note.customer.lastName.toLowerCase().includes(searchLower) ||
        note.deal.title.toLowerCase().includes(searchLower) ||
        `${note.user.firstName} ${note.user.lastName}`.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Notes</h2>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search notes..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Filter controls */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative">
          <button 
            onClick={() => setShowUserFilter(!showUserFilter)}
            className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <FiFilter /> 
            {userFilter === 'all' ? 'All Users' : 
              uniqueUsers.find(u => u.id === userFilter)?.name || 'User'}
            <FiChevronDown className={`transition-transform ${showUserFilter ? 'rotate-180' : ''}`} />
          </button>
          
          {showUserFilter && (
            <div className="absolute z-10 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200">
              <div className="py-1">
                <button
                  onClick={() => {
                    setUserFilter('all');
                    setShowUserFilter(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${userFilter === 'all' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  All Users
                </button>
                {uniqueUsers.map(user => (
                  <button
                    key={user.id}
                    onClick={() => {
                      setUserFilter(user.id);
                      setShowUserFilter(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${userFilter === user.id ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {user.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {userFilter !== 'all' && (
          <button 
            onClick={() => setUserFilter('all')}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
          >
            Clear filter
            <FiX size={14} />
          </button>
        )}
      </div>

      {/* Notes grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div key={note.id} className="bg-white rounded-lg shadow overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium text-gray-900">
                    <FiTag className="inline-block mr-2 text-indigo-600" />
                    <span className="text-gray-500">
                      {note.user.firstName + ' ' + note.user.lastName}
                    </span>
                  </h3>
                </div>
                <p>
                  <span className='italic'>Make a note for </span>
                  <span className="font-semibold text-gray-800">{note.customer.firstName + ' ' + note.customer.lastName}</span>
                </p>
                <p>
                  <span className='italic'>Deal Name: </span>
                  <span className="font-semibold text-gray-800">{note.deal.title}</span>
                </p>
                
                {/* Note container */}
                <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-600">{note.content}</p>
                </div>
                
                <p className="text-sm text-right text-gray-500">
                  <span className='font-semibold'>Created on: </span>
                  {getFormattedDate(note.createdAt)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-gray-500">
            No notes found matching your filters
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesContent;
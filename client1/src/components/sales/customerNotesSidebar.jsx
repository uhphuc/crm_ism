import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { addDealNote, getDealNotes } from '../../api/sales';

const DealNotesSidebar = ({ selectedDeal, setShowDealNotes, setSelectedDeal }) => {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      if (!selectedDeal?.id) return;
      setLoading(true);
      try {
        const dealNotes = await getDealNotes(selectedDeal.id);
        setNotes(dealNotes);
      } catch (error) {
        console.error('Error fetching deal notes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [selectedDeal]);

  const handleAddNote = async () => {
    if (!newNote.trim() || !selectedDeal?.id) return;
    setLoading(true);
    try {
      const addedNote = await addDealNote(selectedDeal.id, {
        content: newNote,
        userId: selectedDeal.userId,
        customerId: selectedDeal.customerId,
      });
      setNotes([...notes, addedNote]);
      setNewNote('');
    } catch (error) {
      console.error('Error adding note:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg z-40">
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">
              Deal: {selectedDeal.title}
            </h3>
            <p className="text-sm text-gray-500">
              Customer: {selectedDeal.customer?.firstName} {selectedDeal.customer?.lastName}
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedDeal(null);
              setShowDealNotes(false);
            }}
            className="text-gray-400 hover:text-gray-500"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Deal Notes</h4>
          {loading && notes.length === 0 ? (
            <div>Loading notes...</div>
          ) : (
            <div className="space-y-4">
              {notes.map((note, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm">{note.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(note.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="flex">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
              placeholder="Add a note about this deal..."
              disabled={loading}
              className={`flex-1 border border-gray-300 rounded-l-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                loading ? 'bg-gray-100' : ''
              }`}
            />
            <button
              onClick={handleAddNote}
              disabled={loading || !newNote.trim()}
              className={`bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 ${
                loading || !newNote.trim() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealNotesSidebar;
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiTag } from 'react-icons/fi';

const NotesContent = () => {
  const notes = [
    { id: 1, title: 'Client preferences', content: 'John prefers email communication and is interested in our premium package.', tags: ['preferences', 'communication'], date: 'May 15, 2023' },
    { id: 2, title: 'Meeting notes', content: 'Discussed project timeline and deliverables. Sarah will send requirements by Friday.', tags: ['meeting', 'timeline'], date: 'May 12, 2023' },
    { id: 3, title: 'Important details', content: 'Michael mentioned budget is flexible but needs delivery by end of quarter.', tags: ['budget', 'deadline'], date: 'May 8, 2023' },
    { id: 4, title: 'Follow up', content: 'Emily asked about integration with their existing CRM system.', tags: ['integration', 'followup'], date: 'May 5, 2023' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Notes</h2>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            <FiPlus /> Add Note
          </button>
          <div className="relative flex-1 md:w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search notes..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div key={note.id} className="bg-white rounded-lg shadow overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium text-gray-900">{note.title}</h3>
                <div className="flex gap-2">
                  <button className="text-gray-500 hover:text-indigo-600">
                    <FiEdit2 size={18} />
                  </button>
                  <button className="text-gray-500 hover:text-red-600">
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{note.content}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {note.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    <FiTag className="mr-1" size={10} /> {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-500">{note.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesContent;
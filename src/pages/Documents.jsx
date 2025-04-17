import React, { useState, useEffect } from 'react';
import { Search, FileText, Download, Filter, Upload } from 'lucide-react';
import axios from 'axios';

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const categories = ['All', 'Lab Results', 'Medical Reports', 'Imaging', 'Prescriptions', 'Insurance'];

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchDocuments = async () => {
      try {
        // const response = await axios.get('/api/documents');
        // setDocuments(response.data);
        // setFilteredDocuments(response.data);
        
        // Mock data for prototype
        const mockDocuments = [
          { id: 1, title: 'Blood Test Results', date: '2025-04-10', category: 'Lab Results', fileSize: '1.2 MB', fileType: 'PDF' },
          { id: 2, title: 'Cardiology Report', date: '2025-04-05', category: 'Medical Reports', fileSize: '0.8 MB', fileType: 'PDF' },
          { id: 3, title: 'Chest X-Ray', date: '2025-03-20', category: 'Imaging', fileSize: '5.4 MB', fileType: 'DICOM' },
          { id: 4, title: 'Prescription - Antibiotics', date: '2025-03-15', category: 'Prescriptions', fileSize: '0.3 MB', fileType: 'PDF' },
          { id: 5, title: 'Insurance Claim Form', date: '2025-03-01', category: 'Insurance', fileSize: '0.5 MB', fileType: 'PDF' },
          { id: 6, title: 'Allergy Test Results', date: '2025-02-25', category: 'Lab Results', fileSize: '0.7 MB', fileType: 'PDF' },
          { id: 7, title: 'MRI Scan Report', date: '2025-02-10', category: 'Imaging', fileSize: '12.1 MB', fileType: 'DICOM' },
          { id: 8, title: 'Vaccination Record', date: '2025-01-20', category: 'Medical Reports', fileSize: '0.4 MB', fileType: 'PDF' }
        ];
        
        setDocuments(mockDocuments);
        setFilteredDocuments(mockDocuments);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);

  useEffect(() => {
    let results = documents;
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'All') {
      results = results.filter(doc => doc.category === selectedCategory);
    }
    
    setFilteredDocuments(results);
  }, [searchTerm, selectedCategory, documents]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    
    setIsUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + Math.floor(Math.random() * 10);
      });
    }, 300);
    setTimeout(() => {
        clearInterval(interval);
        setUploadProgress(100);
        
        const newDocument = {
          id: documents.length + 1,
          title: selectedFile.name.replace(/\.[^/.]+$/, ""),
          date: new Date().toISOString().split('T')[0],
          category: 'Medical Reports', // Default category
          fileSize: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
          fileType: selectedFile.name.split('.').pop().toUpperCase()
        };
        
        setDocuments(prev => [...prev, newDocument]);
        setFilteredDocuments(prev => [...prev, newDocument]);
        
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
          setSelectedFile(null);
          document.getElementById('file-upload').value = '';
        }, 1000);
      }, 3000);
    };
  
    const handleDownload = (id) => {
      // In a real app, this would be an API call to download the file
      console.log(`Downloading document with id: ${id}`);
      alert('Download started. In a real application, the file would be downloaded now.');
    };
  
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Medical Documents</h1>
          <p className="text-gray-600 mt-1">Access and manage all your medical records in one place</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Upload New Document</h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
              <button
                type="submit"
                disabled={!selectedFile || isUploading}
                className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white ${
                  !selectedFile || isUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </button>
            </div>
            
            {isUploading && (
              <div className="w-full">
                <div className="bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">Uploading: {uploadProgress}%</p>
              </div>
            )}
          </form>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="relative flex-grow max-w-md">
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <label htmlFor="category-filter" className="text-sm font-medium text-gray-700">Filter:</label>
                <select
                  id="category-filter"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((document) => (
                    <tr key={document.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-gray-400 mr-3" />
                          <span className="font-medium text-gray-900">{document.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {document.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {document.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {document.fileType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {document.fileSize}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleDownload(document.id)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                      No documents found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
};
  
  export default Documents;
  
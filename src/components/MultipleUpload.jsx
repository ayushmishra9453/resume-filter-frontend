import React, {useState} from 'react'
import Spinner from './Spinner';

function MultipleUpload() {

    const [files, setFiles] = useState([]);
  const [msg, setMsg] = useState('');

  const [loading,setLoading]=useState(false)
    
  const handleSubmit=async(e)=>{
    e.preventDefault();

    if (files.length === 0) {
      setMsg('Select at least one file');
      return;
    }

    const fd= new FormData();

    for(let i=0;i<files.length;i++){
        fd.append('files',files[i]);
    }
     setLoading(true)
    try {
      const res = await fetch('https://resume-filter-backend-haan.onrender.com/api/resumes/uploadMultipleResume', {
        method: 'POST',
        body: fd,
      });
      
  const data = await res.json();

      if (data.success) {
        setMsg(`Uploaded ${files.length} files successfully!`);
        setFiles([]);
      } else {
        setMsg('Upload failed: ' + (data.error || 'unknown'));
      }
    }
    catch (error) {
      setMsg('Upload Error: ' + error.message);
    }
    setLoading(false)
};
  return (
      <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded mt-6">
      <h2 className="font-medium mb-2">Upload Multiple Resumes</h2>
      
      <div className="mb-2">
        <input 
          type="file" 
          multiple 
          onChange={(e) => setFiles(Array.from(e.target.files))} 
        />
      </div>

      <button 
        className="bg-green-600 text-white px-4 py-2 rounded  hover:bg-blue-800" 
        type="submit"
      >
        Upload All
      </button>

      {loading ? <Spinner/>:(msg && <div className="mt-2 text-sm">{msg}</div>)}
    </form>
  )
}

export default MultipleUpload

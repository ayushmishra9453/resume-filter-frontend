// import React, {useState} from 'react'
// import Spinner from './Spinner';

// function MultipleUpload() {

//     const [files, setFiles] = useState([]);
//   const [msg, setMsg] = useState('');
//   const [fileInputs, setFileInputs] = useState([{file: null} ]);

//   const [loading,setLoading]=useState(false)
    
//   const handleSubmit=async(e)=>{
//     e.preventDefault();

//     if (files.length === 0) {
//       setMsg('Select at least one file');
//       return;
//     }

//     const fd= new FormData();

//     for(let i=0;i<files.length;i++){
//         fd.append('files',files[i]);
//     }
//      setLoading(true)
//     try {
//       const res = await fetch('https://resume-filter-backend-haan.onrender.com/api/resumes/uploadMultipleResume', {
//         method: 'POST',
//         body: fd,
//       });
      
//   const data = await res.json();

//       if (data.success) {
//         setMsg(`Uploaded ${files.length} files successfully!`);
//         setFiles([]);
//       } else {
//         setMsg('Upload failed: ' + (data.error || 'unknown'));
//       }
//     }
//     catch (error) {
//       setMsg('Upload Error: ' + error.message);
//     }
//     setLoading(false)
// };

// const clickHandler=()=>{
//   setShowInput(true)
// }
//   return (
//       <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded mt-6">
//       <h2 className="font-medium mb-2">Upload Resumes</h2>
      
//       <div className="mb-2">
//         <button  className='border-zinc-800 border-2 rounded p-1' onClick={clickHandler}>Add file</button>
       
//        {
//         showInput && <input 
//           type="file" 
//           multiple 
//           onChange={(e) => setFiles(Array.from(e.target.files))} 
//           className='mx-3 p-2'
//         />
//        }


//         {/* <input 
//           type="file" 
//           multiple 
//           onChange={(e) => setFiles(Array.from(e.target.files))} 
//           className='mr-3'
//         /> */}

//          {loading ? <Spinner/>:(msg && <div className="mt-2 text-sm">{msg}</div>)}
//       </div>

//       <button 
//         className="bg-green-600 text-white px-4 py-2 rounded  hover:bg-blue-800" 
//         type="submit"
//       >
//         Upload All
//       </button>

     
//     </form>
//   )
// }

// export default MultipleUpload


import React, { useState } from 'react';
import Spinner from './Spinner';

function MultipleUpload() {
  const [fileInputs, setFileInputs] = useState([null]); // each slot = one file
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // handle file change
  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    const newInputs = [...fileInputs];
    newInputs[index] = file;
    setFileInputs(newInputs);
  };

  // add new input
  const addFileInput = (e) => {
    e.preventDefault();
    setFileInputs((prev) => [...prev, null]);
  };

  // submit all
  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedFiles = fileInputs.filter(Boolean);
    if (selectedFiles.length === 0) {
      setMsg('Select at least one file');
      return;
    }

    const fd = new FormData();
    selectedFiles.forEach((file) => fd.append('files', file));

    setLoading(true);
    try {
      const res = await fetch(
        'https://resume-filter-backend-haan.onrender.com/api/resumes/uploadMultipleResume',
        {
          method: 'POST',
          body: fd,
        }
      );

      const data = await res.json();
      if (data.success) {
        setMsg(`Uploaded ${selectedFiles.length} files successfully!`);
        setFileInputs([null]); // reset inputs
      } else {
        setMsg('Upload failed: ' + (data.error || 'unknown'));
      }
    } catch (error) {
      setMsg('Upload Error: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white shadow rounded mt-6"
    >
      <h2 className="font-medium mb-2">Upload Resumes</h2>

      {fileInputs.map((file, index) => (
        <div key={index} className="flex items-center mb-2 gap-2">
          <input
            type="file"
            onChange={(e) => handleFileChange(index, e)}
            className="p-1 rounded"
          />
        </div>
      ))}
        <div className='flex gap-4'>
      <button
        onClick={addFileInput}
        className="border-zinc-800 border-2 rounded px-2 py-1 mr-3"
      >
        Add file
      </button>

      {loading ? (
        <Spinner />
      ) : (
        msg && <div className="mt-2 text-sm">{msg}</div>
      )}
    </div>
      <div className="mt-4">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-800"
          type="submit"
        >
          Upload
        </button>
      </div>
    </form>
  );
}

export default MultipleUpload;

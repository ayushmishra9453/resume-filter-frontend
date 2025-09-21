import React, { useState } from 'react'

function UploadForm() {
    const [file, setFile]=useState(null);
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [skills, setSkills] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!file){
        setMsg('Select a File');
        return ;
    }

    const fd= new FormData();

    fd.append('file',file)
    fd.append('name',name)
    fd.append('email',email)
    fd.append('skills',skills)

    try{
        const res=await fetch('https://resume-filter-backend-haan.onrender.com/api/resumes/upload',{
            method:'POST',
            body:fd
        });

        const data=await res.json();
        if(data.success){
            setMsg('Uploaded! Id: '+ data.id)
            setFile(null);
            setName('');
            setEmail('');
            setSkills('');
        }
        else setMsg('Upload failed: ' + (data.error || 'unknown'));
    }
    catch(error){
     setMsg('Upload Error'+ error.message)
    }
  }
  return (
    <form onSubmit={handleSubmit} className='p-4 bg-white shadow rounded'>
        <h2 className='font-medium mb-2'>Upload Resume</h2>
         <div className='mb-2'>
            <input type="file" onChange={(e)=>{setFile(e.target.files[0])}} />
         </div>

         <input type="text" className='border p-2 mb-2 w-full' placeholder='Name' value={name} onChange={e=>setName(e.target.value)} />
         <input type="text" className='border p-2 mb-2 w-full' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} />
         <input type="text" className='border p-2 mb-2 w-full' placeholder='Skills' value={skills} onChange={e=>setSkills(e.target.value)} />
         <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Upload</button>

         {msg && <div className='mt-2 text-sm'>{msg}</div>}
    </form>
  )
}

export default UploadForm

import React, { useState } from 'react'
import ResultItem from './ResultItem';
function escapeHtml(text){
    return (text || '').replace(/[&<>"'`]/g, s=>({
        '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','`':'&#96;'
    }[s]));
}

function highlightText(text,keywords){
    const esc=escapeHtml(text)
    if(!keywords || keywords.length===0) return esc;
    const pattern=keywords.map(k=>k.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,'\\$&')).join('|')
    const re= new RegExp(`(${pattern})`,'gi');
    return esc.replace(re, '<mark>$1</mark>');
};

function Search() {
  const [q,setQ]=useState('');
  const [results,setResults]=useState([]);
  const [loading,setLoading]=useState(false);

  async function doSearch(e){
    e?.preventDefault();
    if(!q.trim()) return;

    setLoading(true)
    try{
      const res=await fetch(`https://resume-filter-backend-haan.onrender.com/api/resumes/search?q=${encodeURIComponent(q)}`)
      const data = await res.json();
      setResults(data.results || []);
    }
    catch(err){
      alert('Search error: ' + err.message);
    } finally { setLoading(false); }
  }

  const keywords= q.split(/,|\s+/).map(s=>s.trim()).filter(Boolean)
  return (
    <div className="p-4 bg-white shadow rounded">
      <form onSubmit={doSearch} className="mb-3 flex flex-col md:flex-row">
        <input className="border p-2 w-full md:w-3/4" placeholder="enter keywords (comma or space separated)" value={q} onChange={e=>setQ(e.target.value)} />
        <button className="md:ml-2 my-2 md:my-0 bg-green-800 text-white px-4 py-2 rounded hover:bg-blue-600" disabled={loading}>{loading ? 'Searching...' : 'Search Engine'}</button>
      </form>

      <div>
        {results.length === 0 && <div className="text-sm text-gray-500">No results yet.</div>}
        {results.map(r => (
          <ResultItem key={r.id} result={r} highlightFn={(text)=>highlightText(text, keywords)} />
        ))}
      </div>
    </div>
  )
}

export default Search

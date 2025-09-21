import React from 'react'

function ResultItem({ result, highlightFn }) {
  return (
    <div className="border-b py-3">
      <div className='flex justify-between'>
        <div>
            <div className='font-semibold'>
            {result.name || '—'}
            </div>
            <div className="text-sm text-gray-600">
            {result.email || ''}
            </div>
        </div>
        <div className="text-sm text-gray-500">score: {result.score}</div>
      </div>
      <div className="mt-2 text-sm">
        <div><strong>Skills:</strong> {result.skills?.join(', ')}</div>
        <div className="mt-1" dangerouslySetInnerHTML={{ __html: highlightFn(result.snippet || '') }} />
      </div>
    </div>
  )
}

export default ResultItem

import React from 'react'

function GroupCard({ gName, gId, myIdx, selectedIdx }) {
	let highlight = myIdx == selectedIdx
	return (
		<div
			className={`flex p-2 items-center space-x-4 border-b-2 transition-all duration-150 ${
				highlight ? ' bg-slate-400 text-black' : ''
			}`}
		>
			<span className=' text-sm'>{gId}</span>
			<span className=' text-lg'>{gName}</span>
			{highlight && <span className=' justify-self-end'>{'>>'}</span>}
		</div>
	)
}

export default GroupCard

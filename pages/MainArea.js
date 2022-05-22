import GroupCard from '../components/GroupCard'
import { ethers } from 'ethers'
import { contractAddr, contractABI } from '../contractDetails'
import { useEffect, useState } from 'react'
import { itMatchesOne } from 'daisyui/src/lib/postcss-prefixer/utils'
function MainArea() {
	const [groups, setGroups] = useState([])
	const [isModal, setIsModal] = useState(false)
	const [selectedGroup, setSelectedGroup] = useState(-1)
	const [isLoading, setIsLoading] = useState(false)
	const [expenses, setExpenses] = useState([])

	//inputs states
	const [newGName, setNewGName] = useState(false)
	const [newGParticipants, setNewGParticipants] = useState(false)

	async function getGroups() {
		try {
			const { ethereum } = window
			const provider = new ethers.providers.Web3Provider(ethereum)
			const signer = provider.getSigner()
			const contract = new ethers.Contract(
				contractAddr,
				contractABI,
				signer
			)
			const myGroups = await contract.getGroups(signer.getAddress())
			// console.log(myGroups)
			setGroups(myGroups)
		} catch (err) {
			// setLoading(false)
			console.log(err)
		}
	}

	async function handleNewGroupForm(e) {
		e.preventDefault()
		setIsLoading(true)
		try {
			const { ethereum } = window
			const provider = new ethers.providers.Web3Provider(ethereum)
			const signer = provider.getSigner()
			const contract = new ethers.Contract(
				contractAddr,
				contractABI,
				signer
			)
			let participants = newGParticipants.split(',')
			for (let i = 0; i < participants.length; i++) {
				participants[i] = participants[i].trim()
			}
			console.log(participants)
			let txn1 = await contract.createGroup(newGName, participants)
			await txn1.wait()
			if (txn1) {
				getGroups()
			}
			setIsLoading(false)
			setIsModal(false)
		} catch (err) {
			setIsLoading(false)
			console.log(err)
		}
	}

	async function handleNewExpenseForm(e) {
		try {
			const { ethereum } = window
			const provider = new ethers.providers.Web3Provider(ethereum)
			const signer = provider.getSigner()
			const contract = new ethers.Contract(
				contractAddr,
				contractABI,
				signer
			)

			const expenseName = e.target[0].value
			const payer = e.target[1].value
			const tot_amount = e.target[2].value
			let participants = []
			// participants.push(groups[selectedGroup].owner)
			groups[selectedGroup].participants.map((item, i) =>
				participants.push(item)
			)
			participants.push(groups[selectedGroup].owner)
			console.log(participants)

			let txn1 = await contract.addExpense(
				groups[selectedGroup].gId,
				// ethers.utils.getAddress(payer.toLowerCase()),
				expenseName,
				payer.toLowerCase(),
				ethers.utils.parseEther(tot_amount),
				participants
			)
			// console.log(e.target, payer)
			await txn1.wait()
			if (txn1) {
				getGroupExpenses()
			}
		} catch (err) {
			// setIsLoading(false)
			console.log(err)
		}
	}

	useEffect(() => {
		//get groups on start
		getGroups()
	}, [])

	async function getGroupExpenses() {
		try {
			const { ethereum } = window
			const provider = new ethers.providers.Web3Provider(ethereum)
			const signer = provider.getSigner()
			const contract = new ethers.Contract(
				contractAddr,
				contractABI,
				signer
			)
			const groupExpenses = await contract.expenses(
				parseInt(groups[selectedGroup].gId._hex)
			)
			console.log(groupExpenses)
			setExpenses([groupExpenses])
		} catch (err) {
			// setLoading(false)
			console.log(err)
		}
	}

	async function settle(eid) {
		try {
			const { ethereum } = window
			const provider = new ethers.providers.Web3Provider(ethereum)
			const signer = provider.getSigner()
			const contract = new ethers.Contract(
				contractAddr,
				contractABI,
				signer
			)
			let amtInSting = expenses[0].totalExpense.toString()
			console.log(typeof amtInSting)
			let tx1 = await contract.settleUp(1, {
				value: amtInSting,
			})
			await tx1.wait()
			if (tx1) {
				getGroupExpenses()
			}
		} catch (err) {
			// setLoading(false)
			console.log(err)
		}
	}

	useEffect(() => {
		console.log(selectedGroup)
		if (selectedGroup != -1) {
			getGroupExpenses()
		}
		// settle()
	}, [selectedGroup])

	return (
		<>
			{/* modal  */}
			{isModal && (
				<div
					className='h-[100vh] w-[100vw] absolute bg-blak z-10 backdrop-blur-sm'
					onClick={() => setIsModal(false)}
				>
					<div
						className=' bg-slate-300 w-[50%] min-h-[40%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black rounded-xl shadow-lg p-10'
						onClick={(e) => e.stopPropagation()}
					>
						{/* add group form */}
						<form action='submit' className=' space-y-3'>
							<span className='mr-4'>Group Name</span>
							<input
								type='text'
								placeholder='GName'
								className='input w-full max-w-xs input-sm text-white'
								onChange={(e) => setNewGName(e.target.value)}
							></input>
							<br />
							<span className='mr-6'>Participants</span>
							<input
								type='text'
								placeholder='addresses'
								className='input w-full max-w-xs input-sm text-white'
								onChange={(e) =>
									setNewGParticipants(e.target.value)
								}
							></input>
							<br />
							<br />
							{!isLoading && (
								<div className='flex justify-evenly'>
									{/* <button
										className='btn btn-error btn-sm'
										onClick={(e) => {
											e.preventDefault()
											setIsModal(false)
										}}
									>
										Cancel
									</button> */}

									<button
										className='btn btn-success btn-sm'
										type='submit'
										onClick={(e) => {
											// e.preventDefault()
											handleNewGroupForm(e)
										}}
									>
										Create
									</button>
								</div>
							)}
							{isLoading && (
								<div className='btn loading left-1/2 absolute -translate-x-1/2'>
									Please Wait
								</div>
							)}
						</form>
					</div>
				</div>
			)}

			<div className='flex p-5 h-[100vh]'>
				<div className='w-[30%] border-2 rounded-lg space-y-2 flex flex-col'>
					<div className=' text-xl font-bold p-2 bg-white text-black rounded-t-md translate-x-0'>
						My groups
					</div>
					<div className=' space-y-2 flex-grow overflow-y-scroll scrollbar-hide'>
						{groups.map((item, i) => (
							<div
								className=' cursor-pointer '
								onClick={() => setSelectedGroup(i)}
								key={i}
							>
								<GroupCard
									gId={parseInt(item.gId._hex)}
									gName={item.groupName}
									myIdx={i}
									selectedIdx={selectedGroup}
								/>
							</div>
						))}
					</div>
					<div className='flex justify-center pb-2'>
						<button
							className='btn btn-outline'
							onClick={() => setIsModal(true)}
						>
							+ Add Group
						</button>
					</div>
				</div>
				<div className='divider divider-horizontal'></div>
				<div className='border-2 w-[70%] rounded-lg flex'>
					<div className=' text-xl flex-grow px-2 pt-3 flex flex-col'>
						<div className='px-2'>Expenses:</div>
						<div className='h-max flex-grow border-2 overflow-y-scroll scrollbar-hide'>
							<div className=' flex-col items-center flex  space-y-6'>
								{expenses.map((item, i) => (
									<>
										<div className='card w-[70%] bg-accent text-primary-content'>
											<div className='card-body'>
												<h2 className='card-title'>
													{item.expenseName}
												</h2>
												<p>
													To pay:{' '}
													{parseInt(
														item.totalExpense._hex
													) /
														((groups[selectedGroup]
															.participants
															.length +
															1) *
															10 ** 18)}{' '}
													ETH
												</p>
												<div className='card-actions justify-end'>
													<button
														className={`btn btn-sm ${
															item.status == 2
																? ' btn-disabled'
																: ''
														}`}
														onClick={() =>
															settle(
																parseInt(
																	item.eId
																		._hex
																)
															)
														}
													>
														{item.status == 2
															? 'Settled'
															: 'Settle'}
													</button>
												</div>
											</div>
										</div>
									</>
								))}
							</div>
						</div>
						<div className='my-2'>
							<form
								action='submit'
								onSubmit={(e) => {
									e.preventDefault()
									handleNewExpenseForm(e)
								}}
								className=' grid grid-cols-2 gap-2'
							>
								<input
									type='text'
									placeholder='Expense Name'
									className='input input-bordered input-sm max-w-xs'
									required
								/>
								<input
									type='text'
									placeholder='Payer(to)'
									className='input input-bordered input-sm max-w-xs'
									required
								/>

								<input
									type='number'
									placeholder='Amount in ETH'
									className='input input-bordered input-sm max-w-xs'
									step={0.000001}
									required
								/>

								<button
									type='submit'
									className='btn btn-info btn-sm'
								>
									Create Expense
								</button>
							</form>
						</div>
					</div>
					<div className='divider lg:divider-horizontal'></div>
					{/* participants  */}
					<div className='max-w-[30%] text-xl overflow-y-hidden'>
						Other Participants
						{groups[selectedGroup] &&
							groups[selectedGroup].participants.map(
								(item, i) => (
									<>
										<div className='divider my-0'></div>

										<div
											key={i}
											className=' text-sm break-words'
											onClick={() => {}}
										>
											{item}
										</div>
									</>
								)
							)}
					</div>
				</div>
			</div>
		</>
	)
}

export default MainArea

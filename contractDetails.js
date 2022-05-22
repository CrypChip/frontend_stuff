// export const contractAddr = '0xEDdE72B969C87a2a513982da08E61De089B944f5'
export const contractAddr = '0x03cF61e08f52912174b8c9025C098b42BcF233E9'
// export const contractABI = [
// 	{
// 		inputs: [
// 			{
// 				internalType: 'uint256',
// 				name: '_gId',
// 				type: 'uint256',
// 			},
// 			{
// 				internalType: 'address',
// 				name: '_payer',
// 				type: 'address',
// 			},
// 			{
// 				internalType: 'uint256',
// 				name: '_totalExpense',
// 				type: 'uint256',
// 			},
// 			{
// 				internalType: 'address[]',
// 				name: '_participants',
// 				type: 'address[]',
// 			},
// 		],
// 		name: 'addExpense',
// 		outputs: [
// 			{
// 				internalType: 'uint256',
// 				name: '',
// 				type: 'uint256',
// 			},
// 		],
// 		stateMutability: 'nonpayable',
// 		type: 'function',
// 	},
// 	{
// 		inputs: [
// 			{
// 				internalType: 'address[]',
// 				name: 'participants',
// 				type: 'address[]',
// 			},
// 		],
// 		name: 'createGroup',
// 		outputs: [
// 			{
// 				internalType: 'bool',
// 				name: '',
// 				type: 'bool',
// 			},
// 		],
// 		stateMutability: 'nonpayable',
// 		type: 'function',
// 	},
// 	{
// 		inputs: [
// 			{
// 				internalType: 'uint256',
// 				name: '',
// 				type: 'uint256',
// 			},
// 		],
// 		name: 'expenses',
// 		outputs: [
// 			{
// 				internalType: 'uint256',
// 				name: 'gId',
// 				type: 'uint256',
// 			},
// 			{
// 				internalType: 'uint256',
// 				name: 'eId',
// 				type: 'uint256',
// 			},
// 			{
// 				internalType: 'address',
// 				name: 'payer',
// 				type: 'address',
// 			},
// 			{
// 				internalType: 'address',
// 				name: 'creator',
// 				type: 'address',
// 			},
// 			{
// 				internalType: 'uint256',
// 				name: 'totalExpense',
// 				type: 'uint256',
// 			},
// 			{
// 				internalType: 'enum CrypChip.ExpenseStatus',
// 				name: 'status',
// 				type: 'uint8',
// 			},
// 		],
// 		stateMutability: 'view',
// 		type: 'function',
// 	},
// 	{
// 		inputs: [
// 			{
// 				internalType: 'uint256',
// 				name: 'groupId',
// 				type: 'uint256',
// 			},
// 		],
// 		name: 'getExpensesFromGroup',
// 		outputs: [
// 			{
// 				internalType: 'uint256[]',
// 				name: '',
// 				type: 'uint256[]',
// 			},
// 		],
// 		stateMutability: 'view',
// 		type: 'function',
// 	},
// 	{
// 		inputs: [
// 			{
// 				internalType: 'address',
// 				name: 'user',
// 				type: 'address',
// 			},
// 		],
// 		name: 'getGroups',
// 		outputs: [
// 			{
// 				components: [
// 					{
// 						internalType: 'uint256',
// 						name: 'gId',
// 						type: 'uint256',
// 					},
// 					{
// 						internalType: 'address',
// 						name: 'owner',
// 						type: 'address',
// 					},
// 					{
// 						internalType: 'address[]',
// 						name: 'participants',
// 						type: 'address[]',
// 					},
// 				],
// 				internalType: 'struct CrypChip.ExpenseGroup[]',
// 				name: '',
// 				type: 'tuple[]',
// 			},
// 		],
// 		stateMutability: 'view',
// 		type: 'function',
// 	},
// 	{
// 		inputs: [
// 			{
// 				internalType: 'uint256',
// 				name: 'expenseId',
// 				type: 'uint256',
// 			},
// 		],
// 		name: 'settleUp',
// 		outputs: [
// 			{
// 				internalType: 'enum CrypChip.ExpenseStatus',
// 				name: 'status',
// 				type: 'uint8',
// 			},
// 		],
// 		stateMutability: 'payable',
// 		type: 'function',
// 	},
// ]
export const contractABI = [
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_gId',
				type: 'uint256',
			},
			{
				internalType: 'string',
				name: '_expenseName',
				type: 'string',
			},
			{
				internalType: 'address',
				name: '_payer',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: '_totalExpense',
				type: 'uint256',
			},
			{
				internalType: 'address[]',
				name: '_participants',
				type: 'address[]',
			},
		],
		name: 'addExpense',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'string',
				name: '_groupName',
				type: 'string',
			},
			{
				internalType: 'address[]',
				name: 'participants',
				type: 'address[]',
			},
		],
		name: 'createGroup',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'expenseId',
				type: 'uint256',
			},
		],
		name: 'settleUp',
		outputs: [
			{
				internalType: 'enum CrypChip.ExpenseStatus',
				name: 'status',
				type: 'uint8',
			},
		],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		name: 'expenses',
		outputs: [
			{
				internalType: 'uint256',
				name: 'gId',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'eId',
				type: 'uint256',
			},
			{
				internalType: 'string',
				name: 'expenseName',
				type: 'string',
			},
			{
				internalType: 'address',
				name: 'payer',
				type: 'address',
			},
			{
				internalType: 'address',
				name: 'creator',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'totalExpense',
				type: 'uint256',
			},
			{
				internalType: 'enum CrypChip.ExpenseStatus',
				name: 'status',
				type: 'uint8',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'groupId',
				type: 'uint256',
			},
		],
		name: 'getExpensesFromGroup',
		outputs: [
			{
				internalType: 'uint256[]',
				name: '',
				type: 'uint256[]',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'user',
				type: 'address',
			},
		],
		name: 'getGroups',
		outputs: [
			{
				components: [
					{
						internalType: 'uint256',
						name: 'gId',
						type: 'uint256',
					},
					{
						internalType: 'string',
						name: 'groupName',
						type: 'string',
					},
					{
						internalType: 'address',
						name: 'owner',
						type: 'address',
					},
					{
						internalType: 'address[]',
						name: 'participants',
						type: 'address[]',
					},
				],
				internalType: 'struct CrypChip.ExpenseGroup[]',
				name: '',
				type: 'tuple[]',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
]

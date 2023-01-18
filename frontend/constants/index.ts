export const contractAddress = "0x724Bc69E9BaDEB6aF773901472aAd8815FEd605f"

export const permissions = {
	"Create": 1,
	"Update": 2,
	"Create or Update":3,
	"Delete":4,
	"Create or Delete": 5,
	"Delete or Update": 6,
	"Create Update or Delete": 7
};


export const reversePermissions = {
	"1": "Create",
	"2": "Update",
	"3": "Create or Update",
	"4": "Delete",
	"5": "Create or Delete",
	"6": "Delete or Update",
	"7": "Create Update or Delete"
};


export const ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_sender",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "_receiver",
				"type": "address[]"
			}
		],
		"name": "deleteFlowMultiple",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_receiver",
				"type": "address"
			}
		],
		"name": "deleteFlowSingle",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_sender",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "_receiver",
				"type": "address[]"
			},
			{
				"internalType": "int96",
				"name": "_flowRate",
				"type": "int96"
			}
		],
		"name": "startFlowMultiple",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_receiver",
				"type": "address"
			},
			{
				"internalType": "int96",
				"name": "_flowRate",
				"type": "int96"
			}
		],
		"name": "startFlowSingle",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract ISuperToken",
				"name": "_token",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "streamDeletedSingle",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address[]",
				"name": "receiver",
				"type": "address[]"
			},
			{
				"indexed": false,
				"internalType": "int96",
				"name": "flowRate",
				"type": "int96"
			}
		],
		"name": "streamStartedMultiple",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address[]",
				"name": "receiver",
				"type": "address[]"
			}
		],
		"name": "streamStartedMultiple",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "int96",
				"name": "flowRate",
				"type": "int96"
			}
		],
		"name": "streamStartedSingle",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"internalType": "contract ISuperToken",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
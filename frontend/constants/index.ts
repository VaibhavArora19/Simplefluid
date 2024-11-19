export const contractAddress = "0x2E60B52C862337E703161B44e7af3f4CC60fb6c6";

export const ethxContract = "0x30a6933Ca9230361972E413a15dC8114c952414e";

export const permissions = {
  Create: 1,
  Update: 2,
  "Create or Update": 3,
  Delete: 4,
  "Create or Delete": 5,
  "Delete or Update": 6,
  "Create Update or Delete": 7,
};

export const reversePermissions = {
  "1": "Create",
  "2": "Update",
  "3": "Create or Update",
  "4": "Delete",
  "5": "Create or Delete",
  "6": "Delete or Update",
  "7": "Create Update or Delete",
};

export const IFlowScheduler = [
  {
    inputs: [
      { internalType: "contract ISuperfluid", name: "host", type: "address" },
      { internalType: "string", name: "registrationKey", type: "string" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "AccountInvalid", type: "error" },
  { inputs: [], name: "HostInvalid", type: "error" },
  { inputs: [], name: "ScheduleInvalid", type: "error" },
  { inputs: [], name: "TimeWindowInvalid", type: "error" },
  { inputs: [], name: "UserDataInvalid", type: "error" },
  { inputs: [], name: "ZeroAddress", type: "error" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "contract ISuperToken", name: "superToken", type: "address" },
      { indexed: true, internalType: "address", name: "sender", type: "address" },
      { indexed: true, internalType: "address", name: "receiver", type: "address" },
      { indexed: false, internalType: "uint32", name: "startDate", type: "uint32" },
      { indexed: false, internalType: "uint32", name: "startMaxDelay", type: "uint32" },
      { indexed: false, internalType: "int96", name: "flowRate", type: "int96" },
      { indexed: false, internalType: "uint256", name: "startAmount", type: "uint256" },
      { indexed: false, internalType: "bytes", name: "userData", type: "bytes" },
    ],
    name: "CreateFlowExecuted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "contract ISuperToken", name: "superToken", type: "address" },
      { indexed: true, internalType: "address", name: "sender", type: "address" },
      { indexed: true, internalType: "address", name: "receiver", type: "address" },
      { indexed: false, internalType: "uint32", name: "endDate", type: "uint32" },
      { indexed: false, internalType: "bytes", name: "userData", type: "bytes" },
    ],
    name: "DeleteFlowExecuted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "contract ISuperToken", name: "superToken", type: "address" },
      { indexed: true, internalType: "address", name: "sender", type: "address" },
      { indexed: true, internalType: "address", name: "receiver", type: "address" },
      { indexed: false, internalType: "uint32", name: "startDate", type: "uint32" },
      { indexed: false, internalType: "uint32", name: "startMaxDelay", type: "uint32" },
      { indexed: false, internalType: "int96", name: "flowRate", type: "int96" },
      { indexed: false, internalType: "uint32", name: "endDate", type: "uint32" },
      { indexed: false, internalType: "uint256", name: "startAmount", type: "uint256" },
      { indexed: false, internalType: "bytes", name: "userData", type: "bytes" },
    ],
    name: "FlowScheduleCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "contract ISuperToken", name: "superToken", type: "address" },
      { indexed: true, internalType: "address", name: "sender", type: "address" },
      { indexed: true, internalType: "address", name: "receiver", type: "address" },
    ],
    name: "FlowScheduleDeleted",
    type: "event",
  },
  {
    inputs: [
      { internalType: "contract ISuperToken", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "bytes32", name: "", type: "bytes32" },
      { internalType: "bytes", name: "", type: "bytes" },
      { internalType: "bytes", name: "", type: "bytes" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "afterAgreementCreated",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ISuperToken", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "bytes32", name: "", type: "bytes32" },
      { internalType: "bytes", name: "", type: "bytes" },
      { internalType: "bytes", name: "", type: "bytes" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "afterAgreementTerminated",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ISuperToken", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "bytes32", name: "", type: "bytes32" },
      { internalType: "bytes", name: "", type: "bytes" },
      { internalType: "bytes", name: "", type: "bytes" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "afterAgreementUpdated",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ISuperToken", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "bytes32", name: "", type: "bytes32" },
      { internalType: "bytes", name: "", type: "bytes" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "beforeAgreementCreated",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ISuperToken", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "bytes32", name: "", type: "bytes32" },
      { internalType: "bytes", name: "", type: "bytes" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "beforeAgreementTerminated",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ISuperToken", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "bytes32", name: "", type: "bytes32" },
      { internalType: "bytes", name: "", type: "bytes" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "beforeAgreementUpdated",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cfaV1",
    outputs: [
      { internalType: "contract ISuperfluid", name: "host", type: "address" },
      { internalType: "contract IConstantFlowAgreementV1", name: "cfa", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ISuperToken", name: "superToken", type: "address" },
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "uint32", name: "startDate", type: "uint32" },
      { internalType: "uint32", name: "startMaxDelay", type: "uint32" },
      { internalType: "int96", name: "flowRate", type: "int96" },
      { internalType: "uint256", name: "startAmount", type: "uint256" },
      { internalType: "uint32", name: "endDate", type: "uint32" },
      { internalType: "bytes", name: "userData", type: "bytes" },
      { internalType: "bytes", name: "ctx", type: "bytes" },
    ],
    name: "createFlowSchedule",
    outputs: [{ internalType: "bytes", name: "newCtx", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ISuperToken", name: "superToken", type: "address" },
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "bytes", name: "ctx", type: "bytes" },
    ],
    name: "deleteFlowSchedule",
    outputs: [{ internalType: "bytes", name: "newCtx", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ISuperToken", name: "superToken", type: "address" },
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "bytes", name: "userData", type: "bytes" },
    ],
    name: "executeCreateFlow",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ISuperToken", name: "superToken", type: "address" },
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "bytes", name: "userData", type: "bytes" },
    ],
    name: "executeDeleteFlow",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    name: "flowSchedules",
    outputs: [
      { internalType: "uint32", name: "startDate", type: "uint32" },
      { internalType: "uint32", name: "startMaxDelay", type: "uint32" },
      { internalType: "uint32", name: "endDate", type: "uint32" },
      { internalType: "int96", name: "flowRate", type: "int96" },
      { internalType: "uint256", name: "startAmount", type: "uint256" },
      { internalType: "bytes32", name: "userData", type: "bytes32" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "superToken", type: "address" },
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "receiver", type: "address" },
    ],
    name: "getFlowSchedule",
    outputs: [
      {
        components: [
          { internalType: "uint32", name: "startDate", type: "uint32" },
          { internalType: "uint32", name: "startMaxDelay", type: "uint32" },
          { internalType: "uint32", name: "endDate", type: "uint32" },
          { internalType: "int96", name: "flowRate", type: "int96" },
          { internalType: "uint256", name: "startAmount", type: "uint256" },
          { internalType: "bytes32", name: "userData", type: "bytes32" },
        ],
        internalType: "struct IFlowScheduler.FlowSchedule",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "_receiver",
        type: "address[]",
      },
    ],
    name: "deleteFlowMultiple",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
    ],
    name: "deleteFlowSingle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "endScheduledStream",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "performUpkeep",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "scheduleStream",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "_receiver",
        type: "address[]",
      },
      {
        internalType: "int96",
        name: "_flowRate",
        type: "int96",
      },
    ],
    name: "startFlowMultiple",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        internalType: "int96",
        name: "_flowRate",
        type: "int96",
      },
    ],
    name: "startFlowSingle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "startScheduledStream",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "receiver",
        type: "address[]",
      },
    ],
    name: "streamDeletedMultiple",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "streamDeletedSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "receiver",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "int96",
        name: "flowRate",
        type: "int96",
      },
    ],
    name: "streamStartedMultiple",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "int96",
        name: "flowRate",
        type: "int96",
      },
    ],
    name: "streamStartedSingle",
    type: "event",
  },
  {
    inputs: [],
    name: "_flowScheduler",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_token",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "automatedSenders",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "automatedStreams",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "checkUpkeep",
    outputs: [
      {
        internalType: "bool",
        name: "upkeepNeeded",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "flowScheduler",
    outputs: [
      {
        internalType: "contract IFlowScheduler",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "getScheduledStream",
    outputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "startDate",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "startMaxDelay",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "endDate",
            type: "uint32",
          },
          {
            internalType: "int96",
            name: "flowRate",
            type: "int96",
          },
          {
            internalType: "uint256",
            name: "startAmount",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "userData",
            type: "bytes32",
          },
        ],
        internalType: "struct IFlowScheduler.FlowSchedule",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "isAutomated",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract ISuperToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

/**
 * @see https://github.com/nervosnetwork/ckb/blob/develop/protocol/src/protocol.fbs for more infGomation
 */

declare namespace CKBComponents {
  export type Hash = string
  export type Hash256 = string
  export type UInt32 = number
  export type Index = UInt32
  export type Version = UInt32
  export type Count = UInt32
  export type Difficulty = bigint
  export type BlockNumber = string
  export type EpochInHeader = string
  export type Capacity = string
  export type ProposalShortId = string
  export type Timestamp = string
  export type Nonce = string
  /**
   * @typedef Bytes, keep consistent with CKB
   * @description Bytes will be serialized to string
   * @see https://github.com/nervosnetwork/ckb/blob/develop/util/jsonrpc-types/src/blockchain.rs#L19
   */
  export type Bytes = string
  export type Since = string
  export interface Node {
    url: string
  }
  export interface Method {
    name: string
    method: string
    paramsFormatters: Function[]
    resultFormatters?: Function
  }
  /**
   * RPC Units
   */

  /* eslint-disable max-len */
  /**
   * @typedef Script, lock or type script
   * @description Script, the script model in CKB. CKB scripts use UNIX standard execution environment. Each script binary should contain a main function with the following signature `int main(int argc, char* argv[]);`. CKB will concat `signed_args` and `args`, then use the concatenated array to fill `argc/argv` part, then start the script execution. Upon termination, the executed `main` function here will provide a return code, `0` means the script execution succeeds, other values mean the execution fails.
   * @property args, arguments.
   * @property codeHash, point to its dependency, if the referred dependency is listed in the deps field in a transaction, the codeHash means the hash of the referred cell's data.
   * @see https://github.com/nervosnetwork/ckb/blob/develop/core/src/script.rs#L16
   * @tutorial Each script has a `lock_hash` which uniquely identifies the script, for example, the `lock_hash` of lock script, is exactly the corresponding `lock` script field value in the referenced cell, when calculating hash for a script, `bianryHash`, and `args` will all be used.
   */
  /* eslint-enable max-len */
  export interface Script {
    args: Bytes[]
    codeHash: Hash256
  }

  /**
   * @typedef CellInput, cell input in a transaction
   * @property previousOutput, point to its P1 cell
   * @property since, a parameter to prevent a cell to be spent before a centain block timestamp or a block number,
   *           [RFC](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0017-tx-valid-since/0017-tx-valid-since.md)
   * @property args, args to unlock cell
   */
  export interface CellInput {
    previousOutput: OutPoint
    since: Since
    args: Bytes[]
  }

  /**
   * @typedef CellOutput, cell output in a transaction
   * @property capacity, the capacity of the genereated P1 cell
   * @property data, cell data
   * @property lock, lock script
   * @property type, type script
   */
  export interface CellOutput {
    capacity: Capacity
    data: Bytes
    lock: Script
    type?: Script | null
  }

  /**
   * @typedef CellOutPoint, used to refer a generated cell by transaction hash and output index
   * @property hash, transaction hash
   * @property index, index of cell output
   */
  export interface CellOutPoint {
    txHash: Hash256
    index: Index
  }

  export interface OutPoint {
    cell?: CellOutPoint | null
    blockHash?: Hash256 | null
  }

  export interface Witness {
    data: Bytes[]
  }

  /**
   * @typedef RawTransaction, raw transaction object
   * @property version, transaction version
   * @property deps, transaction deps
   * @property inputs, cell inputs in the transaction
   * @property outputs, cell outputs in the transaction
   * @property witnesses, segrated witnesses
   */
  export interface RawTransaction {
    version: Version
    deps: OutPoint[]
    inputs: CellInput[]
    outputs: CellOutput[]
    witnesses: Witness[]
  }

  /**
   * @typedef Transaction, transaction object
   * @extends RawTransaction
   * @property hash, transaction hash
   */
  export interface Transaction extends RawTransaction {
    hash: Hash256
  }

  /**
   * @typedef @Seal
   * @property nonce
   * @property proof
   */
  export interface Seal {
    nonce: Nonce
    proof: Uint8Array
  }

  /**
   * @typedef BlockHeader, header of a block
   * @property version
   * @property parentHash
   * @property timestamp
   * @property number
   * @property epoch
   * @property transactionsRoot
   * @property proposalsHash
   * @property difficulty
   * @property unclesHash
   * @property unclesCount
   * @property seal
   * @property hash
   */
  export interface BlockHeader {
    version: Version
    parentHash: Hash256
    timestamp: Timestamp
    number: BlockNumber
    epoch: EpochInHeader
    transactionsRoot: Hash256
    proposalsHash: Hash256
    witnessesRoot: Hash256
    difficulty: Difficulty
    unclesHash: Hash256
    unclesCount: UInt32
    seal: Seal
    hash: Hash256
  }

  /**
   * @typedef UncleBlock, uncle block object
   * @property header, block header
   * @property proposals
   */

  interface UncleBlock {
    header: BlockHeader
    proposals: ProposalShortId[]
  }

  /**
   * @typedef Block, block object
   * @property header, block header
   * @property uncles, uncle blocks
   * @property transactions
   * @property proposals
   */
  export interface Block {
    header: BlockHeader
    uncles: UncleBlock[]
    transactions: Transaction[]
    proposals: ProposalShortId[]
  }

  /**
   * @typedef Cell, cell object
   * @property capacty, cell capacity
   * @property lock, lock hash
   */
  export interface Cell extends CellOutput {}

  /**
   * @typedef Cell, cell object
   * @property capacty, cell capacity
   * @property lock, lock hash
   * @property outPoint
   */

  export interface CellWithOutPoint extends Cell {
    outPoint: OutPoint
  }

  export interface CellByLockHash {
    capacity: Capacity
    lock: Hash256
    outPoint: OutPoint
  }

  export type TransactionTrace = { action: string; info: string; time: Timestamp }[]

  export enum CellStatus {
    LIVE = 'live',
  }

  export interface BlockchainInfo {
    isInitialBlockDownload: boolean
    epoch: string
    difficulty: string
    medianTime: string
    chain: string
    warnings: string
  }

  export interface NodeInfo {
    version: string
    nodeId: string
    addresses: { address: string; score: number }[]
  }

  export interface PeersState {
    lastUpdated: string
    blocksInFlight: string
    peer: string
  }

  export interface TxPoolInfo {
    pending: Count
    staging: Count
    orphan: Count
    lastTxsUpdatedAt: Timestamp
  }

  export enum CapacityUnit {
    Shannon = 1,
    Byte = 100000000,
  }

  export interface Epoch {
    blockReward: String
    difficulty: String
    lastBlockHashInPreviousEpoch: String
    length: String
    number: String
    remainderReward: String
    startNumber: String
  }
}

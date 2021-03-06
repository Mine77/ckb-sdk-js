import paramsFmts from './paramsFormatter'
import resultFmts from './resultFormatter'

const defaultRPC: CKBComponents.Method[] = [
  {
    name: 'getBlockByNumber',
    method: 'get_block_by_number',
    paramsFormatters: [paramsFmts.toNumber],
    resultFormatters: resultFmts.toBlock,
  },
  {
    name: 'getBlock',
    method: 'get_block',
    paramsFormatters: [paramsFmts.toHash],
    resultFormatters: resultFmts.toBlock,
  },
  {
    name: 'getTransaction',
    method: 'get_transaction',
    paramsFormatters: [paramsFmts.toHash, paramsFmts.toNumber, paramsFmts.toNumber],
    resultFormatters: resultFmts.toTransactionWithStatus,
  },
  {
    name: 'getBlockHash',
    method: 'get_block_hash',
    paramsFormatters: [paramsFmts.toNumber],
  },
  {
    name: 'getTipHeader',
    method: 'get_tip_header',
    paramsFormatters: [],
    resultFormatters: resultFmts.toHeader,
  },
  {
    name: 'getCellsByLockHash',
    method: 'get_cells_by_lock_hash',
    paramsFormatters: [paramsFmts.toHash, paramsFmts.toNumber, paramsFmts.toNumber],
    resultFormatters: resultFmts.toCells,
  },
  {
    name: 'getLiveCell',
    method: 'get_live_cell',
    paramsFormatters: [paramsFmts.toOutPoint],
    resultFormatters: resultFmts.toCellWithStatus,
  },
  {
    name: 'getTipBlockNumber',
    method: 'get_tip_block_number',
    paramsFormatters: [],
    resultFormatters: resultFmts.toNumber,
  },
  {
    name: 'getBlockchainInfo',
    method: 'get_blockchain_info',
    paramsFormatters: [],
    resultFormatters: resultFmts.toBlockchainInfo,
  },
  {
    name: 'sendTransaction',
    method: 'send_transaction',
    paramsFormatters: [paramsFmts.toRawTransaction],
    resultFormatters: resultFmts.toHash,
  },
  {
    name: 'localNodeInfo',
    method: 'local_node_info',
    paramsFormatters: [],
    resultFormatters: resultFmts.toNodeInfo,
  },
  {
    name: 'txPoolInfo',
    method: 'tx_pool_info',
    paramsFormatters: [],
    resultFormatters: resultFmts.toTxPoolInfo,
  },
  {
    name: 'getPeers',
    method: 'get_peers',
    paramsFormatters: [],
    resultFormatters: resultFmts.toPeers,
  },
  {
    name: 'getPeersState',
    method: 'get_peers_state',
    paramsFormatters: [],
    resultFormatters: resultFmts.toPeersState,
  },
  {
    name: 'getCurrentEpoch',
    method: 'get_current_epoch',
    paramsFormatters: [],
    resultFormatters: resultFmts.toEpoch,
  },
  {
    name: 'getEpochByNumber',
    method: 'get_epoch_by_number',
    paramsFormatters: [paramsFmts.toNumber],
    resultFormatters: resultFmts.toEpoch,
  },
  {
    name: 'dryRunTransaction',
    method: 'dry_run_transaction',
    paramsFormatters: [paramsFmts.toRawTransaction],
    resultFormatters: resultFmts.toHash,
  },
]

export class DefaultRPC {
  protected defaultMethods = defaultRPC

  public getBlockByNumber!: (number: CKBComponents.BlockNumber) => Promise<CKBComponents.Block>

  public getBlock!: (hash: CKBComponents.Hash) => Promise<CKBComponents.Block>

  public getTransaction!: (hash: CKBComponents.Hash) => Promise<CKBComponents.Transaction>

  public getBlockHash!: (number: CKBComponents.BlockNumber) => Promise<CKBComponents.Hash>

  public getTipHeader!: () => Promise<CKBComponents.BlockHeader>

  public getCellsByLockHash!: (
    hash: string,
    from: CKBComponents.BlockNumber,
    to: CKBComponents.BlockNumber
  ) => Promise<CKBComponents.CellByLockHash[]>

  public getLiveCell!: (
    outPoint: CKBComponents.OutPoint
  ) => Promise<{
    cell: CKBComponents.Cell
    status: CKBComponents.CellStatus
  }>

  public getTipBlockNumber!: () => Promise<CKBComponents.BlockNumber>

  public sendTransaction!: (tx: CKBComponents.RawTransaction) => Promise<CKBComponents.Hash>

  public getBlockchainInfo!: () => Promise<CKBComponents.BlockchainInfo>

  public localNodeInfo!: () => Promise<CKBComponents.NodeInfo>

  public txPoolInfo!: () => Promise<CKBComponents.TxPoolInfo>

  public getPeers!: () => Promise<CKBComponents.NodeInfo[]>

  public getPeersState!: () => Promise<CKBComponents.PeersState>

  public getCurrentEpoch!: () => Promise<CKBComponents.Epoch>

  public getEpochByNumber!: (epoch: string) => Promise<CKBComponents.Epoch>

  public dryRunTransaction!: (tx: CKBComponents.RawTransaction) => Promise<CKBComponents.Hash>
}

export default DefaultRPC

import DefaultRPC from './defaultRPC'
import { DebugLevel } from './enum'
import Method from './method'

import paramsFormatter from './paramsFormatter'
import resultFormatter from './resultFormatter'

class CKBRPC extends DefaultRPC {
  private _node: CKBComponents.Node

  private _methods: Method[] = []

  public paramsFormatter = paramsFormatter

  public resultFormatter = resultFormatter

  public setDebugLevel = (level: DebugLevel) => {
    Method.debugLevel = level
  }

  constructor(nodeUrl: string) {
    super()
    this._node = {
      url: nodeUrl,
    }
    this.defaultMethods.map(this.addMethod)
  }

  public setNode(node: CKBComponents.Node): CKBComponents.Node {
    this._node = node
    return this._node
  }

  public get node() {
    return this._node
  }

  public get methods() {
    return this._methods
  }

  public addMethod = (options: CKBComponents.Method) => {
    const method = new Method(options, this._node)
    this._methods.push(method)

    Object.defineProperty(this, options.name, {
      value: method.call,
      enumerable: true,
    })
  }
}

export default CKBRPC

# CKB SDK JavaScript

| Service  | Master                                                                                                                                                   | Develop                                                                                                                                                    |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Travis   | [![Build Status](https://travis-ci.com/nervosnetwork/ckb-sdk-js.svg?branch=master)](https://travis-ci.com/nervosnetwork/ckb-sdk-js)                      | [![Build Status](https://travis-ci.com/nervosnetwork/ckb-sdk-js.svg?branch=develop)](https://travis-ci.com/nervosnetwork/ckb-sdk-js)                       |
| Coverage | [![Codecov](https://codecov.io/gh/nervosnetwork/ckb-sdk-js/branch/master/graph/badge.svg)](https://codecov.io/gh/nervosnetwork/ckb-sdk-js/branch/master) | [![Codecov](https://codecov.io/gh/nervosnetwork/ckb-sdk-js/branch/develop/graph/badge.svg)](https://codecov.io/gh/nervosnetwork/ckb-sdk-js/branch/develop) |
| NPM      | [![NPM](https://img.shields.io/npm/v/@nervosnetwork/ckb-sdk-core/latest.svg)](https://www.npmjs.com/package/@nervosnetwork/ckb-sdk-core)                 | [![NPM](https://img.shields.io/npm/v/@nervosnetwork/ckb-sdk-core.svg)](https://www.npmjs.com/package/@nervosnetwork/ckb-sdk-core)                          |

[![Telegram Group](https://cdn.rawgit.com/Patrolavia/telegram-badge/8fe3382b/chat.svg)](https://t.me/nervos_ckb_dev)
![License](https://img.shields.io/npm/l/@nervosnetwork/ckb-sdk-core.svg)

JavaScript SDK for Nervos [CKB](https://github.com/nervosnetwork/ckb).

<details>
<summary>ToC</summary>
<p>

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Modules](#modules)
- [CORE](#core)
- [RPC](#rpc)
- [Errors](#errors)
- [Related Projects](#related-projects)

<p>
</details>

---

# Introduction

`@nervosnetwork/ckb-sdk-core` is the SDK used to interact with [Nervos CKB](https://github.com/nervosnetwork/ckb), which is an open source project of public blockchain.

## About Nervos CKB

> Nervos CKB is the layer 1 of Nervos Network, a public blockchain with PoW and cell model.

> Nervos project defines a suite of scalable and interoperable blockchain protocols. Nervos CKB uses those protocols to create a self-evolving distributed network with a novel economic model, data model and more.

> _Noteice:_ The ckb process will send stack trace to sentry on Rust panics. This is enabled by default before mainnet, which can be opted out by setting the option dsn to empty in the config file.

## About @nervosnetwork/ckb-sdk-core

`@nervosnetwork/ckb-sdk-core` is a SDK implemented by JavaScript, and published in [NPM Registry](https://www.npmjs.com/package/@nervosnetwork/ckb-sdk-core/), which provides APIs for developers to send requests to the CKB blockchain.

This SDK can be used both in Browsers and [Node.js](https://nodejs.org) cuz it's source code is implemented by TypeScript, which is a superset of JavaScript and compiled into ES6. For some browsers with old versions, some polyfills might be injected.

# Prerequisites

We are going to use [yarn](https://yarnpkg.com/) for next steps, which is similar to [npm](https://npmjs.com), feel free to pick one.

For the developers who are interested in contribution.

This project depends on [](https://github.com/bitcoinjs/tiny-secp256k1), which depends on a C library. Due to that, the tiny-secp256k1 might require rebuilding in some cases.

```sh
$ yarn rebuild tiny-secp256k1 # rebuild tiny-secp256k1
```

If you still encounter problems, please read this guide at [secp256k1-node](https://github.com/cryptocoinjs/secp256k1-node#installation), as the build instruction shoud be exactly the same.

# Installation

```sh
yarn add @nervosnetwork/ckb-sdk-core # install the sdk into your project
```

# Modules

This SDK includes several modules:

<details>
<summary>
  Address <a href="https://github.com/nervosnetwork/ckb-sdk-js/tree/develop/packages/ckb-sdk-address" alt="address">Code</a>
</summary>
<dd>

Used to create an address object, whose value is the address we are going to use.

Default `address algorithm` is the `pubkeyToAddress` in utils module, which generates it in bech32 format.

Default rule to generate the address from a public key is:

- Blake160(public key): blake2b(public key) then trauncate it for fist 20 bytes.
- Specify options used: Address Type, Address Bin Index, Prefix. The options will be explained in an RFC.
- Bech32 the blake160ed public key with specified options: bech32Address(blake160Pubkey, {prefix, type, binIndex})

</dd>
</details>

<details>
<summary>
  RPC <a href="https://github.com/nervosnetwork/ckb-sdk-js/tree/develop/packages/ckb-sdk-rpc" alt="rpc">Code</a>
</summary>
<dd>

Used to send RPC request to the CKB, the list could be found in [CKB Project](https://github.com/nervosnetwork/ckb/blob/develop/util/jsonrpc-types/src/blockchain.rs)

Interfaces could be found in `DefaultRPC` class in this module.

</dd>

</details>

<details>
<summary>
  Utils <a href="https://github.com/nervosnetwork/ckb-sdk-js/tree/develop/packages/ckb-sdk-utils" alt="utils">Code</a>
</summary>
<dd>

The Utils module provides useful methods for other modules.

</dd>
</details>

<details>
<summary>
  <del>Wallet <a href="https://github.com/nervosnetwork/ckb-sdk-js/tree/develop/packages/ckb-sdk-wallet" alt="wallet">Code</a></del>
</summary>
<dd>

The wallet module used to be a demo, will be deprecated in the future for its fuzzy concept.

</dd>
</details>

<details>
<summary>
  Types <a href="https://github.com/nervosnetwork/ckb-sdk-js/tree/develop/packages/ckb-types" alt="types">Code</a>
</summary>
<dd>

The Types module used to provide the type definition of CKB Components according to the [CKB Project](https://github.com/nervosnetwork/ckb/blob/develop/util/jsonrpc-types/src/blockchain.rs).

CKB Project compiles to the snake case convetion, which listed in the types/CKB_RPC in the RPC module.

TypeScript compiles to the PascalCase convention, which listed in this module.

</dd>
</details>

# CORE

All the above modules are integrated into the core module. You can find `rpc`, `utils`, `wallet` in the core instance.

> The address module has not been integrated yet, and the wallet module will be removed in the future.

To use the core module, you need to import it in your project and instantiate it with a node object. For now, the node object only contains one field named `url`, the URI of the blockchain node your are going to communicate with.

```javascript
const CKBCore = require('@nervosnetwork/ckb-sdk-core').default

const node = {
  url: 'http://localhost:8114,
}

const core = new CKBCore(node)
```

After that you can use the `core` object to generate addresses, send requests, etc.

# RPC

> TODO:

# Errors

1. RPC Errors

The rpc module will throw an error when the result contains an error field, you need to handle it manually.

# Related Projects

1. [Neuron](https://github.com/nervosnetwork/neuron): a blockchain wallet for CKB.
2. [CLI](https://github.com/Keith-CY/ckb-sdk-js/tree/document/packages/ckb-cli): a terminal tool based on this SDK.

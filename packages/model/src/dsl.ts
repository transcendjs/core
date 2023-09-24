//
// © 2023 Hardcore Engineering, Inc. All Rights Reserved.
// Licensed under the Eclipse Public License v2.0 (SPDX: EPL-2.0).
//

import type { Obj, Class, Ref, Domain, Interface, Classifier, PrimitiveArray, Primitive } from '@transcend/core'
import { ClassifierKind } from '@transcend/core'

interface ClassTxes {
  _id: Ref<Class<Obj>>
  extends: Ref<Class<Obj>>
  implements: PrimitiveArray<Ref<Interface>>
  domain: Domain
  kind: ClassifierKind
  // txes: Array<Tx>
  // label: IntlString
  // icon?: Asset
}

const transactions = new Map<any, ClassTxes>()

function getTxes(target: any): ClassTxes {
  const txes = transactions.get(target)
  if (txes === undefined) {
    const txes = { txes: [] } as unknown as ClassTxes
    transactions.set(target, txes)
    return txes
  }
  return txes
}

/**
 * @internal
 * @param constructor
 * @returns
 */
export function getClassTxes(constructor: new () => Obj) {
  return getTxes(constructor.prototype)
}

export function Model<T extends E, E extends Obj>(
  _class: Ref<Class<T>>,
  _extends: Ref<Class<E>>,
  _domain: Domain,
  _implements?: PrimitiveArray<Ref<Interface>>
) {
  return (constructor: new () => Obj, context: { kind: string }) => {
    if (context.kind !== 'class') {
      throw new Error('@Model can be used to decorate `class` only')
    }
    const txes = getClassTxes(constructor)
    txes._id = _class
    txes.extends = _extends
    txes.implements = _implements ?? []
    txes.domain = _domain
    txes.kind = ClassifierKind.Class
  }
}

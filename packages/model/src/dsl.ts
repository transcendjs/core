
import type { Obj, Class, Ref, Domain, Interface, PrimitiveArray } from '@transcend/core'
import { ClassifierKind } from '@transcend/core'

export function Model<T extends E, E extends Obj> (
  _class: Ref<Class<T>>,
  _extends: Ref<Class<E>>,
  _domain: Domain,
  _implements?: PrimitiveArray<Ref<Interface>>,
) {
  return function classDecorator<C extends new () => T> (constructor: C): void {
    // const txes = getTxes(constructor.prototype)
    // txes._id = _class
    // txes.extends = _class !== core.class.Obj ? _extends : undefined
    // txes.implements = _implements
    // txes.domain = domain
    // txes.kind = ClassifierKind.Class
  }
}

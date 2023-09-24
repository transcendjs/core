import type { Resource } from '@transcend/resource'

export type Domain = string & { __tag: 'domain' }
export type Account = string & { __tag: 'account' }
export type Timestamp = number & { __tag: 'timestamp' }

export type Ref<T extends Doc> = string & { __ref: T }
export type PRef<T extends Doc> = Ref<T> & Resource<Ref<T>> // Persistent Reference, can be used as `Resource`

export type Primitive = boolean | number | string | Domain | Account | Timestamp | Ref<Doc>
export type PrimitiveArray<T extends Primitive> = T[]

export const DomainModel = 'model' as Domain

export interface Obj {
  _class: Ref<Class<this>>
}

export interface Doc extends Obj {
  _id: Ref<this>
  space: Ref<Space>
  modifiedOn: Timestamp
  modifiedBy: Account
  createdOn: Timestamp
  createdBy: Account
}

export interface Space extends Doc {
  private: boolean
  members: PrimitiveArray<Account>
}

export interface SpaceCompanion extends Doc {
  companion: Ref<Space>
}

export enum ClassifierKind {
  Class,
  Interface,
  Mixin
}

export interface Classifier extends Doc {
  kind: ClassifierKind
}

export interface Interface<E extends Obj = Obj> extends Classifier {
  extends: PrimitiveArray<Ref<Interface<E>>>
}

export interface Class<T extends Obj> extends Classifier {
  domain: Domain
  extends: Ref<Class<Obj>>
  implements: PrimitiveArray<Ref<Interface>>
}

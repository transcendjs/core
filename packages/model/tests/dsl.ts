//
// © 2023 Hardcore Engineering, Inc. All Rights Reserved.
// Licensed under the Eclipse Public License v2.0 (SPDX: EPL-2.0).
//

import { describe, expect, test } from '@jest/globals'
import type { Plugin } from '@transcend/resource'
import type { Ref, PRef, Obj, Doc, Class } from '@transcend/core'
import { ClassifierKind, DomainModel } from '@transcend/core'
import { resources } from '@transcend/resource'
import { Model, getClassTxes } from '../src/dsl'

describe('dsl', () => {
  const plugin = 'core' as Plugin

  const core = resources(plugin, {
    class: {
      Obj: '' as PRef<Class<Obj>>,
      Doc: '' as PRef<Class<Doc>>
    }
  })

  @Model(core.class.Obj, core.class.Obj, DomainModel)
  class TObj implements Obj {
    _class!: Ref<Class<this>>
  }

  test('test @Model decorator', () => {
    const txObj = getClassTxes(TObj)

    expect(txObj._id).toBe(core.class.Obj)
    expect(txObj.extends).toBe(core.class.Obj)
    expect(txObj.domain).toBe(DomainModel)
    expect(txObj.kind).toBe(ClassifierKind.Class)
    expect(txObj.implements).toEqual([])
  })
})

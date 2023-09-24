

import type { Plugin } from '@transcend/resource'
import { resources } from '@transcend/resource'
import type { PRef, Obj, Class } from './model'

const plugin = 'core' as Plugin

const r = resources(plugin, {
  class: {
    Obj: '' as PRef<Class<Obj>>,
    Class: '' as PRef<Class<Class<Obj>>>
  }
})


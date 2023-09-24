import { describe, expect, test } from '@jest/globals'

import type { Plugin, Resource } from '../src/resource'
import { resources } from '../src/resource'

describe('resources', () => {
  const plugin = 'test' as Plugin

  test('create platform resource identifiers', () => {
    const test = resources(plugin, {
      x: {
        X: '' as Resource<number>
      }
    })

    expect(test.x.X).toBe('test:x:X')
  })
})

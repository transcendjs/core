//
// © 2023 Hardcore Engineering, Inc. All Rights Reserved.
// Licensed under the Eclipse Public License v2.0 (SPDX: EPL-2.0).
//

export type Plugin = string & { __tag: 'plugin' }

/**
 * Platform Resource Identifier (PRI)
 *
 * @remarks
 *
 * Almost anything in TranscendJS is a `Resource`. Resources referenced by Platform Resource Identifier (PRI).
 *
 * @example
 * ```typescript
 *   `core.string.ClassLabel` as Resource<string> // translated string according to current language and i18n settings
 *   `workbench.icon.Add` as Resource<URL> // URL to SVG sprites
 * ```
 *
 * @public
 */
export type Resource<T = any> = string & { __resource: T }

type Resources = Record<string, Record<string, Resource>>
type ResolvedRecord<T extends Record<string, Resource>> = {
  [key in keyof T]: T[key] extends Resource<infer R> ? R : never
}

export type ResolvedResources<T extends Resources> = {
  [key in keyof T]: ResolvedRecord<T[key]>
}

const PRI_SEPARATOR = ':'

type Strings = Record<string, string | Record<string, string>>

function identify(prefix: string, src: Strings) {
  const res: Strings = {}
  for (const key in src) {
    const value = src[key]
    const ident = prefix + PRI_SEPARATOR + key
    res[key] = typeof value === 'string' ? ident : (identify(ident, value) as Record<string, string>)
  }
  return res
}

export function resources<R extends Resources>(plugin: Plugin, resources: R): Readonly<R> {
  return identify(plugin, resources) as R
}

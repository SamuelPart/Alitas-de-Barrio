#!/usr/bin/env node
/**
 * Avisa a Vercel que despliegue el último commit.
 * Uso:  node scripts/deploy.mjs
 *
 * La URL del Deploy Hook se lee de:
 *   1. variable de entorno VERCEL_DEPLOY_HOOK
 *   2. archivo .env.local (VERCEL_DEPLOY_HOOK=...)
 */
import { readFileSync } from 'node:fs'

const readEnvFile = () => {
  try {
    const raw = readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
    const line = raw.split('\n').find((l) => l.trim().startsWith('VERCEL_DEPLOY_HOOK='))
    if (!line) return null
    return line.split('=').slice(1).join('=').trim().replace(/^["']|["']$/g, '')
  } catch {
    return null
  }
}

const hook = process.env.VERCEL_DEPLOY_HOOK || readEnvFile()

if (!hook || !/^https:\/\/api\.vercel\.com\/v1\/integrations\/deploy\//.test(hook)) {
  console.error(
    '\n✗ Falta el Deploy Hook de Vercel.\n' +
      '  Crea .env.local con:\n' +
      '  VERCEL_DEPLOY_HOOK=https://api.vercel.com/v1/integrations/deploy/prj_xxx/yyy\n',
  )
  process.exit(1)
}

let res
try {
  res = await fetch(hook, { method: 'POST' })
} catch (error) {
  console.error(
    `✗ No se pudo conectar con Vercel (${error.cause?.code ?? error.message}).\n` +
      '  Revisa tu conexión a internet o el proxy de tu red.',
  )
  process.exit(1)
}

const body = await res.text()

if (!res.ok) {
  console.error(`✗ Vercel respondió ${res.status}: ${body}`)
  process.exit(1)
}

console.log('✓ Deploy encolado en Vercel:', body)
console.log('  Revisa el estado en https://vercel.com/dashboard')

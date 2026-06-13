#!/usr/bin/env node
/**
 * Generate cryptographically secure secrets for SwiftSage.
 *
 * Usage:
 *   node server/scripts/generate-secrets.js
 *
 * Outputs ready-to-paste .env lines.
 */

import { randomBytes } from 'crypto';

const length = 48;
const jwtSecret = randomBytes(length).toString('base64url');
const refreshSecret = randomBytes(length).toString('base64url');

console.log('');
console.log('# Generated secrets — paste into .env');
console.log(`JWT_SECRET=${jwtSecret}`);
console.log(`JWT_REFRESH_SECRET=${refreshSecret}`);
console.log('');
console.log(`# JWT_SECRET length: ${jwtSecret.length} chars`);
console.log(`# JWT_REFRESH_SECRET length: ${refreshSecret.length} chars`);
console.log('');

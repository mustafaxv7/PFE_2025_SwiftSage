import 'dotenv/config';

const rules = {
    required: {
        DATABASE_URL: {
            pattern: /^postgresql:\/\//,
            hint: 'Must be a valid PostgreSQL connection string starting with postgresql://',
        },
        JWT_SECRET: {
            minLength: 32,
            hint: 'Must be at least 32 characters. Generate with: node -e "console.log(require(\'crypto\').randomBytes(48).toString(\'base64url\'))"',
        },
        JWT_REFRESH_SECRET: {
            minLength: 32,
            hint: 'Must be at least 32 characters. Generate with: node -e "console.log(require(\'crypto\').randomBytes(48).toString(\'base64url\'))"',
        },
    },
    optional: {
        PORT: { default: '5030' },
        NODE_ENV: { default: 'development', allowed: ['development', 'production', 'test'] },
        SPACES_ENDPOINT: { default: '' },
        DO_SPACES_BUCKET: { default: '' },
        DO_SPACES_REGION: { default: '' },
    },
};

const errors = [];
const warnings = [];

for (const [key, rule] of Object.entries(rules.required)) {
    const value = process.env[key];

    if (!value) {
        errors.push(`  [MISSING] ${key} — ${rule.hint}`);
        continue;
    }

    if (rule.minLength && value.length < rule.minLength) {
        errors.push(`  [TOO SHORT] ${key} — ${value.length}/${rule.minLength} chars. ${rule.hint}`);
        continue;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
        errors.push(`  [INVALID FORMAT] ${key} — ${rule.hint}`);
        continue;
    }
}

for (const [key, rule] of Object.entries(rules.optional)) {
    if (!process.env[key]) {
        if (rule.default) {
            process.env[key] = rule.default;
        }
        warnings.push(`  ${key} not set — using default: "${rule.default || '(empty)'}"`);
    } else if (rule.allowed && !rule.allowed.includes(process.env[key])) {
        warnings.push(`  ${key}="${process.env[key]}" — expected one of: ${rule.allowed.join(', ')}`);
    }
}

if (errors.length > 0) {
    console.error('\n╔══════════════════════════════════════════════════════╗');
    console.error('║  FATAL: Environment configuration errors detected   ║');
    console.error('╚══════════════════════════════════════════════════════╝\n');
    console.error(errors.join('\n'));
    console.error('\nFix these in your .env file and restart.\n');
    console.error('See .env.example for documentation.\n');
    process.exit(1);
}

if (warnings.length > 0) {
    console.warn('\n[env] Warnings:');
    console.warn(warnings.join('\n'));
}

console.log(`[env] Configuration OK (NODE_ENV=${process.env.NODE_ENV})`);

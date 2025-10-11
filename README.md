# Zapiet Todo — Developer Setup Guide

This repository is a Laravel + Inertia (React + Vite) application. Follow this guide to get the project running locally quickly and safely.

Note on secrets: Never commit your real .env or credentials. Use .env.example as a starting point and keep your real .env out of version control.

## Prerequisites
- PHP 8.2+ with required extensions for Laravel (bcmath, ctype, curl, dom, fileinfo, json, mbstring, openssl, pdo, tokenizer, xml)
- Composer 2+
- Node.js 18+ and npm 9+ (or Node 20+)
- A database (MySQL/MariaDB or SQLite). Default example uses SQLite for zero-config.
- Optional services depending on features you use:
  - Redis (for cache/queue; optional — database driver is the default)
  - Mailpit/MailHog (local email testing)
  - WorkOS account (if using SSO/WorkOS features)
  - SendGrid account (if sending real emails)

## 1) Clone and install
```
git clone <your-fork-or-repo-url> zapiet-todo
cd zapiet-todo

# PHP dependencies
composer install

# Node dependencies
npm install
```

## 2) Environment configuration
- Create your local env file from the template:
```
cp .env.example .env
```
- Generate an app key:
```
php artisan key:generate
```
- Review .env and adjust as needed. The provided .env.example is safe and uses sensible defaults:
  - APP_URL: set to your local URL (e.g., http://localhost:8000 or your Herd/Valet domain)
  - DB: defaults to SQLite out of the box (no extra config). Uncomment and set MySQL if you prefer.
  - MAIL: defaults to "log" driver (emails go to storage logs). Configure Mailpit or SendGrid if needed.
  - WORKOS and AWS: leave empty unless you are integrating these services locally.

### Using SQLite (zero config)
- .env.example already uses `DB_CONNECTION=sqlite`. Laravel will use a database file at database/database.sqlite if present. Create it:
```
touch database/database.sqlite
```

### Using MySQL (alternative)
Edit .env:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=todos
DB_USERNAME=root
DB_PASSWORD=
```
Create the database manually if it doesn’t exist (e.g., CREATE DATABASE todos;).

## 3) Application setup
Run migrations (and optionally seeders):
```
php artisan migrate
# php artisan db:seed   # if/when seeders are available
```

Queues (default uses database queue):
- Start a queue worker in a separate terminal if you plan to test queued jobs:
```
php artisan queue:work
```

Scheduler (optional):
- To run scheduled tasks, you can execute:
```
php artisan schedule:work
```

## 4) Run the app
You need to run the API (Laravel) and the frontend (Vite) during development.

- Start the Laravel server (one of the options):
```
php artisan serve  # http://127.0.0.1:8000
```
If you are using Herd/Valet, ensure APP_URL in .env matches your local domain (e.g., https://zapiet-todo.test).

- Start Vite dev server (for React/TS):
```
npm run dev
```

Build for production (optional):
```
npm run build
```

## 5) Email testing
- Default MAIL_MAILER=log writes emails to storage/logs/laravel.log
- For local inbox testing, run Mailpit and configure .env:
```
MAIL_MAILER=smtp
MAIL_HOST=127.0.0.1
MAIL_PORT=1025  # or 2525 depending on your tool
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="no-reply@example.test"
MAIL_FROM_NAME="${APP_NAME}"
```

## 6) Third-party integrations
- WorkOS:
  - Set WORKOS_CLIENT_ID, WORKOS_API_KEY, and WORKOS_REDIRECT_URL to match your local APP_URL if you’re testing SSO.
  - Example: WORKOS_REDIRECT_URL="http://localhost:8000/authenticate"
- SendGrid:
  - Set MAIL settings appropriately if sending real emails.
  - Keep SENDGRID or similar API keys out of the repo; use your local .env.
- AWS (S3):
  - If you use S3 for file storage, provide AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_DEFAULT_REGION, and AWS_BUCKET.

## Scripts reference
From package.json:
- npm run dev — start Vite dev server
- npm run build — production build
- npm run build:ssr — multi-build including SSR bundle (if used)
- npm run lint — ESLint fix
- npm run format — Prettier format resources/

## Troubleshooting
- 500 or APP_KEY related errors: run php artisan key:generate
- Class cache/config issues after changing env: run php artisan config:clear && php artisan cache:clear && php artisan route:clear && php artisan view:clear
- Vite not connecting: ensure npm run dev is running and that your browser is loading the correct host/port; check vite.config.ts for custom settings.
- DB connection refused: verify your DB_* settings or use SQLite for simplicity.

## Security
- Do not commit .env. The repository already ignores it by default (.gitignore).
- Rotate any accidentally exposed credentials immediately.

## License
This project is proprietary to its owners unless otherwise stated.

import { env } from 'cloudflare:workers';
import { api } from '@/server/api';

// One catch-all route handler hands every /api/* request to Hono, with the Worker's bindings.
const handle = (request: Request) => api.fetch(request, env);

export const GET = handle;
export const POST = handle;

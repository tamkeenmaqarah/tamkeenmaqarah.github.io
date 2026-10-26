import {env} from 'cloudflare:workers';
import {NextResponse} from 'next/server';
import {createQuranClient} from '../../../lib/quran-content.mjs';
import {allowedPublicOrigin, publicCors, publicPreflight} from '../../public-cors';

let client: ReturnType<typeof createQuranClient> | undefined;
export function OPTIONS(req: Request) { return publicPreflight(req, 'GET'); }
export async function GET(req: Request) {
  const respond = (body: unknown, status = 200) => publicCors(req, NextResponse.json(body, {status, headers: {'Cache-Control': status === 200 ? 'public, max-age=3600' : 'no-store'}}), 'GET');
  if (!allowedPublicOrigin(req)) return respond({error: 'Invalid origin'}, 403);
  const params = new URL(req.url).searchParams;
  const surah = params.get('surah');
  if ([...params.keys()].some(key => key !== 'surah') || params.getAll('surah').length > 1 || (surah !== null && (!/^[1-9]\d{0,2}$/.test(surah) || Number(surah) > 114))) return respond({error: 'Choose a surah from 1 to 114.'}, 400);
  if (!env.QURAN_CLIENT_ID || !env.QURAN_CLIENT_SECRET) return respond({error: 'Qur’an is unavailable right now. Please try again.'}, 503);
  try {
    client ??= createQuranClient(env.QURAN_CLIENT_ID, env.QURAN_CLIENT_SECRET);
    const data = surah === null ? await client.chapters() : await client.chapter(Number(surah));
    return respond({code: 200, data});
  } catch {
    return respond({error: 'Qur’an is unavailable right now. Please try again.'}, 502);
  }
}

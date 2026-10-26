import {db} from './server';
export async function profileFor(id: string) {
 const row: any = await db().prepare('SELECT name,avatar,avatar_source,google_picture FROM students WHERE id=?').bind(id).first();
 if (!row) return null;
 return {name: row.name, photoSource: row.avatar_source, photo: row.avatar_source === 'upload' ? row.avatar : row.avatar_source === 'google' ? row.google_picture : null, googlePicture: row.google_picture || null};
}
export async function saveProfile(id: string, source: string, photo: string | null) {
 await db().prepare('UPDATE students SET avatar=?,avatar_source=? WHERE id=?').bind(source === 'upload' ? photo : null, source, id).run();
 return profileFor(id);
}

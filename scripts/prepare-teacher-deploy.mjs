// Point the built worker at a real Cloudflare D1 database.
// ChatGPT Sites fills this in during its own publish. A direct deploy must set it here.
import fs from 'node:fs';

const placeholder = '00000000-0000-4000-8000-000000000000';
const id = process.env.TAMKEEN_D1_DATABASE_ID || '';
const file = process.argv[2] || 'dist/server/wrangler.json';
if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id) || id === placeholder) {
  console.error('Set TAMKEEN_D1_DATABASE_ID to the id from: npx wrangler d1 create tamkeen-maqraah');
  process.exit(1);
}
const json = JSON.parse(fs.readFileSync(file, 'utf8'));
json.name = 'tamkeen-maqraah-teacher';
const visit = node => {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) {
    node.forEach(visit);
    return;
  }
  if (node.database_id === placeholder) node.database_id = id;
  if (node.database_name === 'site-creator-d1') node.database_name = 'tamkeen-maqraah';
  if (node.binding === 'DB' && node.database_name === 'tamkeen-maqraah') node.migrations_dir = 'drizzle';
  Object.values(node).forEach(visit);
};
visit(json);
fs.writeFileSync(file, JSON.stringify(json, null, 2) + '\n');
console.log('Teacher worker will deploy as tamkeen-maqraah-teacher with D1 tamkeen-maqraah.');

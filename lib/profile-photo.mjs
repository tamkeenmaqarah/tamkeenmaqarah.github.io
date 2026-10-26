export function validUpload(value) {
  if (typeof value !== 'string' || value.length > 120000 || !/^data:image\/jpeg;base64,[A-Za-z0-9+/]+={0,2}$/.test(value)) return false;
  try {
    const raw = atob(value.slice(23));
    return raw.length >= 100 && raw.length <= 90000 && btoa(raw) === value.slice(23) && raw.charCodeAt(0) === 255 && raw.charCodeAt(1) === 216 && raw.charCodeAt(2) === 255 && raw.charCodeAt(raw.length - 2) === 255 && raw.charCodeAt(raw.length - 1) === 217;
  } catch { return false; }
}
export function validProfileChange(body) {
  if (!body || !['upload', 'google', 'none'].includes(body.source)) return false;
  return body.source === 'upload' ? validUpload(body.photo) : body.photo == null;
}

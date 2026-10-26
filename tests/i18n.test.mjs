import test from 'node:test';
import assert from 'node:assert/strict';

const values = new Map();
globalThis.localStorage = {getItem: key => values.get(key), setItem: (key, value) => values.set(key, value)};
globalThis.document = {documentElement: {lang:'',dir:''}, title:''};
const {t, setLanguage, getLanguage, subscribeLanguage} = await import('../i18n.js');

test('switches language and document direction, preserves message parameters, and persists preference', () => {
  assert.equal(t('Weekly quiz'), 'Weekly quiz');
  let updates = 0;
  const unsubscribe = subscribeLanguage(() => updates++);
  setLanguage('ar');
  assert.equal(getLanguage(), 'ar');
  assert.equal(document.documentElement.dir, 'rtl');
  assert.equal(document.documentElement.lang, 'ar');
  assert.equal(t('Weekly quiz'), 'الاختبار الأسبوعي');
  assert.equal(t('{name}, your result has been saved.', {name:'أحمد'}), 'يا أحمد، حُفظت نتيجتك.');
  assert.equal(values.get('tamkeen-language'), 'ar');
  assert.equal(t('Authored quiz content'), 'Authored quiz content');
  setLanguage('invalid');
  assert.equal(getLanguage(), 'ar');
  setLanguage('ar');
  assert.equal(updates, 1);
  unsubscribe();
  setLanguage('en');
  assert.equal(document.documentElement.dir, 'ltr');
  assert.equal(t('Weekly quiz'), 'Weekly quiz');
  assert.equal(updates, 1);
});

test('language switching still works when storage is blocked', () => {
  globalThis.localStorage.setItem = () => { throw new Error('Storage blocked'); };
  assert.doesNotThrow(() => setLanguage('ar'));
  assert.equal(document.documentElement.dir, 'rtl');
  setLanguage('en');
});

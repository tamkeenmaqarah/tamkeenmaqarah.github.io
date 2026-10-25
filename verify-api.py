import urllib.request,urllib.error,json
BASE='http://127.0.0.1:5173'
def req(path,method='GET',data=None,teacher=False):
 headers={'Content-Type':'application/json','Origin':BASE}
 if teacher:headers['Cookie']='tamkeen-teacher=local-preview-only'
 request=urllib.request.Request(BASE+path,data=json.dumps(data).encode() if data is not None else None,headers=headers,method=method)
 try:
  with urllib.request.urlopen(request) as r:return r.status,json.load(r)
 except urllib.error.HTTPError as e:return e.code,json.load(e)
code,public=req('/api/data');assert code==200 and not public['teacher'] and public['records']==[] and public['moments']==[] and public['submissions']==[]
assert all('correct' not in question and 'explanation' not in question for quiz in public['quizzes'] for question in quiz['questions'])
assert req('/api/moments','POST',{},False)[0]==403
assert req('/api/moments','DELETE',{'id':'first-arak-moment'},False)[0]==403
assert req('/api/moments','POST',{'name':'incomplete'},True)[0]==400
payload={'name':'Temporary API QA','question':'Test question','chosen':'A','correct':'B','caption':'A temporary test, removed immediately.'}
assert req('/api/moments','POST',payload,True)[0]==200
code,private=req('/api/data',teacher=True);assert private['teacher'] and len(private['records'])==6
new=next(m for m in private['moments'] if m['name']==payload['name']);assert new['chosen']=='A' and new['correct']=='B'
assert req('/api/moments','DELETE',{'id':new['id']},True)[0]==200
_,restored=req('/api/data',teacher=True);assert not any(m['id']==new['id'] for m in restored['moments'])
assert any(m['id']=='first-arak-moment' and m['name']=='Hassuna' for m in restored['moments'])
assert sorted(r['regular']+r['bonus'] for r in restored['records'])==[4,5,8,8,10,11]
print('PASS: anonymous privacy, private answer keys, blocked moment writes/deletes, input validation, moment create/read/delete, seeded anecdote, preserved original scores.')

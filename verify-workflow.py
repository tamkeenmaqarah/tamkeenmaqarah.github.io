"""Local-only API integration checks; never point this script at production."""
import json, urllib.request, urllib.error, uuid
BASE='http://127.0.0.1:5173'
def req(path, method='GET', data=None, teacher=True, origin=BASE):
    headers={'Content-Type':'application/json','Origin':origin}
    if teacher: headers['Cookie']='tamkeen-teacher=local-preview-only'
    request=urllib.request.Request(BASE+path, data=json.dumps(data).encode() if data is not None else None, headers=headers, method=method)
    try:
        with urllib.request.urlopen(request) as r: return r.status,json.load(r)
    except urllib.error.HTTPError as e:
        raw=e.read().decode()
        try: body=json.loads(raw)
        except ValueError: body={'error':raw}
        return e.code,body

_, original=req('/api/data')
assert original['teacher'] and original['aiConfigured'] is False
assert req('/api/ai','POST',{'kind':'quiz'},False)[0]==403
assert req('/api/ai','POST',{'kind':'quiz'})[0]==503
assert req('/api/ai','POST',{'kind':'quiz'},origin='https://other.example')[0]==403
assert req('/api/records','POST',{'records':original['records']},False)[0]==403
changed=json.loads(json.dumps(original['records']))
changed[0]['regular']=max(0,changed[0]['regular']-1)
try:
    assert req('/api/records','POST',{'records':changed})[0]==200
    _, saved=req('/api/data')
    assert next(r for r in saved['records'] if r['id']==changed[0]['id'])['regular']==changed[0]['regular']
    invalid=json.loads(json.dumps(changed)); invalid[1]['regular']=99
    assert req('/api/records','POST',{'records':invalid})[0]==400
    _, unchanged=req('/api/data')
    assert sorted(unchanged['records'],key=lambda r:r['id'])==sorted(saved['records'],key=lambda r:r['id'])
finally:
    assert req('/api/records','POST',{'records':original['records']})[0]==200

quiz={'title':'Local workflow QA '+str(uuid.uuid4()),'description':'Temporary local test fixture','questions':[{'prompt':'Choose the approved answer','options':['Approved','Near miss one','Near miss two','Near miss three'],'correct':0,'explanation':'Only the approved option earns a point.'}],'published':False}
status, created=req('/api/quizzes','POST',quiz); assert status==200
qid=created['id']
quiz['title']+=' edited'
assert req('/api/quizzes','PATCH',{**quiz,'id':qid})[0]==200
_, saved=req('/api/data')
assert next(q for q in saved['quizzes'] if q['id']==qid)['title']==quiz['title']
assert req('/api/quizzes','PATCH',{'id':qid,'published':True})[0]==200
assert req('/api/quizzes','PATCH',{**quiz,'id':qid})[0]==409
_, public=req('/api/data',teacher=False)
question=next(q for q in public['quizzes'] if q['id']==qid)['questions'][0]
assert set(question)=={'prompt','options'}
attempt=str(uuid.uuid4())
submission={'quizId':qid,'name':'Temporary local learner','answers':[0],'attemptId':attempt}
assert req('/api/submit','POST',{**submission,'answers':[]},False)[0]==400
status,result=req('/api/submit','POST',submission,False)
assert status==200 and result['score']==1 and result['max']==1 and result['review'][0]['right']
status,again=req('/api/submit','POST',submission,False)
assert status==200 and again['alreadySubmitted']
assert req('/api/quizzes','PATCH',{'id':qid,'published':False})[0]==200
assert req('/api/quizzes','PATCH',{**quiz,'id':qid})[0]==409
assert req('/api/submit','POST',{**submission,'attemptId':str(uuid.uuid4())},False)[0]==404
_, final=req('/api/data')
assert sorted(final['records'],key=lambda r:r['id'])==sorted(original['records'],key=lambda r:r['id'])
assert sum(s['id']==attempt for s in final['submissions'])==1
print('PASS: atomic bulk grades (restored), draft editing, frozen submitted quizzes, immediate MCQ grading, retry idempotency, closed quiz protection, AI authentication and missing-key state. Temporary test quiz remains closed in the local database only.')

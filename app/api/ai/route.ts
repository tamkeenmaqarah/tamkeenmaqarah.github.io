import {NextResponse} from 'next/server';
import {isTeacher,sameOrigin} from '../../server';
import {AIError,configured,draftQuiz,highlight} from '../../ai';
export async function POST(req:Request){
 if(!sameOrigin(req)||!await isTeacher())return NextResponse.json({error:'Teacher access required'},{status:403});
 try{
  if(!configured())throw new AIError('Gemini is not connected. Add the server API key before generating a quiz or caption.',503);
  if(Number(req.headers.get('content-length'))>150000)throw new AIError('The lesson input is too large.',413);
  const body:any=await req.json();
  if(body.kind==='quiz')return NextResponse.json(await draftQuiz(body));
  if(body.kind==='highlight')return NextResponse.json(await highlight(body));
  throw new AIError('Choose quiz drafting or a funny-answer suggestion.');
 }catch(e){if(e instanceof AIError)return NextResponse.json({error:e.message},{status:e.status});return NextResponse.json({error:'AI generation failed. Your input is still here; please try again.'},{status:500})}
}

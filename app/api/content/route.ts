import { NextRequest, NextResponse } from 'next/server';
import { addBlogPost, addProject, getContent, updateAbout } from '../../../lib/db';

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const action = body?.action;

  if (!action) {
    return NextResponse.json({ error: 'Missing action' }, { status: 400 });
  }

  switch (action) {
    case 'blog': {
      const post = body.payload;
      if (!post?.id || !post?.title || !post?.content) {
        return NextResponse.json({ error: 'Missing blog fields' }, { status: 400 });
      }
      const content = await addBlogPost(post);
      return NextResponse.json(content);
    }

    case 'project': {
      const project = body.payload;
      if (!project?.id || !project?.title || !project?.description || !project?.link) {
        return NextResponse.json({ error: 'Missing project fields' }, { status: 400 });
      }
      const content = await addProject(project);
      return NextResponse.json(content);
    }

    case 'about': {
      const about = body.payload?.about;
      if (typeof about !== 'string') {
        return NextResponse.json({ error: 'Missing about text' }, { status: 400 });
      }
      const content = await updateAbout(about);
      return NextResponse.json(content);
    }

    default:
      return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
  }
}

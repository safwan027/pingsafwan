import { NextRequest, NextResponse } from 'next/server';
import { addBlogPost, addProject, getContent, updateAbout } from '../../../lib/db';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const authCookie = cookieStore.get('admin_auth');

  if (!authCookie || !authCookie.value) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: isValid, error } = await supabaseAdmin
    .rpc('verify_admin_password', { entered_password: authCookie.value });

  if (error || !isValid) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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

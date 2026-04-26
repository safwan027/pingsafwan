import { createClient } from '@supabase/supabase-js';


export interface BlogPost {
  id: string;
  title: string;
  content: string;
  tag?: string;
  date?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
}

export interface ContentData {
  about: string;
  blog: BlogPost[];
  projects: Project[];
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;


if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing Supabase environment variables: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
  global: { fetch },
});

const BLOG_TABLE = 'blog_posts';
const PROJECT_TABLE = 'projects';
const SETTINGS_TABLE = 'settings';

async function getAboutText(): Promise<string> {
  const { data, error } = await supabase
    .from(SETTINGS_TABLE)
    .select('value')
    .eq('type', 'about')
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to load about text: ${error.message}`);
  }

  return data?.value ?? '';
}

async function fetchBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from(BLOG_TABLE)
    .select('id,title,content,tag,date')
    .order('date', { ascending: false });

  if (error) {
    throw new Error(`Failed to load blog posts: ${error.message}`);
  }

  return (data as BlogPost[]) ?? [];
}

async function fetchProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from(PROJECT_TABLE)
    .select('id,title,description,link');

  if (error) {
    throw new Error(`Failed to load projects: ${error.message}`);
  }

  return (data as Project[]) ?? [];
}

export async function getContent(): Promise<ContentData> {
  const [about, blog, projects] = await Promise.all([
    getAboutText(),
    fetchBlogPosts(),
    fetchProjects(),
  ]);
  //console.log('Fetched content:', { about, blog, projects });
  return { about, blog, projects };
}

export async function addBlogPost(post: BlogPost): Promise<ContentData> {
  const { error } = await supabase.from(BLOG_TABLE).insert(post);
  if (error) {
    throw new Error(`Failed to save blog post: ${error.message}`);
  }
  return getContent();
}

export async function addProject(project: Project): Promise<ContentData> {
  const { error } = await supabase.from(PROJECT_TABLE).insert(project);
  if (error) {
    throw new Error(`Failed to save project: ${error.message}`);
  }
  return getContent();
}

export async function updateAbout(about: string): Promise<ContentData> {
  const { error } = await supabase
    .from(SETTINGS_TABLE)
    .upsert({ type: 'about', value: about }, { onConflict: 'type' });

  if (error) {
    throw new Error(`Failed to save about text: ${error.message}`);
  }

  return getContent();
}

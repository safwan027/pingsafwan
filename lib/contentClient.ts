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

async function apiFetch(path: string, options?: RequestInit) {

  const res = await fetch(path, {
    cache: 'no-store',
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function fetchContent(): Promise<ContentData> {
  return apiFetch('/api/content');
}

export async function saveBlogPost(post: BlogPost): Promise<ContentData> {
  return apiFetch('/api/content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'blog', payload: post }),
  });
}

export async function saveProject(project: Project): Promise<ContentData> {
  return apiFetch('/api/content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'project', payload: project }),
  });
}

export async function saveAbout(about: string): Promise<ContentData> {
  return apiFetch('/api/content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'about', payload: { about } }),
  });
}

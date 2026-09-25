import { readFileSync, rmSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const postsListPath = join(root, 'src/posts-list.ts');

// draft: true must stay the first field of the post object.
function draftEntryPattern() {
  return /\{\s*draft:\s*true,[\s\S]*?fileName:\s*['"]([^'"]+)['"][\s\S]*?\},/g;
}

export function stripDraftEntries(source) {
  return source.replace(draftEntryPattern(), '');
}

export function draftFileNames(source) {
  const names = [];
  for (const match of source.matchAll(draftEntryPattern())) {
    names.push(match[1]);
  }
  return names;
}

export function stripDraftPostsPlugin() {
  return {
    name: 'strip-draft-posts',
    apply: 'build',
    transform(code, id) {
      const filePath = id.split('?')[0];
      if (!filePath.endsWith('/src/posts-list.ts')) {
        return null;
      }

      const stripped = stripDraftEntries(code);

      if (stripped.includes('draft:')) {
        throw new Error('strip-draft-posts left a draft entry in posts-list.ts');
      }

      return {
        code: stripped,
        map: null
      };
    }
  };
}

function removeDraftsFromBuild() {
  const source = readFileSync(postsListPath, 'utf8');
  const names = draftFileNames(source);
  const buildDir = join(root, 'build');

  for (const name of names) {
    rmSync(join(buildDir, 'posts-markdown', `${name}.md`), { force: true });
    rmSync(join(buildDir, name), { recursive: true, force: true });
    rmSync(join(buildDir, `${name}.html`), { force: true });
    console.log(`stripped unpublished post from build: ${name}`);
  }
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];

if (isDirectRun) {
  removeDraftsFromBuild();
}

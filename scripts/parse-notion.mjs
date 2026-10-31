import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/notion-data.json', 'utf8'));

const colObj = data.recordMap?.collection;
const collection = Object.values(colObj)[0]?.value?.value;
const schema = collection?.schema || {};
const deletedSchema = collection?.deleted_schema || {};
const allSchema = { ...deletedSchema, ...schema };

const blocks = data.recordMap?.block || {};
const games = [];

for (const [blockId, blockWrapper] of Object.entries(blocks)) {
  const block = blockWrapper?.value?.value || blockWrapper?.value;
  if (!block || block.type !== 'page') continue;
  
  const props = block.properties || {};
  if (!props.title) continue;
  
  const title = props.title.map(x => x[0]).join('').trim();
  if (!title) continue;
  
  const getPropVal = (key) => {
    if (!props[key]) return null;
    return props[key].map(x => x[0]).join('').trim();
  };
  
  const game = {
    id: block.id,
    title,
    category: getPropVal('_d=Y'),
    difficulty: getPropVal(':FVN'),
    players: getPropVal('=nf}'),
    playtime: getPropVal('SFG?'),
    description: getPropVal('Byj='),
    greatFor2p: getPropVal('CpdN') === 'Yes',
    detailUrl: getPropVal('tti;'),
    cover: block.format?.page_cover || null
  };
  
  games.push(game);
}

// Sort alphabetically by title
games.sort((a, b) => a.title.localeCompare(b.title));

console.log('Total games extracted from Notion:', games.length);
fs.writeFileSync('scripts/extracted-games.json', JSON.stringify(games, null, 2));

console.log('First 15 games:');
games.slice(0, 15).forEach((g, i) => {
  console.log(`${i + 1}. ${g.title} | Cat: ${g.category || '-'} | Diff: ${g.difficulty || '-'} | Players: ${g.players || '-'} | Time: ${g.playtime ? g.playtime + 'm' : '-'}`);
});

// Category stats
const categories = {};
games.forEach(g => {
  (g.category || 'Uncategorized').split(',').forEach(c => {
    const trimmed = c.trim();
    categories[trimmed] = (categories[trimmed] || 0) + 1;
  });
});
console.log('\nCategories breakdown:', categories);

// Difficulty stats
const difficulties = {};
games.forEach(g => {
  const diff = g.difficulty || 'Unspecified';
  difficulties[diff] = (difficulties[diff] || 0) + 1;
});
console.log('\nDifficulty breakdown:', difficulties);

import fs from 'fs';

async function run() {
  const pageId = '1b410a30-ddff-80fb-a550-ce1ed135e65b';
  
  // 1. Get collection ID and schema
  const apiRes = await fetch('https://www.notion.so/api/v3/loadCachedPageChunk', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    },
    body: JSON.stringify({
      page: { id: pageId },
      limit: 100,
      cursor: { stack: [] },
      chunkNumber: 0,
      verticalColumns: false
    })
  });
  
  const chunkData = await apiRes.json();
  const recordMap = chunkData.recordMap;
  
  const collectionId = Object.keys(recordMap.collection || {})[0];
  const collectionViewId = Object.keys(recordMap.collection_view || {})[0];
  
  console.log('Collection ID:', collectionId);
  console.log('Collection View ID:', collectionViewId);
  
  const collection = recordMap.collection[collectionId]?.value;
  console.log('Collection Name:', JSON.stringify(collection?.name));
  console.log('Collection Schema Properties:');
  const schema = collection?.schema || {};
  for (const [key, prop] of Object.entries(schema)) {
    console.log(` - [${key}] ${prop.name} (${prop.type})`);
  }
  
  // 2. Query collection to fetch all rows
  const queryRes = await fetch('https://www.notion.so/api/v3/queryCollection', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    },
    body: JSON.stringify({
      collection: { id: collectionId },
      collectionView: { id: collectionViewId },
      loader: {
        type: 'reducer',
        reducers: {
          collection_group_results: {
            type: 'results',
            limit: 500
          }
        },
        searchQuery: '',
        userTimeZone: 'Asia/Jakarta'
      }
    })
  });
  
  console.log('queryCollection status:', queryRes.status);
  if (queryRes.ok) {
    const queryData = await queryRes.json();
    fs.writeFileSync('scripts/notion-data.json', JSON.stringify(queryData, null, 2));
    
    const blocks = queryData.recordMap?.block || {};
    console.log('Total blocks returned in query:', Object.keys(blocks).length);
    
    // Parse games
    const games = [];
    for (const [blockId, blockWrapper] of Object.entries(blocks)) {
      const block = blockWrapper.value;
      if (block?.type === 'page' && block.parent_id === collectionId) {
        const properties = block.properties || {};
        const parsed = { id: block.id };
        
        for (const [propKey, propVal] of Object.entries(properties)) {
          const propDef = schema[propKey];
          const propName = propDef ? propDef.name : propKey;
          // extract text from notion formatting array [[text]]
          const textVal = propVal.map(item => item[0]).join('');
          parsed[propName] = textVal;
        }
        games.push(parsed);
      }
    }
    
    console.log('Total games parsed:', games.length);
    console.log('Sample game:', JSON.stringify(games[0], null, 2));
    fs.writeFileSync('scripts/parsed-games.json', JSON.stringify(games, null, 2));
  } else {
    console.log('queryCollection failed:', await queryRes.text());
  }
}

run().catch(console.error);

const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async () => {
try {
// List all files in the 'public' folder of the 'gallery-images' bucket
const { data, error } = await supabase.storage
.from('gallery-images')
.list('public', { limit: 100 });

if (error) {
console.log('Supabase fetch error:', error);
throw error;
}

if (!data || data.length === 0) {
console.log('No files found in Supabase bucket');
return {
statusCode: 200,
headers: {
'Access-Control-Allow-Origin': '*'
},
body: JSON.stringify([])
};
}

console.log('Fetched files from Supabase:', data);

const photos = data.map(file => {
const { data: publicUrlData } = supabase.storage
.from('gallery-images')
.getPublicUrl(`public/${file.name}`);
return {
url: publicUrlData.publicUrl,
filePath: `public/${file.name}`
};
});

console.log('Photos to return:', photos);

return {
statusCode: 200,
headers: {
'Access-Control-Allow-Origin': '*'
},
body: JSON.stringify(photos)
};
} catch (error) {
console.error('Error in fetch-photos:', error);
return {
statusCode: 500,
headers: {
'Access-Control-Allow-Origin': '*'
},
body: JSON.stringify({ error: 'Failed to fetch photos' })
};
}
};


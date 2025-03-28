const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event) => {
if (event.httpMethod !== 'POST') {
return { statusCode: 405, body: 'Method Not Allowed' };
}

try {
const { filePath } = JSON.parse(event.body);
if (!filePath) {
return { statusCode: 400, body: JSON.stringify({ error: 'File path is required' }) };
}

const { error } = await supabase.storage
.from('gallery-images')
.remove([filePath]);

if (error) throw error;

return {
statusCode: 200,
headers: {
'Access-Control-Allow-Origin': '*',
'Access-Control-Allow-Methods': 'POST',
'Access-Control-Allow-Headers': 'Content-Type'
},
body: JSON.stringify({ success: true })
};
} catch (error) {
console.error('Error:', error);
return {
statusCode: 500,
headers: {
'Access-Control-Allow-Origin': '*'
},
body: JSON.stringify({ error: 'Failed to delete photo' })
};
}
};

const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event) => {
if (event.httpMethod !== 'POST') {
return { statusCode: 405, body: 'Method Not Allowed' };
}

try {
const formData = await parseMultipartForm(event);
const file = formData.files.photo;

const filePath = `public/${Date.now()}-${file.filename}`;
const { data, error } = await supabase.storage
.from('gallery-images')
.upload(filePath, file.content, {
contentType: file.contentType
});

if (error) throw error;

const { publicURL } = supabase.storage
.from('gallery-images')
.getPublicUrl(filePath);

return {
statusCode: 200,
headers: {
'Access-Control-Allow-Origin': '*',
'Access-Control-Allow-Methods': 'POST',
'Access-Control-Allow-Headers': 'Content-Type'
},
body: JSON.stringify({ url: publicURL, filePath })
};
} catch (error) {
console.error('Error:', error);
return {
statusCode: 500,
headers: {
'Access-Control-Allow-Origin': '*'
},
body: JSON.stringify({ error: 'Failed to upload photo' })
};
}
};

const parseMultipartForm = async (event) => {
const contentType = event.headers['content-type'];
const boundary = contentType.split('boundary=')[1];
const parts = event.body.split(`--${boundary}`);
const files = {};

for (const part of parts) {
if (part.includes('Content-Disposition')) {
const nameMatch = part.match(/name="([^"]+)"/);
const filenameMatch = part.match(/filename="([^"]+)"/);
const contentTypeMatch = part.match(/Content-Type: ([\w\/]+)/);
const content = part.split('\r\n\r\n')[1]?.split('\r\n--')[0];

if (nameMatch && content) {
files[nameMatch[1]] = {
filename: filenameMatch ? filenameMatch[1] : null,
contentType: contentTypeMatch ? contentTypeMatch[1] : null,
content: Buffer.from(content, 'base64')
};
}
}
}

return { files };
};

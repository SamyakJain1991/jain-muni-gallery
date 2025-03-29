const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event) => {
console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY);

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
console.log('Raw form data:', event.body);
console.log('Headers:', event.headers);

if (!contentType || !contentType.includes('multipart/form-data')) {
throw new Error('Invalid content type, expected multipart/form-data');
}

const boundary = contentType.split('boundary=')[1];
if (!boundary) {
throw new Error('Boundary not found in content-type');
}

// Decode base64-encoded body
const decodedBody = Buffer.from(event.body, 'base64').toString('utf-8');
console.log('Decoded form data:', decodedBody);

const parts = decodedBody.split(`--${boundary}`);
const files = {};

for (const part of parts) {
if (part.includes('Content-Disposition')) {
const nameMatch = part.match(/name="([^"]+)"/);
const filenameMatch = part.match(/filename="([^"]+)"/);
const contentTypeMatch = part.match(/Content-Type: ([\w\/]+)/);
const contentStart = part.indexOf('\r\n\r\n') + 4;
const contentEnd = part.lastIndexOf('\r\n--');
const content = part.substring(contentStart, contentEnd);

if (nameMatch && content) {
files[nameMatch[1]] = {
filename: filenameMatch ? filenameMatch[1] : null,
contentType: contentTypeMatch ? contentTypeMatch[1] : null,
content: Buffer.from(content, 'base64')
};
}
}
}

if (!files.photo) {
throw new Error('No file found in form data');
}

return { files };
};

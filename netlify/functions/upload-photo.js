

const { createClient } = require('@supabase/supabase-js');
const { parseMultipartFormData } = require('@netlify/functions');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
try {
// Parse multipart form data
const { fields, files } = await parseMultipartFormData(event);
const file = files.photo;

if (!file) {
console.error('No file uploaded');
return {
statusCode: 400,
body: JSON.stringify({ error: 'No file uploaded' }),
};
}

console.log('File received:', file.originalFilename, 'Size:', file.size);

// Generate a unique filename
const fileExt = file.originalFilename.split('.').pop();
const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;

// Upload to Supabase
const { data, error } = await supabase.storage
.from('gallery')
.upload(fileName, file.buffer, {
contentType: file.mimetype,
});

if (error) {
console.error('Error uploading file to Supabase:', error);
return {
statusCode: 500,
body: JSON.stringify({ error: 'Failed to upload photo' }),
};
}

const { publicUrl } = supabase.storage.from('gallery').getPublicUrl(fileName).data;

console.log('Uploaded photo URL:', publicUrl);

return {
statusCode: 200,
body: JSON.stringify({
url: publicUrl,
filePath: fileName,
}),
};
} catch (error) {
console.error('Error in upload-photo:', error);
return {
statusCode: 500,
body: JSON.stringify({ error: 'Internal server error' }),
};
}
};


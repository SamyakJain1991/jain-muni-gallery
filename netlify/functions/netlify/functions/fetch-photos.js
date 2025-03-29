const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
try {
const { data, error } = await supabase.storage
.from('gallery') // तेरा बकेट नाम
.list('', { limit: 100 });

if (error) {
console.error('Error fetching photos:', error);
return {
statusCode: 500,
body: JSON.stringify({ error: 'Failed to fetch photos' }),
};
}

// फाइल्स की लिस्ट से पब्लिक URLs जेनरेट करो
const photos = data
.filter(file => file.name !== '.') // डिफॉल्ट . फाइल को इग्नोर करो
.map(file => {
const { publicUrl } = supabase.storage
.from('gallery')
.getPublicUrl(file.name).data;
return {
url: publicUrl,
filePath: file.name,
};
});

return {
statusCode: 200,
body: JSON.stringify(photos),
};
} catch (error) {
console.error('Error in fetch-photos:', error);
return {
statusCode: 500,
body: JSON.stringify({ error: 'Internal server error' }),
};
}
};

exports.handler = async function (event, context) {
  const githubToken = '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'; // Yahan wahi token daal jo curl mein kaam kar raha tha
  const repoOwner = 'SamyakJain1991';
  const repoName = 'jain-muni-gallery';
  const filePath = 'events.json';

  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${githubToken}`,
      Accept: 'application/vnd.github.v3+json'
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log('GitHub API Error:', errorData);
    return {
      statusCode: response.status,
      body: JSON.stringify({ error: 'GitHub API request failed', details: errorData })
    };
  }

  const data = await response.json();
  const content = Buffer.from(data.content, 'base64').toString('utf8');

  return {
    statusCode: 200,
    body: content
  };
};

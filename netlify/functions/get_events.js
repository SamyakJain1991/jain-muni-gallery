exports.handler = async function (event, context) {
  const githubToken = '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';
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
  const data = await response.json();
  const content = Buffer.from(data.content, 'base64').toString('utf8');

  return {
    statusCode: 200,
    body: content
  };
};

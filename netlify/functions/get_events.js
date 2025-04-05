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

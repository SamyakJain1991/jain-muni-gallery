exports.handler = async function (event, context) {
  const githubToken = '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';
  const repoOwner = 'SamyakJain1991';
  const repoName = 'jain-muni-gallery';
  const filePath = 'events.json';

  const response = await fetch(
    https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath},
    {
      headers: {
        Authorization: token ${githubToken},
        Accept: 'application/vnd.github.v3+json'
      }
    }
  );
  const data = await response.json();
  const content = Buffer.from(data.content, 'base64').toString('utf8');

  return {
    statusCode: 200,
    body: content
  };
};

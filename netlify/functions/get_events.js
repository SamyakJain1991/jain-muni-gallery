const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const githubToken = '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'; // Replace with your GitHub Personal Access Token
  const repoOwner = 'SamyakJain1991'; // Replace with your GitHub username
  const repoName = 'jain-muni-gallery'; // Your repo name
  const filePath = 'events.json';

  const response = await fetch(
    https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath},
    {
      headers: {
        Authorization: token ${githubToken},
        Accept: 'application/vnd.github.v3+json'
      },
    }
  );
  const data = await response.json();
  const content = Buffer.from(data.content, 'base64').toString('utf8');

  return {
    statusCode: 200,
    body: content
  };
};

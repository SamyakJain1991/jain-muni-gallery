const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const githubToken = 'YOUR_GITHUB_TOKEN'; // Replace with your GitHub Personal Access Token
  const repoOwner = 'YOUR_GITHUB_USERNAME'; // Replace with your GitHub username
  const repoName = 'YOUR_REPO_NAME'; // Replace with your repo name
  const filePath = 'events.json';

  const response = await fetch(
    https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath},
    {
      headers: {
        Authorization: token ${githubToken},
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );
  const data = await response.json();
  const content = Buffer.from(data.content, 'base64').toString('utf8');

  return {
    statusCode: 200,
    body: content,
  };
};

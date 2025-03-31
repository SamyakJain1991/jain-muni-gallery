const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const githubToken = 'YOUR_GITHUB_TOKEN'; // Replace with your GitHub Personal Access Token
  const repoOwner = 'YOUR_GITHUB_USERNAME'; // Replace with your GitHub username
  const repoName = 'YOUR_REPO_NAME'; // Replace with your repo name
  const filePath = 'events.json';

  // Get current events.json content
  const getResponse = await fetch(
    https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath},
    {
      headers: {
        Authorization: token ${githubToken},
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );
  const getData = await getResponse.json();
  const currentContent = Buffer.from(getData.content, 'base64').toString('utf8');
  const events = JSON.parse(currentContent);

  // Add new event
  const newEvent = JSON.parse(event.body);
  events.push(newEvent);

  // Update events.json on GitHub
  const updateResponse = await fetch(
    https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath},
    {
      method: 'PUT',
      headers: {
        Authorization: token ${githubToken},
        Accept: 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        message: 'Update events.json',
        content: Buffer.from(JSON.stringify(events)).toString('base64'),
        sha: getData.sha,
      }),
    }
  );

  return {
    statusCode: 200,
    body: 'Event Updated Successfully!',
  };
};

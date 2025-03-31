const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const githubToken = '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';
  const repoOwner = 'SamyakJain1991';
  const repoName = 'jain-muni-gallery';
  const filePath = 'events.json';

  const getResponse = await fetch(
    https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath},
    {
      headers: {
        Authorization: token ${githubToken},
        Accept: 'application/vnd.github.v3+json'
      }
    }
  );
  const getData = await getResponse.json();
  const currentContent = Buffer.from(getData.content, 'base64').toString('utf8');
  const events = JSON.parse(currentContent);

  const newEvent = JSON.parse(event.body);
  events.push(newEvent);

  const updateResponse = await fetch(
    https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath},
    {
      method: 'PUT',
      headers: {
        Authorization: token ${githubToken},
        Accept: 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: 'Update events.json',
        content: Buffer.from(JSON.stringify(events)).toString('base64'),
        sha: getData.sha
      })
    }
  );

  return {
    statusCode: 200,
    body: 'Event Updated Successfully!'
  };
};

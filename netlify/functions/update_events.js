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

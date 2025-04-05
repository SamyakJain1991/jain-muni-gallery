exports.handler = async function (event, context) {
  const githubToken = process.env.GITHUB_TOKEN; // Environment variable se token fetch karo
  const repoOwner = 'SamyakJain1991';
  const repoName = 'jain-muni-gallery';
  const filePath = 'events.json';

  if (!githubToken) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'GitHub token not found in environment variables' })
    };
  }

  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
  const getResponse = await fetch(url, {
    headers: {
      Authorization: `token ${githubToken}`,
      Accept: 'application/vnd.github.v3+json'
    }
  });

  if (!getResponse.ok) {
    const errorData = await getResponse.json();
    console.log('GitHub API Error:', errorData);
    return {
      statusCode: getResponse.status,
      body: JSON.stringify({ error: 'GitHub API request failed', details: errorData })
    };
  }

  const getData = await getResponse.json();
  console.log('GitHub API Response:', getData);

  if (!getData.content) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Content not found in GitHub API response', response: getData })
    };
  }

  const currentContent = Buffer.from(getData.content, 'base64').toString('utf8');
  const events = JSON.parse(currentContent);

  const newEvent = JSON.parse(event.body);
  events.push(newEvent);

  const updateResponse = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `token ${githubToken}`,
      Accept: 'application/vnd.github.v3+json'
    },
    body: JSON.stringify({
      message: 'Update events.json',
      content: Buffer.from(JSON.stringify(events)).toString('base64'),
      sha: getData.sha
    })
  });

  if (!updateResponse.ok) {
    const updateErrorData = await updateResponse.json();
    console.log('GitHub API Update Error:', updateErrorData);
    return {
      statusCode: updateResponse.status,
      body: JSON.stringify({ error: 'GitHub API update request failed', details: updateErrorData })
    };
  }

  return {
    statusCode: 200,
    body: 'Event Updated Successfully!'
  };
};

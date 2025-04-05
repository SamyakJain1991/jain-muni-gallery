exports.handler = async function (event, context) {
  const githubToken = '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';
  const repoOwner = 'SamyakJain1991';
  const repoName = 'jain-muni-gallery';
  const filePath = 'events.json';

  const url = https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath};
  console.log('URL:', url);

  const response = await fetch(url);

  return {
    statusCode: 200,
    body: 'Fetch with Logged URL Done'
  };
};

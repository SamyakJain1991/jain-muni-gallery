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

 return {
    statusCode: 200,
    body: 'Fetch with URL and Headers Done'
  };
};

exports.handler = async function (event, context) {
  const response = await fetch(
    'https://api.github.com/repos/SamyakJain1991/jain-muni-gallery/contents/events.json'
  );

  return {
    statusCode: 200,
    body: 'Fetch with Hardcoded URL Done'
  };
};

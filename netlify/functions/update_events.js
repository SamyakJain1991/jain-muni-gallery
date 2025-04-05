exports.handler = async function (event, context) {
  const response = await fetch('https://api.github.com');

  return {
    statusCode: 200,
    body: 'Minimal Fetch Done'
  };
};

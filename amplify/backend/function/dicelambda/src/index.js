exports.handler = async (event) => {
  // TODO implement
  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  const response = {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify(`${randomNum}`),
  };
  return response;
};

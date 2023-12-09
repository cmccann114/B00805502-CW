const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

const azureKey = "3af928a472a64809b71c8f4bcc17b841";
const endpoint = "https://cw-b00805502-answer-proj.cognitiveservices.azure.com/";
const textAnalyticsClient = new TextAnalyticsClient(endpoint, new AzureKeyCredential(azureKey));

app.post("/getAnswer", async (req, res) => {
  const userInput = req.body.userInput;

  const result = await textAnalyticsClient.yourCustomAnsweringMethod(userInput);

  res.json({ answer: result });
});
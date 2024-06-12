const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");

export async function splitter(text) {
  const split = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });

  const output = await split.createDocuments([text]);

  return output;

}


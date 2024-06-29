import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { retriever } from "./retriever";
import { StringOutputParser } from "langchain/schema/output_parser";
import { combineDocs } from "./combineDocs";
import { RunnableSequence, RunnablePassthrough } from "langchain/runnables";
import { chatFormatter } from "./chatFormatter";

export async function standAlone(input_question,fileId,file, chatHistory) {
  const formattedChat = chatFormatter(chatHistory)
  const openAIApiKey = process.env.OPENAI_KEY;
  const llm = new ChatOpenAI({ openAIApiKey });

  // A string holding the phrasing of the prompt
  const standAloneQuestionTemplate =
    "Given a question, convert it to a standalone question. question: {question} standalone question: ";

  //  A prompt created using the phrasing of the prompt
  const standAloneQuestionPrompt = PromptTemplate.fromTemplate(
    standAloneQuestionTemplate
  );

  const answerTemplate = `You are a Document uploaded by the user who can answer a given question about itself based on the context provided or from the summary which is: ${file.summary}. 
  The maximum length of an answer should be 600 characters
  Try to find the answer in the context first and then in the summary. If you really don't know the answer, say "I'm sorry, 
  I don't know the answer to that question" And direct the user to email aniketsinha5552@gmail.com. 
  Don't try to make up an answer. Always speak as if you were chatting to a friend.
  Here is some other info about the yourself: fileName: ${file.name}, uploaded by: ${file.user.name}, createdAt: ${file.created_at}
  Also refer to previous chat for context. Here is he chat history: ${formattedChat}.
  context: {context}, question: {question}`;
  const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);


  const standaloneQuestionChain = standAloneQuestionPrompt
    .pipe(llm)
    .pipe(new StringOutputParser());

  const retrieverChain = RunnableSequence.from([
    (prevResult) => prevResult.standalone_question,
    retriever,
    // combineDocs,
  ]);
  const answerChain = answerPrompt.pipe(llm).pipe(new StringOutputParser());


  const chain = RunnableSequence.from([
    {
      standalone_question: standaloneQuestionChain,
      original_input: new RunnablePassthrough(),
    },
    {
      context1: retrieverChain,
      question1: ({ original_input }) => original_input.question,
    },
    // retrieved docs will be fileted based on fileId
    {
      context: ({context1})=>combineDocs(context1,file.id),
      question: ({question1})=>question1,
    },
    answerChain,
  ]);

  const response = await chain.invoke({
    question: input_question,
    file: file
  });


  console.log(response)
  return response;
}

import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import {retriever} from "./retriever"
import { StringOutputParser } from "langchain/schema/output_parser";
import { combineDocs } from "./combineDocs";
import { RunnableSequence, RunnablePassthrough } from "langchain/runnables";

export async function standAlone(input_question) {
  const openAIApiKey = process.env.OPENAI_KEY;
  const llm = new ChatOpenAI({ openAIApiKey });

  // A string holding the phrasing of the prompt
  const standAloneQuestionTemplate =
    "Given a question, convert it to a standalone question. question: {question} standalone question: ";

    //  A prompt created using the phrasing of the prompt
    const standAloneQuestionPrompt = PromptTemplate.fromTemplate(
      standAloneQuestionTemplate
    );

  const answerTemplate = `You are a heplful and enthusiastic support bot who can answer a given question about a PDF file based on the context provided. Try to find the answer in the context. If you really don't know the answer, say "I'm sorry, I don't know the answer to that question" And direct the user to email help@aniket.com. Don't try to make up an answer. Always speak as if you were chatting to a friend. context: {context}, question: {question}`;
  const answerPrompt = PromptTemplate.fromTemplate(answerTemplate)


  const standaloneQuestionChain = standAloneQuestionPrompt
    .pipe(llm)
    .pipe(new StringOutputParser()
  );
  
  const retrieverChain = RunnableSequence.from([
    prevResult => prevResult.standalone_question,
    retriever,
    combineDocs
  ])
  const answerChain = answerPrompt.pipe(llm).pipe(new StringOutputParser())

  const chain = RunnableSequence.from([
    {
      standalone_question: standaloneQuestionChain,
      original_input: new RunnablePassthrough()
    },
    {
      context: retrieverChain,
      question: ({original_input})=> original_input.question
    },
    answerChain
  ])

  const response = await chain.invoke({
    question: input_question,
  });

  return response;
}


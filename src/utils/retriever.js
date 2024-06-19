import {createClient} from "@supabase/supabase-js"
import {OpenAIEmbeddings} from "langchain/embeddings/openai"
import {SupabaseVectorStore} from "langchain/vectorstores/supabase"

const openAIApiKey = process.env.OPENAI_KEY

const embeddings = new OpenAIEmbeddings({openAIApiKey})
const sbApiKey = process.env.SUPABASE_KEY
const sbUrl = process.env.SUPABASE_URL
const client = createClient(sbUrl,sbApiKey)

const vectorStore = new SupabaseVectorStore(embeddings,{
    client,
    tableName: 'documents',
    queryName: 'match_documents'
})

export const retriever = vectorStore.asRetriever()

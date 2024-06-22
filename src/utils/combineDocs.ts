function combineDocs(docs: any[], fileId: string):string{
    // console.log("fileId",fileId)
  console.log("original docs",docs)
    const filteredData = docs.filter((doc:any)=> doc?.metadata?.fileId == fileId)
    console.log("docs",filteredData)
    return filteredData.map((doc)=>doc.pageContent).join('\n\n')
}

module.exports = {combineDocs}
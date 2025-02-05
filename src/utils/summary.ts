export async function summary(text:string){
    try {
        let res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: `Give a meaningful summary of the following text within 300 words. Following is the text : ${text}.` }],
            max_tokens: 100,
          }),
        });
        const data = await res.json();

        const sum = data.choices[0].message.content
        return sum

      } catch (err) {
        return "No summary"
      } 
};

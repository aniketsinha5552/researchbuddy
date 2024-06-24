import axios from "axios";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";


pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;
export async function GetTextFromPDF(url) {
    try {
        // Fetch the PDF from the URL
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const pdfData =  new Uint8Array(response.data);
        
        // Load the PDF document
        const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

        // Extract text from each page
        let text = '';
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const strings = content.items.map(item => item.str);
            text += strings.join(' ') + '\n';
        }

        return text;
    } catch (error) {
        console.error("Error fetching or processing PDF:", error);
        return null;
    }
}

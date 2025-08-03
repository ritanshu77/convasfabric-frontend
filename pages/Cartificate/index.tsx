"use client"

import jsPDF from 'jspdf';
import { useRef, useState } from "react"
import axios from "axios"
import CertificateCanvas from "@/component/CertificateCanvas"
import type { CertificateCanvasHandle } from '@/component/CertificateCanvas';

export default function Cartificate() {
    const [inputText, setInputText] = useState("")
    const [json, setJson] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const canvasRefs = useRef<CertificateCanvasHandle[]>([]);

    const handleSend = async () => {
        if (!inputText.trim()) return
        setLoading(true)
        setErrorMessage(null)

        if (!inputText.trim()) {
            setErrorMessage("Please enter a category to generate a certificate.")
            return
        }
        try {
            const oldSearchText = localStorage.getItem("oldSearchText");
            const oldResponse = localStorage.getItem("oldResponse");
            if (oldSearchText === inputText.trim() && oldResponse) {
                const parsedData = JSON.parse(oldResponse);
                setJson(parsedData);
                setLoading(false);
                return;
            }
            let data = JSON.stringify({
                "category": inputText
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:4001/post-ai-request',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            let response = await axios.request(config);
            // console.log("------response--------", JSON.stringify(response))

            if (response.data && response.data.data) {
                if (Array.isArray(response.data.data)) {
                    setJson(response.data.data);
                    localStorage.setItem("oldResponse", JSON.stringify(response.data.data))
                    localStorage.setItem("oldSearchText", inputText)
                } else if (typeof response.data.data === 'object' && response.data.data !== null) {

                    setJson([response.data.data]);
                } else {
                    setJson([]); // Handle unexpected data format
                    setErrorMessage("Received unexpected data format from the API.");
                }
            } else {
                setJson([]); // No data received
                setErrorMessage("No data received from the API.");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error("API Error Response:", error.response.data);
                    console.error("API Error Status:", error.response.status);
                    console.error("API Error Headers:", error.response.headers);
                    setErrorMessage(
                        `Server Error: ${error.response.status} - ${error.response.data?.message || 'Something went wrong on the server.'}`
                    );
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.error("API No Response:", error.request);
                    setErrorMessage("Network Error: No response received from the server. Please check your connection or the server status.");
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error("API Request Setup Error:", error.message);
                    setErrorMessage(`Request Error: ${error.message}`);
                }
            } else {
                // Generic error handling for non-Axios errors
                console.error("An unexpected error occurred:", error);
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
            setJson([]); // Clear previous JSON data on error
        } finally {
            setLoading(false)
        }
    }
    const handleDownload = (index: number) => {
        const ref = canvasRefs.current[index];
        console.log("--ref----",ref)
        if (!ref || !ref.exportAsImage) return;

        const dataUrl = ref.exportAsImage();
        console.log("---dataUrl----",dataUrl)
        if (!dataUrl) return;

        const pdf = new jsPDF("landscape", "pt", "a4");
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`certificate-${index + 1}.pdf`);
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="bg-white px-3 py-2 sm:px-4 border-t border-gray-300">
                <div className="w-full max-w-md sm:max-w-full md:max-w-screen-lg lg:max-w-screen-xl mx-auto flex items-center space-x-2">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                    <button
                        onClick={handleSend}
                        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send"}
                    </button>
                </div>
            </div>

            {errorMessage && (
                <div className="w-full max-w-screen-xl mx-auto mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-md flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="font-medium">{errorMessage}</p>
                </div>
            )}
            {/* Certificate Display Section */}
            {loading ? (
                <div className="max-h-screen w-full max-w-screen-xl mx-auto flex flex-col items-center justify-center mt-20 p-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                    <p className="text-gray-600 text-xl font-semibold mt-4">Generating certificate...</p>
                </div>
            ) : json && json.length > 0 ? (
                json.map((item, index) => (
                    <div key={index}>
                        <div className="flex flex-col md:flex-row w-full max-w-screen-xl mx-auto items-start space-y-4 md:space-y-0 md:space-x-4 mt-8 p-4">
                            <div className="md:w-7/2">
                                <div className='w-full  flex justify-center p-4 bg-white rounded-xl shadow-xl border border-gray-200 overflow-auto overflow-x-auto overflow-y-auto'>
                                    <CertificateCanvas
                                        ref={(ref) => {
                                            if (ref) canvasRefs.current[index] = ref;
                                        }}
                                        json={item}
                                    />
                                </div>
                                <div>

                                    <button
                                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                        onClick={() => handleDownload(index)}
                                    >
                                        Download PDF
                                    </button>
                                </div>

                            </div>
                            <div className="w-full md:w-7/5 flex justify-center p-4 bg-white rounded-xl shadow-xl border border-gray-200">
                                <textarea
                                    className="w-full h-[600px] border border-gray-300 rounded-lg p-3 text-sm text-gray-800 bg-gray-50 resize-none font-mono leading-relaxed overflow-auto"
                                    readOnly
                                    value={JSON.stringify(item, null, 2)}
                                />
                            </div>
                        </div>
                        {index < json.length - 1 && (
                            <hr className="my-10 border-t-2 border-gray-200 w-full md:hidden" />
                        )}
                    </div>
                ))
            ) : (
                <div className="max-h-screen w-full max-w-screen-xl mx-auto flex items-center justify-center mt-20 p-4">
                    <p className="text-gray-600 text-xl font-semibold">No Data Found. Generate a new certificate!</p>
                </div>
            )}
        </div>
    )
}

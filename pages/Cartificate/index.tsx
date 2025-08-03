"use client"

import { useState } from "react"
import axios from "axios"
import CertificateCanvas from "@/component/CertificateCanvas"

export default function Cartificate() {
    const [inputText, setInputText] = useState("")
    const [json, setJson] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const handleSend = async () => {
        if (!inputText.trim()) return
        setLoading(true)
        setErrorMessage(null)

        if (!inputText.trim()) {
            setErrorMessage("Please enter a category to generate a certificate.")
            return
        }
        try {
            // let data = JSON.stringify({
            //     "category": inputText
            // });

            // let config = {
            //     method: 'post',
            //     maxBodyLength: Infinity,
            //     url: 'http://localhost:4001/post-ai-request',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     data: data
            // };

            // let response = await axios.request(config);
            // console.log("------response--------", JSON.stringify(response))
            let response =  { data: {
        "success": true,
        "data": [
            {
                "templateName": "Template 1: Modern Agri-Tech Achievement",
                "description": "A clean, professional template blending natural and digital elements, perfect for a modern AI in agriculture course. Features crisp lines and a focus on growth and technology.",
                "elements": [
                    {
                        "type": "text",
                        "name": "title",
                        "content": "Certificate of Achievement",
                        "x": 500,
                        "y": 100,
                        "fontSize": 64,
                        "fontFamily": "Playfair Display",
                        "fontWeight": "bold",
                        "color": "#2C3E50",
                        "textAlign": "center"
                    },
                    {
                        "type": "text",
                        "name": "subTitle",
                        "content": "Awarded to",
                        "x": 500,
                        "y": 200,
                        "fontSize": 28,
                        "fontFamily": "Open Sans",
                        "fontWeight": "normal",
                        "color": "#7F8C8D",
                        "textAlign": "center"
                    },
                    {
                        "type": "text",
                        "name": "recipientName",
                        "content": "[Recipient Name]",
                        "x": 500,
                        "y": 280,
                        "fontSize": 52,
                        "fontFamily": "Great Vibes",
                        "fontWeight": "normal",
                        "color": "#28A745",
                        "textAlign": "center"
                    },
                    {
                        "type": "text",
                        "name": "courseDescription",
                        "content": "for successfully completing the comprehensive program in",
                        "x": 500,
                        "y": 380,
                        "fontSize": 28,
                        "fontFamily": "Open Sans",
                        "fontWeight": "normal",
                        "color": "#34495E",
                        "textAlign": "center"
                    },
                    {
                        "type": "text",
                        "name": "courseName",
                        "content": "AI for Smart Farming Technologies",
                        "x": 500,
                        "y": 430,
                        "fontSize": 40,
                        "fontFamily": "Montserrat",
                        "fontWeight": "bold",
                        "color": "#18BC9C",
                        "textAlign": "center"
                    },
                    {
                        "type": "text",
                        "name": "date",
                        "content": "Date: [Date]",
                        "x": 200,
                        "y": 600,
                        "fontSize": 24,
                        "fontFamily": "Open Sans",
                        "fontWeight": "normal",
                        "color": "#7F8C8D",
                        "textAlign": "left"
                    },
                    {
                        "type": "text",
                        "name": "signature1",
                        "content": "____________________________\nInstructor Signature",
                        "x": 800,
                        "y": 600,
                        "fontSize": 24,
                        "fontFamily": "Open Sans",
                        "fontWeight": "normal",
                        "color": "#7F8C8D",
                        "textAlign": "right"
                    },
                    {
                        "type": "icon",
                        "name": "mainIcon",
                        "description": "a stylized leaf with integrated circuit lines",
                        "x": 500,
                        "y": 520,
                        "width": 90,
                        "height": 90,
                        "color": "#18BC9C"
                    }
                ],
                "background": {
                    "type": "color",
                    "value": "#F9FAFB"
                },
                "border": {
                    "type": "line",
                    "color": "#1ABC9C",
                    "width": 12
                }
            },
            {
                "templateName": "Template 2: Smart Agriculture Pioneer",
                "description": "A robust and forward-looking design, emphasizing innovation and leadership in AI-driven agriculture. Features earthy tones with tech accents.",
                "elements": [
                    {
                        "type": "text",
                        "name": "title",
                        "content": "Smart Agriculture Pioneer",
                        "x": 500,
                        "y": 100,
                        "fontSize": 68,
                        "fontFamily": "Exo 2",
                        "fontWeight": "bold",
                        "color": "#34495E",
                        "textAlign": "center"
                    },
                    {
                        "type": "text",
                        "name": "subTitle",
                        "content": "Certification Awarded To",
                        "x": 500,
                        "y": 200,
                        "fontSize": 30,
                        "fontFamily": "Lato",
                        "fontWeight": "normal",
                        "color": "#7F8C8D",
                        "textAlign": "center"
                    },
                    {
                        "type": "text",
                        "name": "recipientName",
                        "content": "[Recipient Name]",
                        "x": 500,
                        "y": 280,
                        "fontSize": 54,
                        "fontFamily": "Merriweather",
                        "fontWeight": "bold",
                        "color": "#E67E22",
                        "textAlign": "center"
                    },
                    {
                        "type": "text",
                        "name": "courseDescription",
                        "content": "for outstanding dedication and mastery in",
                        "x": 500,
                        "y": 380,
                        "fontSize": 28,
                        "fontFamily": "Lato",
                        "fontWeight": "normal",
                        "color": "#5D6D7E",
                        "textAlign": "center"
                    },
                    {
                        "type": "text",
                        "name": "courseName",
                        "content": "Advanced AI for Crop Optimization",
                        "x": 500,
                        "y": 430,
                        "fontSize": 42,
                        "fontFamily": "Roboto Slab",
                        "fontWeight": "bold",
                        "color": "#2980B9",
                        "textAlign": "center"
                    },
                    {
                        "type": "text",
                        "name": "date",
                        "content": "Issued On: [Date]",
                        "x": 200,
                        "y": 600,
                        "fontSize": 24,
                        "fontFamily": "Lato",
                        "fontWeight": "normal",
                        "color": "#7F8C8D",
                        "textAlign": "left"
                    },
                    {
                        "type": "text",
                        "name": "signature1",
                        "content": "____________________________\nProgram Director",
                        "x": 800,
                        "y": 600,
                        "fontSize": 24,
                        "fontFamily": "Lato",
                        "fontWeight": "normal",
                        "color": "#7F8C8D",
                        "textAlign": "right"
                    },
                    {
                        "type": "icon",
                        "name": "mainIcon",
                        "description": "a wheat stalk combined with a gear cog",
                        "x": 500,
                        "y": 520,
                        "width": 95,
                        "height": 95,
                        "color": "#E67E22"
                    }
                ],
                "background": {
                    "type": "color",
                    "value": "#FEF9E7"
                },
                "border": {
                    "type": "line",
                    "color": "#D35400",
                    "width": 10
                }
            },
            {
                "templateName": "Template 3: Sustainable Farming AI Excellence",
                "description": "An eco-friendly and sophisticated design, highlighting the importance of AI in sustainable agricultural practices. Uses natural greens and soft textures.",
                "elements": [
                    {
                        "type": "text",
                        "name": "title",
                        "content": "Certificate of Excellence",
                        "x": 500,
                        "y": 100,
                        "fontSize": 60,
                        "fontFamily": "Lora",
                        "fontWeight": "bold",
                        "color": "#2E4053",
                        "textAlign": "center"
                    },
                    {
                        "type": "text",
                        "name": "subTitle",
                        "content": "In Sustainable Agri-AI",
                        "x": 500,
                        "y": 170,
                        "fontSize": 40,
                        "fontFamily": "Lora",
                        "fontWeight": "normal",
                        "color": "#5B932F",
                        "textAlign": "center"
                    },
                    {
                        "type": "text",
                        "name": "recipientName",
                        "content": "[Recipient Name]",
                        "x": 500,
                        "y": 280,
                        "fontSize": 50,
                        "fontFamily": "Dancing Script",
                        "fontWeight": "normal",
                        "color": "#28B463",
                        "textAlign": "center"
                    },
                    {
                        "type": "text",
                        "name": "courseDescription",
                        "content": "for successfully completing the specialized training in",
                        "x": 500,
                        "y": 380,
                        "fontSize": 28,
                        "fontFamily": "Roboto",
                        "fontWeight": "normal",
                        "color": "#566573",
                        "textAlign": "center"
                    },
                    {
                        "type": "text",
                        "name": "courseName",
                        "content": "Eco-Friendly AI for Precision Agriculture",
                        "x": 500,
                        "y": 430,
                        "fontSize": 38,
                        "fontFamily": "Source Sans Pro",
                        "fontWeight": "bold",
                        "color": "#2ECC71",
                        "textAlign": "center"
                    },
                    {
                        "type": "text",
                        "name": "date",
                        "content": "Certification Date: [Date]",
                        "x": 200,
                        "y": 600,
                        "fontSize": 24,
                        "fontFamily": "Roboto",
                        "fontWeight": "normal",
                        "color": "#566573",
                        "textAlign": "left"
                    },
                    {
                        "type": "text",
                        "name": "signature1",
                        "content": "____________________________\nLead Researcher",
                        "x": 800,
                        "y": 600,
                        "fontSize": 24,
                        "fontFamily": "Roboto",
                        "fontWeight": "normal",
                        "color": "#566573",
                        "textAlign": "right"
                    },
                    {
                        "type": "icon",
                        "name": "mainIcon",
                        "description": "a stylized leaf with a subtle circuit board pattern within its veins",
                        "x": 500,
                        "y": 520,
                        "width": 100,
                        "height": 100,
                        "color": "#2ECC71"
                    }
                ],
                "background": {
                    "type": "gradient",
                    "value": "linear-gradient(to bottom right, #E8F8F5, #D1F2EB)"
                },
                "border": {
                    "type": "line",
                    "color": "#28B463",
                    "width": 14
                }
            },
            {
                "templateName": "Template 4: Data-Driven Harvest Professional",
                "description": "A modern, data-centric design emphasizing analytics and efficiency in agricultural AI applications. Features geometric patterns and blues.",
                "elements": [
                    {
                        "type": "text",
                        "name": "title",
                        "content": "Data-Driven Harvest",
                        "x": 500,
                        "y": 100,
                        "fontSize": 62,
                        "fontFamily": "Bebas Neue",
                        "fontWeight": "bold",
                        "color": "#2C3E50",
                        "textAlign": "center"
                    },
                    {
                        "type": "text",
                        "name": "subTitle",
                        "content": "Professional Certificate",
                        "x": 500,
                        "y": 170,
                        "fontSize": 36,
                        "fontFamily": "Bebas Neue",
                        "fontWeight": "normal",
                        "color": "#7F8C8D",
                        "textAlign": "center"
                    },
                    {
                        "type": "text",
                        "name": "recipientName",
                        "content": "[Recipient Name]",
                        "x": 500,
                        "y": 280,
                        "fontSize": 56,
                        "fontFamily": "Quicksand",
                        "fontWeight": "bold",
                        "color": "#2980B9",
                        "textAlign": "center"
                    },
                    {
                        "type": "text",
                        "name": "courseDescription",
                        "content": "for expertise in utilizing AI for enhanced agricultural productivity and analysis in the course",
                        "x": 500,
                        "y": 380,
                        "fontSize": 28,
                        "fontFamily": "Raleway",
                        "fontWeight": "normal",
                        "color": "#5D6D7E",
                        "textAlign": "center"
                    },
                    {
                        "type": "text",
                        "name": "courseName",
                        "content": "Agricultural Big Data & AI Analytics",
                        "x": 500,
                        "y": 430,
                        "fontSize": 40,
                        "fontFamily": "Montserrat",
                        "fontWeight": "bold",
                        "color": "#3498DB",
                        "textAlign": "center"
                    },
                    {
                        "type": "text",
                        "name": "date",
                        "content": "Award Date: [Date]",
                        "x": 200,
                        "y": 600,
                        "fontSize": 24,
                        "fontFamily": "Raleway",
                        "fontWeight": "normal",
                        "color": "#7F8C8D",
                        "textAlign": "left"
                    },
                    {
                        "type": "text",
                        "name": "signature1",
                        "content": "____________________________\nData Scientist Lead",
                        "x": 800,
                        "y": 600,
                        "fontSize": 24,
                        "fontFamily": "Raleway",
                        "fontWeight": "normal",
                        "color": "#7F8C8D",
                        "textAlign": "right"
                    },
                    {
                        "type": "icon",
                        "name": "mainIcon",
                        "description": "a network of data points forming a crop field",
                        "x": 500,
                        "y": 520,
                        "width": 105,
                        "height": 105,
                        "color": "#3498DB"
                    }
                ],
                "background": {
                    "type": "pattern",
                    "value": "subtle geometric grid with faint blue lines"
                },
                "border": {
                    "type": "line",
                    "color": "#2980B9",
                    "width": 10
                }
            },
            {
                "templateName": "Template 5: Future of Farming Innovator",
                "description": "A bold and futuristic design, celebrating innovators at the forefront of AI in agriculture. Features dark backgrounds and vibrant, glowing elements.",
                "elements": [
                    {
                        "type": "text",
                        "name": "title",
                        "content": "Future of Farming",
                        "x": 500,
                        "y": 100,
                        "fontSize": 70,
                        "fontFamily": "Orbitron",
                        "fontWeight": "bold",
                        "color": "#ECF0F1",
                        "textAlign": "center"
                    },
                    {
                        "type": "text",
                        "name": "subTitle",
                        "content": "Innovator Award",
                        "x": 500,
                        "y": 180,
                        "fontSize": 45,
                        "fontFamily": "Orbitron",
                        "fontWeight": "normal",
                        "color": "#3498DB",
                        "textAlign": "center"
                    },
                    {
                        "type": "text",
                        "name": "recipientName",
                        "content": "[Recipient Name]",
                        "x": 500,
                        "y": 290,
                        "fontSize": 58,
                        "fontFamily": "Electrolize",
                        "fontWeight": "normal",
                        "color": "#2ECC71",
                        "textAlign": "center"
                    },
                    {
                        "type": "text",
                        "name": "courseDescription",
                        "content": "for pioneering contributions and successful completion of",
                        "x": 500,
                        "y": 390,
                        "fontSize": 30,
                        "fontFamily": "Rajdhani",
                        "fontWeight": "normal",
                        "color": "#BDC3C7",
                        "textAlign": "center"
                    },
                    {
                        "type": "text",
                        "name": "courseName",
                        "content": "AI Robotics & Automation in Agriculture",
                        "x": 500,
                        "y": 440,
                        "fontSize": 44,
                        "fontFamily": "Quantico",
                        "fontWeight": "bold",
                        "color": "#3498DB",
                        "textAlign": "center"
                    },
                    {
                        "type": "text",
                        "name": "date",
                        "content": "Issued: [Date]",
                        "x": 200,
                        "y": 600,
                        "fontSize": 26,
                        "fontFamily": "Rajdhani",
                        "fontWeight": "normal",
                        "color": "#BDC3C7",
                        "textAlign": "left"
                    },
                    {
                        "type": "text",
                        "name": "signature1",
                        "content": "____________________________\nChief Technology Officer",
                        "x": 800,
                        "y": 600,
                        "fontSize": 26,
                        "fontFamily": "Rajdhani",
                        "fontWeight": "normal",
                        "color": "#BDC3C7",
                        "textAlign": "right"
                    },
                    {
                        "type": "icon",
                        "name": "mainIcon",
                        "description": "a futuristic drone with a leaf symbol or subtle circuit patterns",
                        "x": 500,
                        "y": 520,
                        "width": 110,
                        "height": 110,
                        "color": "#2ECC71"
                    }
                ],
                "background": {
                    "type": "image_description",
                    "value": "dark blue background with glowing circuit lines and subtle field contours"
                },
                "border": {
                    "type": "glow_line",
                    "color": "#3498DB",
                    "width": 15
                }
            }
        ]
    }}
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
                            <div className="w-full md:w-7/2 flex justify-center p-4 bg-white rounded-xl shadow-xl border border-gray-200 overflow-auto overflow-x-auto overflow-y-auto">
                                <CertificateCanvas json={item} />
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

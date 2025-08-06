'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import * as fabric from 'fabric';

interface CertificateCanvasProps {
    json: any;
}
export interface CertificateCanvasHandle {
    exportAsImage: () => string;
}

const CertificateCanvas = forwardRef<CertificateCanvasHandle, CertificateCanvasProps>(({ json }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricCanvas = useRef<fabric.Canvas | null>(null);

    useImperativeHandle(ref, () => ({
        exportAsImage: () => {
            console.log("Calling exportAsImage...", fabricCanvas.current);
            if (fabricCanvas.current) {
                console.log("Canvas exists, rendering...");
                fabricCanvas.current.renderAll();
                return fabricCanvas.current.toDataURL({
                    format: 'png',
                    quality: 1,
                    multiplier: 2
                });
            }
            console.log("Canvas not found during export");
            return '';
        }
    }));

    useEffect(() => {
        if (!canvasRef.current || !json) return;

        if (fabricCanvas.current) {
            fabricCanvas.current.dispose();
        }
        const canvas = new fabric.Canvas(canvasRef.current, {
            width: 1000,
            height: 700,
            
            hoverCursor: 'default',
        });

        canvas.clear();

        const backgroundRect = new fabric.Rect({
            left: 0,
            top: 0,
            width: canvas.width,
            height: canvas.height,
            selectable: false,
            evented: false,
            fill: '#ffffff'
        });

        if (json.background) {
            if (json.background.type === 'color') {
                backgroundRect.set({ fill: json.background.value });
            } else if (json.background.type === 'gradient' && typeof json?.background?.value === 'string') {
                const gradientMatch = json.background?.value?.match(/linear-gradient\(to (.*?), (.*?),\s*(.*?)\)/);
                if (gradientMatch) {
                    const [, direction, color1, color2] = gradientMatch;
                    let coords;
                    switch (direction.trim()) {
                        case 'bottom right':
                            coords = { x1: 0, y1: 0, x2: canvas.width, y2: canvas.height };
                            break;
                        case 'top left':
                            coords = { x1: canvas.width, y1: canvas.height, x2: 0, y2: 0 };
                            break;
                        case 'bottom':
                            coords = { x1: 0, y1: 0, x2: 0, y2: canvas.height };
                            break;
                        case 'top':
                            coords = { x1: 0, y1: canvas.height, x2: 0, y2: 0 };
                            break;
                        case 'right':
                            coords = { x1: 0, y1: 0, x2: canvas.width, y2: 0 };
                            break;
                        case 'left':
                            coords = { x1: canvas.width, y1: 0, x2: 0, y2: 0 };
                            break;
                        default:
                            coords = { x1: 0, y1: 0, x2: canvas.width, y2: canvas.height };
                    }

                    const gradient = new fabric.Gradient({
                        type: 'linear',
                        coords: coords,
                        colorStops: [
                            { offset: 0, color: color1.trim() },
                            { offset: 1, color: color2.trim() }
                        ]
                    });
                    backgroundRect.set({ fill: gradient });
                } else {
                    console.warn(`Could not parse gradient string: ${json.background.value}. Using a default color.`);
                    backgroundRect.set({ fill: '#f0f0f0' });
                }
            } else if (json.background.type === 'image_description' || json.background.type === 'pattern') {
                console.warn(`Background type "${json.background.type}" not fully supported for dynamic generation. Using a default color.`);
                backgroundRect.set({ fill: '#f0f0f0' });
            }
        }

        canvas.add(backgroundRect);



        if (json.border) {
            const borderWidth = json.border.width || 10;
            const borderColor = json.border.color || '#000000';

            const borderRect = new fabric.Rect({
                left: borderWidth / 2,
                top: borderWidth / 2,
                width: canvas.width - borderWidth,
                height: canvas.height - borderWidth,
                stroke: borderColor,
                strokeWidth: borderWidth,
                fill: 'transparent',
                 selectable: false,
            evented: false,
                
            });

            if (json.border.type === 'glow_line') {
                borderRect.set({
                    shadow: new fabric.Shadow({
                        color: borderColor,
                        blur: borderWidth * 2,
                        offsetX: 0,
                        offsetY: 0,
                    }),
                });
            }
            console.log("------borderRect----",borderRect)
             canvas.add(borderRect);
        }
        
        if (Array.isArray(json.elements)) {
            json.elements.forEach((element: any) => {


                function fitFontSizeToCanvas(
                    canvas: fabric.Canvas,
                    textObj: fabric.IText | fabric.Textbox,
                    maxWidth: number = canvas.getWidth() - 40,
                    maxHeight: number = canvas.getHeight() - 100,
                    minFontSize: number = 10
                ) {
                    let fontSize = textObj.fontSize || 16;
                    textObj.set({ fontSize });

                    while (
                        (textObj.getScaledWidth() > maxWidth || textObj.getScaledHeight() > maxHeight)
                        && fontSize > minFontSize
                    ) {
                        fontSize -= 1;
                        textObj.set({ fontSize });
                    }

                    canvas.renderAll();
                }

                if (element.type === 'text') {
                    const textObject = new fabric.IText(element.content || '', {
                        left: element.x,
                        top: element.y,
                        fill: element.color,
                        fontSize: element.fontSize,
                        fontFamily: element.fontFamily,
                        fontWeight: element.fontWeight as any,
                        textAlign: element.textAlign as any,
                        originX: 'center',
                        originY: 'center',
                        
                        
                    });
                    canvas.add(textObject);
                    
                    
                    
                    
                    
                    fitFontSizeToCanvas(canvas, textObject);
                } else if (element.type === 'icon') {
                    const iconRadius = element.width / 2 || 45;
                    const iconColor = element.color || '#cccccc';

                    const iconCircle = new fabric.Circle({
                        radius: iconRadius,
                        left: element.x,
                        top: element.y,
                        fill: iconColor,
                        originX: 'center',
                        originY: 'center',
                        
                        
                    });
                    canvas.add(iconCircle);

                    const iconText = new fabric.IText(element.name || 'Icon', {
                        left: element.x,
                        top: element.y,
                        fill: '#ffffff',
                        fontSize: 0.4 * iconRadius,
                        fontFamily: 'Arial',
                        originX: 'center',
                        originY: 'center',
                        
                        
                    });
                    canvas.add(iconText);
                }

            });
        }

        fabricCanvas.current = canvas;
        canvas.renderAll();


        return () => {
            canvas.dispose();
        };
    }, [json]);

    return <canvas ref={canvasRef} />;
})
export default CertificateCanvas;

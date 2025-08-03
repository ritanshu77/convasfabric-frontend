'use client';



import { useEffect, useRef } from 'react';

import * as fabric from 'fabric';

interface CertificateCanvasProps {

    json: any;

}



export default function CertificateCanvas({ json }: CertificateCanvasProps) {

    const canvasRef = useRef<HTMLCanvasElement>(null);



    useEffect(() => {

        const canvas = new fabric.Canvas(canvasRef.current!, {

            width: 800,

            height: 600,

            backgroundColor: json.background,

        });



        json.objects.forEach((obj: any) => {

            switch (obj.type) {

                case 'image':

                    fabric.FabricImage.fromURL(obj.src!).then((img) => {

                        img.set({

                            left: obj.left,

                            top: obj.top,

                            width: obj.width,

                            height: obj.height,

                            originX: obj.originX,

                            originY: obj.originY,

                        });

                        canvas.add(img);

                    }).catch(error => {

                        console.error(error);

                    });

                    break;

                case 'i-text':

                    const text = new fabric.IText(obj.text || '', {

                        left: obj.left,

                        top: obj.top,

                        originX: obj.originX as any,

                        fill: obj.fill,

                        fontSize: obj.fontSize,

                        fontFamily: obj.fontFamily,

                        fontWeight: obj.fontWeight as any,

                        textAlign: obj.textAlign as any,

                        width: obj.width,

                    });

                    canvas.add(text);

                    break;

                case 'rect':

                    const rect = new fabric.Rect({

                        left: obj.left,

                        top: obj.top,

                        width: obj.width,

                        height: obj.height,

                        fill: obj.fill,

                        stroke: obj.stroke,

                        strokeWidth: obj.strokeWidth,

                        rx: obj.rx,

                        ry: obj.ry,

                        originX: obj.originX,

                        originY: obj.originY,

                    });

                    canvas.add(rect);

                    break;

                case 'line':

                    const line = new fabric.Line([obj.x1, obj.y1, obj.x2, obj.y2], {

                        left: obj.left,

                        top: obj.top,

                        stroke: obj.stroke,

                        strokeWidth: obj.strokeWidth,

                        originX: obj.originX,

                        originY: obj.originY,

                    });

                    canvas.add(line);

                    break;

                default:

                    console.warn(`Unknown object type: ${obj.type}`);

                    break;

            }

        });



        return () => {

            canvas.dispose();

        };

    }, [json]);



    return <canvas ref={canvasRef} />;

}
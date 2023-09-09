import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import createPDF from './PDFcreate';
import './PDFreader.css';
import { Button } from '@mui/material';
import { saveAs } from 'file-saver';
import { useParams } from 'react-router-dom';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer: React.FC = () => {
    const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
    const {id} = useParams()
    console.log(p)
    const generatePDF = async (id: any) => {
        try {
            const bytes = await createPDF(id);
            setPdfBytes(bytes);
        } catch (error) {
            console.error('Помилка при генерації PDF:', error);
        }
    };

    useEffect(() => {
        generatePDF(1);
        console.log(id)

    }, []);

    return (
        <div className='pdf-viewer'>
            <div className="pdf-viewer__viewer">
                {pdfBytes && (
                    <>
                        <Document file={{ data: pdfBytes }}>
                            <Page pageNumber={1} />
                        </Document>
                    </>
                )}
            </div>
        </div>
    );
};

export default PDFViewer;
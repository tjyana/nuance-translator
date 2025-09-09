
import React, { useState, useCallback } from 'react';
import type { LanguageOption, FormalityLevel } from '../types';

interface TranslationCardProps {
    text: string;
    language: LanguageOption;
    level: FormalityLevel;
}

const TranslationCard: React.FC<TranslationCardProps> = ({ text, language, level }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }, [text]);

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg flex flex-col h-full transform transition-transform duration-300 hover:scale-105 hover:border-blue-500">
            <div className="flex items-center mb-4">
                 <div>
                    <h3 className="text-xl font-bold text-white">Translation Result</h3>
                    <p className="text-sm text-gray-400">
                        {language} - <span className="font-semibold">{level.title}</span>
                    </p>
                </div>
            </div>
            <div className="flex-grow bg-gray-900 rounded-md p-4 mb-4 whitespace-pre-wrap font-mono text-gray-300 overflow-auto min-h-[150px]">
                {text}
            </div>
            <button
                onClick={handleCopy}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center disabled:bg-gray-500"
                disabled={!text}
            >
                {copied ? (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                    </>
                ) : (
                     <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy
                     </>
                )}
            </button>
        </div>
    );
};

export default TranslationCard;

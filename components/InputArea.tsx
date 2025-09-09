
import React from 'react';
import type { LanguageOption, FormalityLevel } from '../types';

interface InputAreaProps {
    inputText: string;
    setInputText: (text: string) => void;
    onTranslate: () => void;
    isLoading: boolean;
    language: LanguageOption;
    setLanguage: (language: LanguageOption) => void;
    formalityLevel: number;
    setFormalityLevel: (level: number) => void;
    levels: FormalityLevel[];
}

const InputArea: React.FC<InputAreaProps> = ({
    inputText,
    setInputText,
    onTranslate,
    isLoading,
    language,
    setLanguage,
    formalityLevel,
    setFormalityLevel,
    levels,
}) => {
    const selectedLevel = levels[formalityLevel];

    return (
        <div className="w-full bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700 space-y-6">
            {/* Language Selector */}
            <div>
                 <label className="block text-lg font-medium text-gray-300 mb-2">
                    Target Language
                </label>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setLanguage('English')}
                        disabled={isLoading}
                        className={`w-full py-2 px-4 rounded-md text-lg font-medium transition-colors ${language === 'English' ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
                    >
                        English
                    </button>
                     <button
                        onClick={() => setLanguage('Japanese')}
                        disabled={isLoading}
                        className={`w-full py-2 px-4 rounded-md text-lg font-medium transition-colors ${language === 'Japanese' ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
                    >
                        Japanese
                    </button>
                </div>
            </div>

            {/* Formality Slider */}
            <div>
                 <label htmlFor="formality-slider" className="block text-lg font-medium text-gray-300 mb-2">
                    Style & Formality
                </label>
                <input
                    id="formality-slider"
                    type="range"
                    min="0"
                    max={levels.length - 1}
                    value={formalityLevel}
                    onChange={(e) => setFormalityLevel(parseInt(e.target.value, 10))}
                    disabled={isLoading}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                 <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
                    <span>Informal</span>
                    <span>Formal</span>
                </div>
                <div className="mt-4 text-center bg-gray-900 p-3 rounded-md">
                    <p className="font-semibold text-white">{selectedLevel.title}</p>
                    <p className="text-sm text-gray-400">{selectedLevel.description}</p>
                </div>
            </div>


            {/* Text Input */}
            <div>
                 <label htmlFor="translation-input" className="block text-lg font-medium text-gray-300 mb-2">
                    Enter text to translate:
                </label>
                <textarea
                    id="translation-input"
                    rows={5}
                    className="w-full p-4 bg-gray-900 border border-gray-600 rounded-md text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="e.g., Please review this document by the end of the day."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    disabled={isLoading}
                />
            </div>
            
            {/* Translate Button */}
            <button
                onClick={onTranslate}
                disabled={isLoading || !inputText.trim()}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Translating...
                    </>
                ) : (
                    "Translate with Nuance"
                )}
            </button>
        </div>
    );
};

export default InputArea;

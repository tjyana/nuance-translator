
import React, { useState, useCallback, useMemo } from 'react';
import InputArea from './components/InputArea';
import TranslationCard from './components/TranslationCard';
import LoadingSpinner from './components/LoadingSpinner';
import { getTranslation } from './services/geminiService';
import { ENGLISH_LEVELS, JAPANESE_LEVELS } from './constants';
import type { LanguageOption } from './types';

const App: React.FC = () => {
    const [inputText, setInputText] = useState<string>('');
    const [translation, setTranslation] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [language, setLanguage] = useState<LanguageOption>('English');
    const [formalityLevel, setFormalityLevel] = useState<number>(3); // Default to 'Standard'/'日常会話'
    
    const levels = useMemo(() => {
        return language === 'English' ? ENGLISH_LEVELS : JAPANESE_LEVELS;
    }, [language]);

    // Reset formality level when language changes.
    const handleLanguageChange = (newLanguage: LanguageOption) => {
        setLanguage(newLanguage);
        setFormalityLevel(3); // Reset to middle value
        setTranslation(null); // Clear previous results
    };

    const handleTranslate = useCallback(async () => {
        const selectedLevel = levels[formalityLevel];
        if (!inputText.trim() || isLoading || !selectedLevel) return;

        setIsLoading(true);
        setError(null);
        setTranslation(null);

        try {
            const result = await getTranslation(inputText, language, selectedLevel);
            setTranslation(result);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    }, [inputText, isLoading, language, formalityLevel, levels]);

    const selectedLevel = levels[formalityLevel];

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
            <header className="text-center mb-8">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Nuance Translator
                </h1>
                <p className="mt-2 text-lg text-gray-400">Translate your message into different communication styles.</p>
            </header>

            <main className="w-full max-w-2xl">
                <div className="mb-8">
                    <InputArea 
                        inputText={inputText}
                        setInputText={setInputText}
                        onTranslate={handleTranslate}
                        isLoading={isLoading}
                        language={language}
                        setLanguage={handleLanguageChange}
                        formalityLevel={formalityLevel}
                        setFormalityLevel={setFormalityLevel}
                        levels={levels}
                    />
                </div>

                {isLoading && <LoadingSpinner />}
                
                {error && (
                    <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative text-center" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {translation && selectedLevel && (
                    <TranslationCard
                        text={translation}
                        language={language}
                        level={selectedLevel}
                    />
                )}

                {!isLoading && !translation && !error && (
                    <div className="text-center text-gray-500 mt-12">
                         <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                        <p className="mt-4 text-lg">Your nuanced translation will appear here.</p>
                    </div>
                )}
            </main>
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
                 input[type="range"]::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  width: 20px;
                  height: 20px;
                  background: #3b82f6; /* blue-600 */
                  cursor: pointer;
                  border-radius: 50%;
                  margin-top: -7px;
                }
                input[type="range"]::-moz-range-thumb {
                  width: 20px;
                  height: 20px;
                  background: #3b82f6;
                  cursor: pointer;
                  border-radius: 50%;
                }
            `}</style>
             <footer className="mt-12 text-center text-gray-600 text-sm">
                <p>Powered by Google Gemini. Designed for excellence.</p>
            </footer>
        </div>
    );
};

export default App;

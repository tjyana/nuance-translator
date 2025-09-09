import type { FormalityLevel } from './types';

export const ENGLISH_LEVELS: FormalityLevel[] = [
    {
        title: 'Reddit',
        description: "A very distinct form of slang, jargon, and a shared vocabulary that's often incomprehensible to people who don't spend a lot of time on the platform."
    },
    {
        title: 'Street Slang',
        description: 'The most informal and current slang, often originating from specific subcultures or regions.'
    },
    {
        title: 'Casual',
        description: 'Everyday language used with friends and family. It includes some slang and contractions.'
    },
    {
        title: 'Standard',
        description: 'Neutral and widely understood English. Appropriate for most social and professional settings.'
    },
    {
        title: 'Formal',
        description: 'Language used in professional documents, academic papers, and official speeches.'
    },
    {
        title: 'Official/Archaic',
        description: 'Highly formal, often specialized language. This level includes legal, scientific, or ceremonial terms, and may contain older or less common words.'
    },
    {
        title: 'Shakespearean',
        description: "A form of Early Modern English, a transitional stage of the language that is understandable to a modern speaker but includes distinct grammatical rules and vocabulary. It is characterized by the use of \"thou,\" \"thee,\" and \"thy,\" and a more flexible word order, often used for poetic effect."
    }
];

export const JAPANESE_LEVELS: FormalityLevel[] = [
    {
        title: 'ヤンキー',
        description: 'Extremely rude, aggressive, and disrespectful street slang, often associated with delinquents (Yankii). This style is intentionally confrontational and offensive.'
    },
    {
        title: '若者言葉 (Wakamono Kotoba)',
        description: "Literally 'young person's language.' This refers to current slang and language trends among youth."
    },
    {
        title: '友達言葉 (Tomodachi Kotoba)',
        description: "'Friend language.' This is casual, familiar speech used among close friends."
    },
    {
        title: '日常会話 (Nichijō Kaiwa)',
        description: "'Daily conversation.' This is the standard, neutral language used in most everyday situations."
    },
    {
        title: '丁寧語 (Teineigo)',
        description: "'Polite language.' This is a fundamental level of formal speech, using polite endings like −masu and −desu."
    },
    {
        title: '尊敬語・謙譲語 (Sonkeigo/Kenjōgo)',
        description: "'Respectful/Humble language.' This is the highest level of formality, used to show extreme respect to superiors or to speak humbly about oneself. These are also known as 敬語 (Keigo), or honorific language."
    },
    {
        title: '古語 (Kogo)',
        description: "Literally 'old language.' This term generally refers to the vocabulary and grammar of Japanese spoken before the Meiji period (1868-1912). It is the language of classical literature, such as The Tale of Genji and The Pillow Book."
    }
];
import * as wordList from 'wordlist-english';

const A: Set<string> = new Set(['i', 'a', 'n']);
const B: Set<string> = new Set(['w', 'e', 'k']);
const C: Set<string> = new Set(['f', 'l', 'r']);
const D: Set<string> = new Set(['u', 'c', 'm']);

const allLetters = new Set([...A, ...B, ...C, ...D]);

const words: string[] = wordList['english'];

function isValidWord(word: string): boolean {
    if (!word) return false;

    let prevSet: Set<string> | null = null;
    for (const letter of word) {
        if (!allLetters.has(letter)) {
            return false;
        }

        let currentSet: Set<string> | null = null;
        if (A.has(letter)) currentSet = A;
        else if (B.has(letter)) currentSet = B;
        else if (C.has(letter)) currentSet = C;
        else if (D.has(letter)) currentSet = D;

        if (prevSet === currentSet) {
            return false;
        }

        prevSet = currentSet;
    }

    return true;
}

function countDistinctLetters(word: string): number {
    const usedLetters = new Set<string>();
    for (const letter of word) {
        usedLetters.add(letter);
    }
    return usedLetters.size;
}

function countDistinctLettersInPairs(...words: string[]): number {
    const combinedWord = words.join('');
    return countDistinctLetters(combinedWord);
}

const acceptableWords: string[] = words.filter(isValidWord);

let longestWord = '';
let mostDistinctWord = '';
let maxDistinctLetters = 0;
let bestPair: [string, string] = ['', ''];
let maxDistinctLettersInPair = 0;
let bestTriple: [string, string, string] = ['', '', ''];
let maxDistinctLettersInTriple = 0;

for (const word of acceptableWords) {
    if (word.length > longestWord.length) {
        longestWord = word;
    }

    const distinctLetters = countDistinctLetters(word);
    if (distinctLetters > maxDistinctLetters) {
        maxDistinctLetters = distinctLetters;
        mostDistinctWord = word;
    }

    // Find pairs of words
    const lastLetter = word[word.length - 1];
    const matchingWords = acceptableWords.filter((w) => w[0] === lastLetter);
    for (const match of matchingWords) {
        const distinctLettersInPair = countDistinctLettersInPairs(word, match);
        if (distinctLettersInPair > maxDistinctLettersInPair) {
            maxDistinctLettersInPair = distinctLettersInPair;
            bestPair = [word, match];
        }
    }
}

if (maxDistinctLettersInPair < allLetters.size) {
    for (const [word1, word2] of [bestPair]) {
        const lastLetter = word2[word2.length - 1];
        const matchingWords = acceptableWords.filter((w) => w[0] === lastLetter);
        for (const match of matchingWords) {
            const distinctLettersInTriple = countDistinctLettersInPairs(word1, word2, match);
            if (distinctLettersInTriple > maxDistinctLettersInTriple) {
                maxDistinctLettersInTriple = distinctLettersInTriple;
                bestTriple = [word1, word2, match];
            }
        }
    }
}

console.log(`Number of acceptable words: ${acceptableWords.length}`);
console.log(`Longest acceptable word: ${longestWord}`);
console.log(`Word with most distinct letters: ${mostDistinctWord}`);

if (maxDistinctLettersInPair === allLetters.size) {
    console.log(`Word pair covers all distinct letters: (${bestPair[0]}, ${bestPair[1]})`);
} else {
    console.log(`Word triple with most distinct letters: (${bestTriple[0]}, ${bestTriple[1]}, ${bestTriple[2]})`);
}

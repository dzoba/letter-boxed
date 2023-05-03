"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const wordList = __importStar(require("wordlist-english"));
const A = new Set(['i', 'a', 'n']);
const B = new Set(['w', 'e', 'k']);
const C = new Set(['f', 'l', 'r']);
const D = new Set(['u', 'c', 'm']);
const allLetters = new Set([...A, ...B, ...C, ...D]);
const words = wordList['english'];
function isValidWord(word) {
    if (!word)
        return false;
    let prevSet = null;
    for (const letter of word) {
        if (!allLetters.has(letter)) {
            return false;
        }
        let currentSet = null;
        if (A.has(letter))
            currentSet = A;
        else if (B.has(letter))
            currentSet = B;
        else if (C.has(letter))
            currentSet = C;
        else if (D.has(letter))
            currentSet = D;
        if (prevSet === currentSet) {
            return false;
        }
        prevSet = currentSet;
    }
    return true;
}
function countDistinctLetters(word) {
    const usedLetters = new Set();
    for (const letter of word) {
        usedLetters.add(letter);
    }
    return usedLetters.size;
}
function countDistinctLettersInPairs(...words) {
    const combinedWord = words.join('');
    return countDistinctLetters(combinedWord);
}
const acceptableWords = words.filter(isValidWord);
let longestWord = '';
let mostDistinctWord = '';
let maxDistinctLetters = 0;
let bestPair = ['', ''];
let maxDistinctLettersInPair = 0;
let bestTriple = ['', '', ''];
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
}
else {
    console.log(`Word triple with most distinct letters: (${bestTriple[0]}, ${bestTriple[1]}, ${bestTriple[2]})`);
}

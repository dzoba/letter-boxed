declare module 'wordlist-english' {
  interface WordLists {
    [key: string]: string[];
  }

  const wordlist: WordLists;
  export = wordlist;
}
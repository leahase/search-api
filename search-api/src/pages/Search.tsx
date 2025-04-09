import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from "react";
import { SearchResult } from "../models/Searchresult";

<<<<<<< HEAD

export const Search = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [page, setPage] = useState<number>(1);
    

    const handleSearch = async (e:FormEvent, requestedPage = 1) => {
        e.preventDefault()
        setPage(requestedPage);

        const startIndex = ( requestedPage - 1) * 10 + 1;
=======
export const Search = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [results, setResults] = useState<SearchResult[]>([]);

    const handleSearch = async (e:FormEvent) => {
        e.preventDefault()
>>>>>>> 57f53f24c263658f304dcb22ee28725db95e2b37
        try {
            const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
            params: {
                q: searchText,
<<<<<<< HEAD
                key: process.env.API_KEY,
                cx: process.env.GOOGLE_CX,
                start: startIndex,
            },
=======
                key: 'AIzaSyCAAwq8YB6nSyxv3fchhHufYqAalokqpyE',
                cx: '26f67b9b7c5ac42e0',
            }
>>>>>>> 57f53f24c263658f304dcb22ee28725db95e2b37
          })
          setResults(response.data.items)
        } catch (error) {
            console.log(error)
        }
    }
            return (
                <>
                <h2 >Search API</h2>
                <section >
                  <form onSubmit={handleSearch}>
                    <input 
                      type="text" 
                      placeholder="search"  
                      onChange={(e: ChangeEvent<HTMLInputElement>) => { setSearchText(e.target.value)}}
                    />
                    
                    <button type="submit"> Search</button>
                  </form>
                </section>

                <section>
        {results.map((result, index) => (
          <div key={index}>
            <h3><a href={result.link}>{result.title}</a></h3>
            <p>{result.snippet}</p>
            {result.pagemap?.cse_image && result.pagemap.cse_image[0]?.src && (
              <img 
                src={result.pagemap.cse_image[0].src} 
                alt={result.title} 
                style={{ maxWidth: '200px' }} 
              />
            )}
          </div>
        ))}
      </section>
                </>
            )
      }
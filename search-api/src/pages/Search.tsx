import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from "react";
import { SearchResult } from "../models/Searchresult";

export const Search = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [page, setPage] = useState<number>(1);

    const handleSearch = async (e:FormEvent | null = null, requestedPage = 1) => {
       if (e) e.preventDefault();
        setPage(requestedPage);

        const startIndex = (requestedPage - 1) * 10 + 1;

        try {
            const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
            params: {
                q: searchText,
                key: import.meta.env.VITE_API_KEY,
                cx: import.meta.env.VITE_GOOGLE_CX,
                start: startIndex,
            },
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
                  <form onSubmit={(e) => handleSearch(e, 1)}>
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
        {results.length > 0 && (
          <div>
            <button onClick={() => handleSearch(null, page - 1)} disabled={page === 1}>
              previous page
            </button>
            <span>page {page}</span>
            <button onClick={() => handleSearch(null, page + 1)}>
              next page
            </button>
          </div>
        )}
        
      </section>
                </>
            )
      }
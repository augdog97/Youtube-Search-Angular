import { Inject, Injectable } from '@angular/core';
import {HttpClient, HttpRequest, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

import { Observable } from 'rxjs';
import { SearchResult } from './search-result.model';

/**
 * 1. Injecting Http, and YOUTUBE API data.
 *  - making injectables instance variables, can access by this.http or this.apikey
 * 2. Implementing the search function. search takes a query string and returns an Observable which will emit a sream of SearchResult[]. That is each item emitted is an ARRAY of SearchResults.
 *  - We build the queryUrl by concatenating the apiUrl and the params. 
 *  - Using the queryUrl to make our GET request.
 * 3. Taking the return value of http.get and use map to get the Response from the request.
 *  - From the response we extract the body as an object using .json() and then we iterate over each item and convert it to a SearchResult.
 *  - In <any> response that is <any>response.json(). We are telling TypeScript that we are not interested in doing strict type checking. 
 *  - When working with a JSON API, we dont generally have typing definitions for the API Responses, and so TypeScript wont know that Object returned even has an items key, so the compiler will complain.
 */

export const YOUTUBE_API_KEY =
  'AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk';
export const YOUTUBE_API_URL =
  'https://www.googleapis.com/youtube/v3/search';

@Injectable({
  providedIn: 'root'
})
export class YoutubesearchService {
  constructor(private http: HttpClient, @Inject(YOUTUBE_API_KEY) private apiKey: string, @Inject(YOUTUBE_API_URL) private apiUrl: string) { }

  search(query: string): Observable<SearchResult[]> {
    const params: string = [
      `q=${query}`,
      `key=${this.apiKey}`,
      `part=snippet`,
      `type=video`,
      `maxResults=10`
    ].join('&');
    const queryUrl = `${this.apiUrl}?${params}`;
    return this.http.get(queryUrl).pipe(map(response => {
      return <any>response['items'].map(item => {
        // console.log("raw item", item); // uncomment if you want to debug
        return new SearchResult({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnailUrl: item.snippet.thumbnails.high.url
        });
      });
    }));
    
  }
}

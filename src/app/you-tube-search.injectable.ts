import { YoutubesearchService, YOUTUBE_API_KEY, YOUTUBE_API_URL } from './youtubesearch.service';

/** 
 * 1. We are specifying that we want to bind YOUTUBE_API_KEY "injectably" to the value of API_KEY, same for the API_URL
*/

export const youTubeSearchInjectables: Array<any> = [
    { provide: YoutubesearchService, useClass: YoutubesearchService},
    {provide: YOUTUBE_API_KEY, useValue: YOUTUBE_API_KEY},
    {provide: YOUTUBE_API_URL, useValue: YOUTUBE_API_URL}
]
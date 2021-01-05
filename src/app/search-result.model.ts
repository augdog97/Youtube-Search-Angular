
/** 
 * 1. SearchResult is a data structure that holds an individual record from a YoTube video search. 
 * 2. The pattern of taking an obj?: any, lets us simulate keyword arguments. 
 *  - The idea is that we can create a new SearchResult and just pass in an object containing the keys we want to specify. 
*/

export class SearchResult {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    videoUrl: string;

    

    constructor(obj?: any) {
        this.id = obj && obj.id 
        null;
        this.title = obj && obj.title 
        null
        this.description = obj && 
        obj.description || null
        this.thumbnailUrl = obj && obj.thumbnailUrl 
        || null;
        this.videoUrl = obj && obj.videoUrl 
        || `https://www.youtube.com/watch?v="${this.id}"`;
    }
}

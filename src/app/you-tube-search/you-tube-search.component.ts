import { Component, OnInit } from '@angular/core';
import { SearchResult } from '../search-result.model';

/**
 * 1. instance variable results is an array of SearchResults.
 * 2. Defined updateResults function that takes the new SearchResult[] that it is given and sets this.results to the new value.
 */


@Component({
  selector: 'app-you-tube-search',
  templateUrl: './you-tube-search.component.html',
  styleUrls: ['./you-tube-search.component.css']
})
export class YouTubeSearchComponent implements OnInit {
results: SearchResult[];
loading: boolean;
  constructor() { }

  ngOnInit(): void {
  }

  updateResults(results: SearchResult[]): void {
    this.results = results;
    // console.log("results", this.results); // uncomment to see results
  }

}

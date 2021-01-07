import { Component, OnInit, Input } from '@angular/core';

import {SearchResult} from '../search-result.model';

/**
 * 1. @component takes in a single input result, on which we will put the SearchResult assigned to this component.
 *  - Passing the result from the searchbox down to the search result.
 *  - SearchResult component stores the SearchResult in the instance variable result.
 */

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  @Input() result: SearchResult;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Injectable } from '@angular/core';
@Injectable()
export class BookMultiqueryService {

  constructor() { }
  multiQueryBooks(query): string{
  
    var queryStr: string = 'http://localhost:53106/api/book/SearchMultiQuery?';
    Object.keys(query).forEach(function(v){
      if(v != "typeId"){
        queryStr += v +  "=" + query[v] + "&";  
      } 
    else {
        query["typeId"].forEach(function(typeId){
          queryStr += "typeId=" + typeId + "&";
        });
      }
    });
    return queryStr.substring(0,queryStr.length - 1);

  }
}

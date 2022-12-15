import { Component, Input, OnInit } from '@angular/core';
import { DataPhotoGrid } from 'src/app/model/gallery/data-photo-grid';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  @Input() dataPhotoGrid:DataPhotoGrid;

  constructor() { }

  ngOnInit(): void {
  }

}

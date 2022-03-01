import {AfterContentChecked, Component, OnInit, ViewChild} from '@angular/core';
import {FieldType} from "@ngx-formly/core";
import {FileAdapter} from "../../FileAdapter";
import {HttpClient} from '@angular/common/http';
import {SafeResourceUrl} from "@angular/platform-browser";
import {FilePickerComponent, FilePickerService, FilePreviewModel} from "ngx-awesome-uploader";
import {faFileWord, faFilePdf, faFileExcel, faFile} from '@fortawesome/free-regular-svg-icons';
import * as _ from 'lodash';

@Component({
  selector: 'app-field-file-upload',
  templateUrl: './field-file-upload.component.html',
  styleUrls: ['./field-file-upload.component.scss']
})
export class FieldFileUploadComponent extends FieldType implements OnInit, AfterContentChecked {
  @ViewChild('uploader', {static: false}) uploader: FilePickerComponent;
  adapter = new FileAdapter(this.http);
  fileType: string;
  faFileWord = faFileWord
  faFilePdf = faFilePdf
  faFileExcel = faFileExcel
  results: Array<any> = [];
  resultsTmp = [];

  constructor(private http: HttpClient, private fileService: FilePickerService) {
    super();
  }

  ngOnInit(): void {
    // setTimeout(() => {
    //
    // }, 100)
  }


  ngAfterContentChecked(): void {
    // this.parseResults(this.results)
    const preList = _.compact(_.uniq(_.concat([].concat(this.resultsTmp).concat(this.results) || [])));
    this.resultsTmp = preList.map(i => {
      i.fileType = i.fileType.toLowerCase();
      return i;
    })
    // console.log(this.results)
  }

  parseResults = (dataIn) => {
    console.log('------>', dataIn)
    try {
      // this.resultsTmp.push(dataIn)
    } catch (e) {
      return []
    }
  }


  getType = ($event: FilePreviewModel) => {
    return {
      fileItem: $event,
      fileType: getFileType($event.file.type),
      safeUrl: this.getSafeUrl($event.file)
    }
  }

  getSafeUrl(file: File | Blob): SafeResourceUrl {
    return this.fileService.createSafeUrl(file);
  }

  onUploadSuccess($event: FilePreviewModel): void {
    try {
      const {fileId} = $event
      const valueIn = _.first(JSON.parse(fileId));
      this.resultsTmp.push(valueIn)
      this.results.push(valueIn);
      // this.parseResults(valueIn)
      this.removeFileUpload($event);
    } catch (e) {
      console.log(e)
      this.results = null
    }
  }

  removeFileUpload(file: any): void {
    _.remove(this.uploader.files, (f) => {
      return (f?.fileName === file?.fileName);
    });
  }

  onRemoveSuccess($event: FilePreviewModel): void {
    console.log($event)
  }

  removeFile(fileItem: any): void {
    // console.log(fileItem)
    this.resultsTmp = this.resultsTmp.filter((n) => {
      return n?._id !== fileItem?._id
    });

    this.results = this.resultsTmp
  }


}

export function getFileType(fileExtension: string): string {
  if (fileExtension.includes('image')) {
    return 'image';
  } else if (fileExtension.includes('video')) {
    return 'video';
  } else {
    return 'other';
  }
}

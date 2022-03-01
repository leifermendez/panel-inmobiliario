import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FilePickerComponent, FilePickerService, FilePreviewModel, ValidationError} from 'ngx-awesome-uploader';
import {FileAdapter} from '../../../../FileAdapter';
import {HttpClient} from '@angular/common/http';
import {faFileWord, faFilePdf, faFileExcel, faFile} from '@fortawesome/free-regular-svg-icons';
import {SafeResourceUrl} from '@angular/platform-browser';
import {getFileType} from '../../../../components/field-file-upload/field-file-upload.component';
import * as _ from 'lodash';
import {RestService} from '../../../../rest.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  @Input() accommodation: string;
  @ViewChild('uploader', {static: false}) uploader: FilePickerComponent;
  adapter = new FileAdapter(this.http);
  people$: any = [
    {
      name: 'Reparar',
      value: 'repair',
    }
  ];
  faFileWord = faFileWord;
  faFilePdf = faFilePdf;
  faFileExcel = faFileExcel;
  selectedPersonId: any;
  public form: FormGroup;
  fileType: string;
  results: any;
  resultsTmp = [];
  loading: boolean;
  filesExtensions = ['jpg', 'png', 'jpeg', 'svg', 'pdf', 'doc', 'docx', 'xls', 'xlsx'];

  constructor(private formBuilder: FormBuilder, private http: HttpClient,
              private router: Router,
              private fileService: FilePickerService, private rest: RestService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      observation: ['', Validators.required],
      accommodation: ['', Validators.required],
      categories: [[], Validators.required],
      attachment: [[]]
    });

    this.form.patchValue({accommodation: this.accommodation});
  }

  send(): void {
    this.loading = true;
    this.form.patchValue({attachment: this.resultsTmp});
    this.rest.post(`task`, this.form.value).subscribe(res => {
      this.loading = false;
      this.rest.showToast('TASK');
      this.router.navigate(['/', 'task', res?._id]);
    }, err => this.loading = false);
  }

  test = () => {
    // this.toastr.info('lorem3lorem3lorem3lorem3lorem3lorem3','feafaef')
  }


  getType = ($event: FilePreviewModel) => {
    return {
      fileItem: $event,
      fileType: getFileType($event.file.type),
      safeUrl: this.getSafeUrl($event.file)
    };
  }


  getSafeUrl(file: File | Blob): SafeResourceUrl {
    return this.fileService.createSafeUrl(file);
  }

  onUploadSuccess($event: FilePreviewModel): void {
    try {
      const {fileId} = $event;
      this.resultsTmp.push(_.first(JSON.parse(fileId)));
      this.results = this.resultsTmp;
      setTimeout(() => {
        this.removeFileUpload($event);
      }, 250);
    } catch (e) {
      console.log(e);
      this.results = null;
    }
  }

  removeFileUpload(file: any): void {
    this.uploader.files = [];
  }

  onRemoveSuccess($event: FilePreviewModel): void {
    console.log($event);
  }

  removeFile(fileItem: any): void {
    // console.log(fileItem)
    this.resultsTmp = this.resultsTmp.filter((n) => {
      return n?._id !== fileItem?._id;
    });

    this.results = this.resultsTmp;
  }

  validationError($event: ValidationError): void {
    this.rest.showToast('UPS');

  }
}

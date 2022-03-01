import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Accommodation} from "../../../../models/Accommodation.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MapBoxCustomService} from "../../../map-box/map-box-custom.service";
import {FilePickerComponent, FilePickerService, FilePreviewModel, ValidationError} from "ngx-awesome-uploader";
import {getFileType} from "../../../../components/field-file-upload/field-file-upload.component";
import {SafeResourceUrl} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";
import {FileAdapter} from "../../../../FileAdapter";
import * as _ from 'lodash';
import {RestService} from "../../../../rest.service";
import {AccommodationService} from "../../accommodation.service";

@Component({
  selector: 'app-acc-edit',
  templateUrl: './acc-edit.component.html',
  styleUrls: ['./acc-edit.component.scss']
})
export class AccEditComponent implements OnInit, OnChanges {

  constructor(private formBuilder: FormBuilder,
              private fileService: FilePickerService,
              private http: HttpClient,
              private rest: RestService,
              private accommodationService: AccommodationService,
              public mapBoxCustomService: MapBoxCustomService) {
  }

  @ViewChild('uploader', {static: false}) uploader: FilePickerComponent;
  adapter = new FileAdapter(this.http);
  @Input() id: string
  @Input() data: Accommodation
  accommodationForm: FormGroup
  fileType: string;
  results: any;
  resultsTmp = [];
  loading: boolean;
  filesExtensions = ['jpg', 'png', 'jpeg'];
  channels = []
  selectChannels: any;
  status = [
    {
      name: 'Habilitado',
      value: 'available'
    },
    {
      name: 'Inhabilitado',
      value: 'unavailable'
    },
    {
      name: 'Posbile',
      value: 'lead'
    }
  ];

  ngOnInit(): void {
    this.channels = [...[
      {
        name: 'Airbnb',
        value: 'airbnb'
      },
      {
        name: 'Booking',
        value: 'booking'
      },
      {
        name: 'Expedia',
        value: 'expedia'
      }
    ]
    ]
    this.accommodationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      addressOptional: [''],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      channels: [[], Validators.required],
      status: ['', Validators.required],
      gallery: [[], Validators.required],
      vote: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes?.data?.currentValue) {
      const initialData = changes?.data?.currentValue;
      this.resultsTmp = initialData.gallery;
      this.accommodationForm.patchValue(initialData)
    }
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

  save(): void {
    this.loading = true
    this.accommodationForm.patchValue({gallery: this.resultsTmp})
    this.rest.patch(`accommodation/${this.id}`, this.accommodationForm.value).subscribe(res => {
      this.data = res;
      this.accommodationService.result.emit(res)
      this.rest.showToast('ACCOMMODATION')
      this.loading = false
    }, error => this.loading = false)
  }
}

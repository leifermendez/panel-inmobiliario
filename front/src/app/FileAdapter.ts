import {FilePreviewModel} from 'ngx-awesome-uploader';
import {HttpRequest, HttpClient, HttpEvent, HttpEventType} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {FilePickerAdapter} from 'ngx-awesome-uploader';
import {environment} from "../environments/environment";

export class FileAdapter extends FilePickerAdapter {
  constructor(private http: HttpClient) {
    super();
  }

  // tslint:disable-next-line:typedef
  public uploadFile(fileItem: FilePreviewModel) {
    const form = new FormData();
    form.append('files[]', fileItem.file);
    const api = `${environment.api}/storage`;
    const req = new HttpRequest('POST', api, form, {reportProgress: true});
    return this.http.request(req)
      .pipe(
        map((res: HttpEvent<any>) => {
          if (res.type === HttpEventType.Response) {
            return (typeof res.body.data !== 'string')  ? JSON.stringify(res.body.data) : res.body.data;
          } else if (res.type === HttpEventType.UploadProgress) {
            // Compute and show the % done:
            const UploadProgress = +Math.round((100 * res.loaded) / res.total);
            return UploadProgress;
          }
        })
      );
  }

  public removeFile(fileItem): Observable<any> {
    return of({});
  }
}

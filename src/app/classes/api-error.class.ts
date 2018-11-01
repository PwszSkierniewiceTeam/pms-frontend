import { HttpErrorResponse } from '@angular/common/http';

export class ApiError extends HttpErrorResponse {
  static fromHttpErrorResponse(res: HttpErrorResponse, translatePrefix: string = ''): ApiError {
    if (!(res instanceof HttpErrorResponse)) {
      // if there is problem in code, not in api response
      return res;
    }

    return new ApiError({
      error: res.error,
      headers: res.headers,
      status: res.status,
      statusText: res.statusText,
      url: res.url || undefined
    });
  }

  get(name: string): string[] {
    if (this.error) {
      if (this.error[name]) {
        return this.error[name];
      }

      if (this.error.error) {
        return this.getErrorByName(this.error.error, name);
      }
    }

    return [];
  }

  private getErrorByName(error: any, name: string): string[] {
    const arrProp = name.split('.');
    const l = arrProp.length;

    if (l === 1) {
      return error[name] || [];
    }

    let err = error;

    for (let i = 0; i < l; i++) {
      if (!err[arrProp[i]]) {
        return [];
      }
      err = err[arrProp[i]];
    }

    return err || [];
  }
}

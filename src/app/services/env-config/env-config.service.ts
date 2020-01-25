import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EnvConfigService {

  private config: any = {
    columns: {
      mainColumn:
          [
            {
              tag: 'advtech-panel',
              label: 'Main Details',
              children: [
                {
                  tag: 'advtech-text-input',
                  label: 'Headline',
                  formName: 'headline',
                },
                {
                  tag: 'advtech-textarea-input',
                  label: 'Dek',
                  formName: 'dek',
                },
              ],
            },
            {
              tag: 'advtech-panel',
              label: 'SEO',
              children: [
                {
                  tag: 'advtech-text-input',
                  label: 'SEO Headline',
                  formName: 'seoHeadline'
                },
                {
                  tag: 'advtech-textarea-input',
                  label: 'SEO Description',
                  formName: 'seoDescription'

                },
                {
                  tag: 'advtech-text-input',
                  label: 'SEO Keywords',
                },
                {
                  tag: 'advtech-textarea-input',
                  label: 'Twitter Description',
                },

              ],
            },
            {
              tag: 'advtech-panel',
              label: 'Vue Element',
              children: [
                {
                  tag: 'vue-widget',
                  label: 'Vue Widget',
                },
              ],
            },
          ],
    },
    syncConfig: [
      {
        master: 'headline',
        slave: 'seoDescription',
      },
      {
        master: 'headline',
        slave: 'seoHeadline',
      },
    ],
  };

  constructor(private httpClient: HttpClient) { }

  getConfig() {
    return this.config;
  }

  setConfig(config: any) {
    this.config = config;
  }
}

import { Injectable } from '@nestjs/common';

interface StringMap {
  [attr: string]: string;
}

interface MultiStringMap {
  [key: string]: string | StringMap;
}

class PageBuilder {
  public static getMetaTags(data: StringMap[]): string {
    let result = '';
    data.forEach(object => {
      const subResult: string[] = [];
      Object.entries(object).forEach(pair => {
        subResult.push(`${pair[0]}="${pair[1]}"`);
      });
      if (subResult.length === 0) {
        return;
      }
      result += `<meta ${subResult.join(' ')}>`;
    });

    return result;
  }
}

class SubPage {
  private readonly metaTags: StringMap[] = [];
  private readonly bodyContent: string[] = [];
  private language = 'en';
  public constructor(private readonly title: string) {
    this.addMetaTagDefault(
      'viewport',
      'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
    );
    this.addMetaTag({
      'http-equiv': 'X-UA-Compatible',
      content: 'ie=edge',
    });
    this.setCharset();
  }

  public addContent(bodyContent: string): SubPage {
    this.bodyContent.push(bodyContent);
    return this;
  }

  public build(): string {
    const language = this.language ? `<html lang="${this.language}">` : '';
    return `<!doctype html>
    ${language}
    <head>
        ${PageBuilder.getMetaTags(this.metaTags)}
        <title>${this.title}</title>
    </head>
    <body>
      ${this.bodyContent.join('\n')}  
    </body>
    </html>
    `;
  }

  public setCharset(charset = 'UTF-8'): SubPage {
    this.metaTags.push({ charset });
    return this;
  }

  public setLanguage(language: string): SubPage {
    this.language = language;
    return this;
  }
  public addMetaTagDefault(name: string, content: string): SubPage {
    this.metaTags.push({ name, content });
    return this;
  }

  public addMetaTag(key: string | StringMap, value?: string): SubPage {
    if (typeof key === 'string') {
      if (key === 'charset') {
        throw new Error('Charset is set by method setCharset');
      }
      this.metaTags.push({ [key]: value });
    } else {
      this.metaTags.push(key);
    }
    return this;
  }
}

@Injectable()
export class PageCreatorService {
  public create(title: string): SubPage {
    return new SubPage(title);
  }
}

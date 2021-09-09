import DLError from 'models/DLError';
import * as Utils from './';
import log from './logger';

describe('dom - getElClass', () => {
  test('it returns a prefixed HTML class name string', () => {
    const str1 = Utils.getElClass('comp', 'modal');
    const str2 = Utils.getElClass('page', 'home');
    const str3 = Utils.getElClass('page', 'posts');
    const str4 = Utils.getElClass('chart', 'line');
    const str5 = Utils.getElClass(null, 'typeless');

    expect(str1).toEqual('DLComp-modal');
    expect(str2).toEqual('DLPage-home');
    expect(str3).toEqual('DLPage-posts');
    expect(str4).toEqual('DLChart-line');
    expect(str5).toEqual('DL-typeless');
  });

  test('it throws an error if name is empty', () => {
    expect(() => {
      Utils.getElClass('comp');
    }).toThrow();
  });
});

describe('dom - getElId', () => {
  test('it returns a prefixed HTML id string', () => {
    const id1 = Utils.getElId('page', 'home');
    const id2 = Utils.getElId('comp', 'header');
    const id3 = Utils.getElId('comp', 'footer');
    const id4 = Utils.getElId(null, 'footer');

    expect(id1).toEqual('dlabs-page-home');
    expect(id2).toEqual('dlabs-comp-header');
    expect(id3).toEqual('dlabs-comp-footer');
    expect(id4).toEqual('dlabs-footer');
  });

  test('if name is empty, it returns an HTML id string with random number string', () => {
    const id1 = Utils.getElId('page');
    const id2 = Utils.getElId();

    expect(id1).toMatch(/^dlabs-page-\d+$/);
    expect(id2).toMatch(/^dlabs-\d+$/);
  });
});

describe('dom - getElTestId', () => {
  test('it returns a prefixed HTML id string', () => {
    const id1 = Utils.getElTestId('form-button');
    const id2 = Utils.getElTestId('my-custom-test-id');
    const id3 = Utils.getElTestId('another-test-component');

    expect(id1).toEqual('dlabs-test-id-form-button');
    expect(id2).toEqual('dlabs-test-id-my-custom-test-id');
    expect(id3).toEqual('dlabs-test-id-another-test-component');
  });

  test('it throws an error if name is empty', () => {
    expect(() => {
      Utils.getElTestId();
    }).toThrow(DLError);
  });
});

describe('formatters - formatThemeProperty', () => {
  test('it formats material ui theme properties correctly for style guide', () => {
    const property1 = Utils.formatThemeProperty('fontSize');
    const property2 = Utils.formatThemeProperty('textTransform');
    const property3 = Utils.formatThemeProperty('letterSpacing');
    const property4 = Utils.formatThemeProperty();

    expect(property1).toMatch('Font Size');
    expect(property2).toMatch('Text Transform');
    expect(property3).toMatch('Letter Spacing');
    expect(property4).toMatch('');
  });
});

describe('formatters - formatHash', () => {
  test('it returns a hash trimmed to the length supplied', () => {
    const hash1 = Utils.formatHash('jkl342ijo234890ger8hj903490u');
    const hash2 = Utils.formatHash('owe98453jkhbfd8s9u345fg34n56', 12);
    const hash3 = Utils.formatHash('vier92345iohger0989drge34s34', 5);
    const hash4 = Utils.formatHash();

    expect(hash1).toMatch('jkl342ij');
    expect(hash2).toMatch('owe98453jkhb');
    expect(hash3).toMatch('vier9');
    expect(hash4).toMatch('system');
  });
});

describe('formatters - formatTimestamp', () => {
  test('it formats a timestamp correctly using luxon', () => {
    const datetime1 = Utils.formatTimestamp(1616104167413);
    const datetime2 = Utils.formatTimestamp(1616104207375);

    // TODO: fix issue with github actions running tests in a diff timezone
    expect(datetime1).toMatch('Mar 18, 2021, 2:49:27 PM');
    expect(datetime2).toMatch('Mar 18, 2021, 2:50:07 PM');
  });
});

describe('log - logging', () => {
  test('console.debug outputs expected message through logger', () => {
    const message = 'this is a debug log message';
    console.debug = jest.fn();

    log.debug(message);

    expect(console.debug).toHaveBeenCalledWith(message);
  });

  test('console.info outputs expected message through logger', () => {
    const message = 'this is an info log message';
    console.info = jest.fn();

    log.info(message);

    expect(console.info).toHaveBeenCalledWith(message);
  });

  test('console.warn outputs expected message through logger', () => {
    const message = 'this is a warn log message';
    console.warn = jest.fn();

    log.warn(message);

    expect(console.warn).toHaveBeenCalledWith(message);
  });

  test('console.error outputs expected message through logger', () => {
    const message = 'this is a warn log message';
    console.error = jest.fn();

    log.error(message);

    expect(console.error).toHaveBeenCalledWith(message);
  });
});

describe('postHelpers - getPostBody', () => {
  test('it returns the content of the post', () => {
    const content = 'This is the body content';
    const post = { fields: { body: { content } } };
    const result = Utils.getPostBody(post);

    expect(result).toStrictEqual(content);
  });

  test('it returns null if no post if found', () => {
    const result = Utils.getPostBody();

    expect(result).toStrictEqual(null);
  });
});

describe('postHelpers - getPostDate', () => {
  test('it returns the publish date of the post', () => {
    const publishDate = '2021-03-18';
    const post = { fields: { publishDate } };
    const result = Utils.getPostDate(post);

    expect(result).toStrictEqual(publishDate);
  });
  test('it returns null if no post if found', () => {
    const result = Utils.getPostDate();

    expect(result).toStrictEqual(null);
  });
});

describe('postHelpers - getPostDescription', () => {
  test('it returns the description of the post', () => {
    const description = "This is a post's description";
    const post = { fields: { description } };
    const result = Utils.getPostDescription(post);

    expect(result).toStrictEqual(description);
  });

  test('it returns null if no post if found', () => {
    const result = Utils.getPostDescription();

    expect(result).toStrictEqual(null);
  });
});

describe('postHelpers - getPostHeroImageUrl', () => {
  test('it returns the hero image url of the post', () => {
    const url = 'http://a.test.url';
    const post = { fields: { heroImage: { fields: { file: { url } } } } };
    const result = Utils.getPostHeroImageUrl(post);

    expect(result).toStrictEqual(url);
  });

  test('it returns null if no hero image is found', () => {
    const post = { fields: { noHeroImage: {} } };
    const result = Utils.getPostHeroImageUrl(post);

    expect(result).toStrictEqual(null);
  });
});

describe('postHelpers - getPostSlug', () => {
  test('it returns the url slug of the post', () => {
    const slug = 'this-is-a-slug';
    const post = { fields: { slug } };
    const result = Utils.getPostSlug(post);

    expect(result).toStrictEqual(slug);
  });

  test('it returns null if no post if found', () => {
    const result = Utils.getPostSlug();

    expect(result).toStrictEqual(null);
  });
});

describe('postHelpers - getPostTags', () => {
  test('it returns the url slug of the post', () => {
    const tags = ['these', 'are', 'tags'];
    const post = { fields: { tags } };
    const result = Utils.getPostTags(post);

    expect(result).toStrictEqual(tags);
  });

  test('it returns null if no post if found', () => {
    const result = Utils.getPostTags();

    expect(result).toStrictEqual(null);
  });
});

describe('postHelpers - getPostTitle', () => {
  test('it returns the title of the post', () => {
    const title = 'This is the Post Title';
    const post = { fields: { title } };
    const result = Utils.getPostTitle(post);

    expect(result).toStrictEqual(title);
  });

  test('it returns null if no post if found', () => {
    const result = Utils.getPostTitle();

    expect(result).toStrictEqual(null);
  });
});

describe('rfdc - deepClone', () => {
  test('it returns a new deep cloned object', () => {
    const testObj = {
      a: '1',
      b: { ba: 'adsf', bb: 2314 },
      c: { ca: { caa: 'sdfj' } },
    };

    const clonedObj = Utils.deepClone(testObj);

    expect(clonedObj).toStrictEqual(testObj);
    expect(clonedObj === testObj).toEqual(false);
  });
});

describe('utils - capitalize', () => {
  test('it returns a capitalized string', () => {
    const str1 = Utils.capitalize('modal');
    const str2 = Utils.capitalize('dreamist');

    expect(str1).toEqual('Modal');
    expect(str2).toEqual('Dreamist');
  });

  test('it returns an empty string if nothing is provided', () => {
    const str = Utils.capitalize('');

    expect(str).toEqual('');
  });
});

describe('utils - getRandomNumber', () => {
  test('it returns a random number with the given length', () => {
    const str1 = Utils.getRandomNumber(2, 0);
    const str2 = Utils.getRandomNumber(4, 0);
    const str3 = Utils.getRandomNumber(9, 0);
    const str4 = Utils.getRandomNumber(null, 0);

    expect(str1).toMatch(/\d{2}/);
    expect(str2).toMatch(/\d{4}/);
    expect(str3).toMatch(/\d{9}/);
    expect(str4).toMatch(/\d{1,5}/);
  });

  test('it returns a random number with the given length and decimals', () => {
    const str1 = Utils.getRandomNumber(4, 4);
    const str2 = Utils.getRandomNumber(4, 1);
    const str3 = Utils.getRandomNumber(4, 9);
    const str4 = Utils.getRandomNumber(4);

    expect(str1).toMatch(/\d{4}\.(\d{4})/);
    expect(str2).toMatch(/\d{4}\.(\d{1})/);
    expect(str3).toMatch(/\d{4}\.(\d{9})/);
    expect(str4).toMatch(/\d{4}\.(\d{3})/);
  });
});

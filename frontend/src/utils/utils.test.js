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
    }).toThrow(DLError);
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

describe('log - logging', () => {
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

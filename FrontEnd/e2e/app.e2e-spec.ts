import { RouterParamPage } from './app.po';

describe('router-param App', function() {
  let page: RouterParamPage;

  beforeEach(() => {
    page = new RouterParamPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

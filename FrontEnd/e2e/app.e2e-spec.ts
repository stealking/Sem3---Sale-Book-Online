import { TestFormPage } from './app.po';

describe('test-form App', function() {
  let page: TestFormPage;

  beforeEach(() => {
    page = new TestFormPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

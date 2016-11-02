import { DevChallengePage } from './app.po';

describe('dev-challenge App', function() {
  let page: DevChallengePage;

  beforeEach(() => {
    page = new DevChallengePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

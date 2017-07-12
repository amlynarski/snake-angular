import { TetrisPage } from './app.po';

describe('tetris App', () => {
  let page: TetrisPage;

  beforeEach(() => {
    page = new TetrisPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

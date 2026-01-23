// Shared button locators/actions for page objects live here when introduced.
//
// Example usage:
//   // buttons.component.ts (future)
//   // export class ButtonsComponent { constructor(private page: Page, private testInfo: TestInfo) {} }
//   // async clickSave(): Promise<void> { await this.page.getByRole('button', { name: /save/i }).click(); }
//
//   // some-page.ts
//   // private readonly buttons: ButtonsComponent;
//   // constructor(page: Page, testInfo: TestInfo) {
//   //   super(page, testInfo);
//   //   this.buttons = new ButtonsComponent(page, testInfo);
//   // }
//   // async save(): Promise<void> { await this.buttons.clickSave(); }
//
// Example usage (test with fixtures):
//   // test('user can save', async ({ somePage }) => {
//   //   await somePage.save();
//   // });

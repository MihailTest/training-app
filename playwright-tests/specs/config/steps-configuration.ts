import { test } from '@playwright/test';

function formatMessage(message: string, args: unknown[]): string {
  return message.replace(/\{(\d+)\}/g, (_, index) => String(args[Number(index)]));
}

/**
 * Decorator that wraps a function with a Playwright test step.
 * Used for reporting purposes.
 *
 * @example
 ```
    import { step } from './steps-configuration';
    class MyTestClass {
        @step('Click the first {0} product')
        async clickTheFirstProduct(productType: 'regular' | 'custommade' | 'mixandmatch') {
            // Test code goes here
        }

        @step('Select size {0} for product {1}')
        async selectSize(size: string, productName: string) {
            // Test code goes here
        }
    }
 ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function step(message?: string): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function actualDecorator(target: any, context: any): any {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function replacementMethod(this: any, ...args: any[]) {
      const name = message ? formatMessage(message, args) : `${this.constructor.name}.${context.name as string}`;

      return test.step(name, async () => target.call(this, ...args), {
        box: true,
      });
    };
  };
}

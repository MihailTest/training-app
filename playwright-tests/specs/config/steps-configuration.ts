import { test } from '@playwright/test';

type AsyncMethod<This, Args extends unknown[], Result> = (this: This, ...args: Args) => Promise<Result>;

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
export function step(message?: string) {
  return function <This, Args extends unknown[], Result>(
    target: AsyncMethod<This, Args, Result>,
    context: ClassMethodDecoratorContext<This, AsyncMethod<This, Args, Result>>
  ): AsyncMethod<This, Args, Result> {
    return async function replacementMethod(this: This, ...args: Args): Promise<Result> {
      const methodName = String(context.name);
      const stepName = message ? formatMessage(message, args) : methodName;

      return test.step(stepName, () => target.call(this, ...args), {
        box: true,
      });
    };
  };
}

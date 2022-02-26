import { readFile, writeFile } from 'fs/promises';
import { exec } from 'child_process';
import { join } from 'path';

const script = `
	import { deepStrictEqual } from 'assert';

	export default class Calculator {
		sum (...numbers: Array<number>) {
			return numbers.reduce((acc: number, currentValue: number): number => {
				return acc + currentValue
			})
		}
	}

	const calc = new Calculator()

	deepStrictEqual(calc.sum(1, 2), 3)
`;

class Hyus {
  protected path: string;

  constructor(path: string) {
    this.path = join(__filename, path);
  }

  private async scriptContent() {
    return await readFile(this.path);
  }

  async overrideScript(script: string) {
    return await writeFile(this.path, script).then(() => {
      exec('npx prettier -w ./src/test/module.spec.ts');
    });
  }

  async addScript(script: string) {
    return await writeFile(this.path, [await this.scriptContent(), script]);
  }
}

const hyus = new Hyus('../../../src/test/module.spec.ts');

hyus.addScript(script);

import chalk from "chalk";

class Logger {
  static error(...messages: any[]) {
    console.error(chalk.red(messages));
  }

  static info(...messages: any[]) {
    if (process.env.NODE_ENV === "prod") return;
    console.error(chalk.blue(messages));
  }

  static debug(...messages: any[]) {
    if (process.env.NODE_ENV !== "test") return;
    console.debug(chalk.yellow(messages));
  }

  static verbose(...messages: any[]) {
    if (process.env.NODE_ENV === "prod") return;
    console.log(chalk.magenta(messages));
  }

  static connect(...messages: any[]) {
    console.log(chalk.green(messages));
  }
}

export { Logger };

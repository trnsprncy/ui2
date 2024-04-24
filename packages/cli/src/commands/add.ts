import { Registry } from "@/registry/schema";
import { registryIndexSchema } from "@/registry/schema";
import {
  fetchRegistry,
  getComponentInfo,
  fetchFileContentFromGithub,
  getPaths,
  createFiles,
} from "@/utils/registry/index";
// import { renderTitle } from "@/utils/render-title.js";
import chalk from "chalk";
import { Command } from "commander";
import ora from "ora";
import prompts from "prompts";
import { z } from "zod";

const highlights = {
  info: (text: string) => chalk.cyan.underline(text),
  success: (text: string) => chalk.greenBright(text),
  error: (text: string) => chalk.redBright(text),
  warning: (text: string) => chalk.yellowBright(text),
};

const addOptionsSchema = z.object({
  components: z.array(z.string()).optional(),
  yes: z.boolean(),
  overwrite: z.boolean(),
  cwd: z.string(),
  all: z.boolean(),
  path: z.string().optional(),
});

export const add = new Command()
  .name("add")
  .description("Prints a greeting message")
  .argument("[components...]", "the components to add")
  .option("-y, --yes", "skip confirmation prompt.", true)
  .option("-o, --overwrite", "overwrite existing files.", false)
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .option("-a, --all", "add all available components", false)
  .option("-p, --path <path>", "the path to add the component to.")
  .action(async (components, opts) => {
    const options = addOptionsSchema.parse({ components, ...opts });

    const registryIndex: Registry = registryIndexSchema.parse(
      await fetchRegistry()
    );

    let selectedComponents = options.all
      ? registryIndex.map((entry) => entry.name)
      : options.components;

    if (!options.components?.length) {
      // validate command arguments
      const { components } = await prompts({
        type: "multiselect",
        name: "components",
        message: "Which components would you like to add?",
        hint: "Space to select. A to toggle all. Enter to submit.",
        instructions: false,
        choices: registryIndex.map((entry) => ({
          title: entry.name,
          value: entry.name,
          selected: options.all
            ? true
            : options.components?.includes(entry.name),
        })),
      });
      selectedComponents = components;
    }

    if (!selectedComponents?.length) {
      ora(
        highlights.warning(`no component was requested!\n  exiting.....`)
      ).fail();
      process.exit(1);
    }

    // get the path of the selected component
    const selectedComponentsInfo = await getComponentInfo(selectedComponents);
    // const componentPaths = getPaths(selectedComponentsInfo);

    // const data = await fetchFileContentFromGithub(componentPaths);
    // createFiles(selectedComponents, data);

    if (!options.yes) {
      const { proceed } = await prompts({
        type: "confirm",
        name: "proceed",
        message: `Ready to install components and dependencies. Proceed?`,
        initial: true,
      });

      if (!proceed) {
        process.exit(0);
      }
    }

    const spinner = ora(`Installing components...`).start();
    for (const item of selectedComponentsInfo) {
      spinner.text = `Installing ${item.name}...`;



      const data = await fetchFileContentFromGithub(item.files)
      createFiles(data.filenames,data.contents);
    }

    process.exit(0);
  });

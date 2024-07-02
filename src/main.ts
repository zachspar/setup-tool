import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
// import { wait } from './wait'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const name: string = core.getInput('name')
    const url: string = core.getInput('url')

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`Starting setup of ${name}  ...`)

    // await wait(parseInt(ms, 10))
    // fetch tarball
    core.debug(`Downloading ${name} from ${url} ...`)
    const pathToTarball = await tc.downloadTool(url)

    // extract tarball
    core.debug(`Extracting ${name} ...`)
    const pathToExtracted = await tc.extractTar(pathToTarball)

    // add binary to path
    core.debug(`Adding ${name} to path ...`)
    core.addPath(pathToExtracted)

    // Set output of tool path
    core.debug(`Setting output 'tool-path' to ${pathToExtracted} ...`)
    core.setOutput('tool-path', pathToExtracted)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}

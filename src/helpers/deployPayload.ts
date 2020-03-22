import { execFile, ExecException } from 'child_process';
import { CheckSuitePayload } from '../types';

const deployPayload = (payload: CheckSuitePayload): Promise<void> => new Promise((resolve, reject) => {
  const script = process.env.WEBHOOK_SCRIPT_FILE || `${__dirname}/../test/test.sh`;

  const {
    check_suite: { status, conclusion, head_branch: branch },
    repository: { name: repo },
  } = payload;

  if (status !== 'completed' || conclusion !== 'success' || branch !== 'master') {
    resolve();
    return;
  }

  execFile('sh', [script, repo], (err: ExecException | null, stdout: string, stderr: string) => {
    if (err) {
      return reject(err);
    }

    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
    return resolve();
  });
});

export default deployPayload;

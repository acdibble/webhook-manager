// import { execFile, ExecException } from 'child_process';
import { WebhookPayload } from '../types';

const deployPayload = (payload: WebhookPayload): Promise<void> => new Promise((resolve) => {
  // const script = process.env.WEBHOOK_SCRIPT_FILE || `${__dirname}/../test/test.sh`;

  console.log(payload);
  resolve();

  //   execFile('sh', [script, ref, refType, repo], (err: ExecException | null, stdout: string, stderr: string) => {
  //     if (err) {
  //       return reject(err);
  //     }

//     if (stdout) console.log(stdout);
//     if (stderr) console.error(stderr);
//     return resolve();
//   });
});

export default deployPayload;

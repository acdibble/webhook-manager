import { Writable, WritableOptions } from 'stream';
import { StringDecoder } from 'string_decoder';

export default class StringWritable extends Writable {
  data: string;

  private decoder: StringDecoder;

  constructor(options?: WritableOptions) {
    super(options);
    this.decoder = new StringDecoder(options && options.defaultEncoding);
    this.data = '';
  }

  // eslint-disable-next-line no-underscore-dangle
  _write(chunk: Buffer, encoding: 'buffer', callback?: () => void): void {
    this.data += encoding === 'buffer' ? this.decoder.write(chunk) : chunk;
    callback?.();
  }

  // eslint-disable-next-line no-underscore-dangle
  _final(callback?: () => void): void {
    this.data += this.decoder.end();
    callback?.();
  }
}

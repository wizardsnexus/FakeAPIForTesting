import { default as cli } from 'command-line-args';

const definitions = [
    { name: "port", type: Number , multiple: false, defaultOption: false }
]

const options = cli(definitions);

export { options };
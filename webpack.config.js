const path = require('path');
module.exports = {
    mode: 'production',
    entry: {
        main: './src/index.ts'
    },
    module: {
        rules: [
            {
                test: /[^(\.d)].ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs',
    },
    resolve: {
        extensions: ['.ts']
    }
}
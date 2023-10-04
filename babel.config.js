module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            }
        ],
        '@babel/preset-typescript'
    ],
    plugins: [
        ['module-resolver', {
            alias: {
                '@controller': './src/controller',
                '@views': './src/views'
            }
        }]
    ],
    ignore: [
        '**/*.spec.ts'
    ]
}
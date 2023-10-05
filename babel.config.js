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
                '@repositories': './src/repositories',
                '@services': './src/services',
                '@infra': './src/config/infrastructure',
                '@config': './src/config',
                '@views': './src/views'
            }
        }]
    ],
    ignore: [
        '**/*.spec.ts'
    ]
}
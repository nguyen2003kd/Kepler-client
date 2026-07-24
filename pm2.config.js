module.exports = {
    apps: [
        {
            name: "kepler-property",
            script: "node_modules/next/dist/bin/next",
            args: "start",
            autorestart: true,
            watch: false,
            max_restarts: 10,
            instances: 1,
            exec_mode: 'fork',
            env: {
                NODE_ENV: "production",
                PORT: 3002,
                HOST: "0.0.0.0",
            },
            env_file: ".env",
            out_file: "./logs/kepler-property.out.log",
            error_file: "./logs/kepler-property.err.log",
            merge_logs: true
        }
    ]
}

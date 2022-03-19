module.exports = {
    apps: [
        {
            name: "itarmyhelper_bot",
            script: "build/itarmyhelper/index.js",
            instances: 1,
            autorestart: true,
            watch: false,
            env: {
                NODE_ENV: "development",
            },
            env_production: {
                NODE_ENV: "production",
            },
        },
        {
            name: "admin_bot",
            script: "build/admin/index.js",
            instances: 1,
            autorestart: true,
            watch: false,
            env: {
                NODE_ENV: "development",
            },
            env_production: {
                NODE_ENV: "production",
            },
        },
    ],
};

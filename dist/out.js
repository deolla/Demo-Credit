System.register("server", ["express", "dotenv", "body-parser", "cors"], function (exports_1, context_1) {
    "use strict";
    var express_1, dotenv_1, body_parser_1, cors_1, app, PORT;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (express_1_1) {
                express_1 = express_1_1;
            },
            function (dotenv_1_1) {
                dotenv_1 = dotenv_1_1;
            },
            function (body_parser_1_1) {
                body_parser_1 = body_parser_1_1;
            },
            function (cors_1_1) {
                cors_1 = cors_1_1;
            }
        ],
        execute: function () {
            // import userRouter from './routes/user';
            // import authRouter from './routes/auth';
            dotenv_1.default.config();
            app = express_1.default();
            PORT = process.env.PORT || 3000;
            app.use(express_1.default.json());
            app.use(express_1.default.urlencoded({ extended: true }));
            app.use(body_parser_1.default.json());
            app.use(cors_1.default());
            // routes.
            //app.use('/api/users', userRouter);
            // app.use('/api/auth', authRouter);
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT} 🚀`);
            });
        }
    };
});
//# sourceMappingURL=out.js.map
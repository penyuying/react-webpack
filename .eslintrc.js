// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    globals: {
        angular: true
    },
    parser: 'babel-eslint',
    'env': {
        'es6': true,
        'browser': true
    },
    parserOptions: {
        "ecmaVersion": 6,
        "ecmaFeatures": {
            "jsx": true,
            "vue": true,
            "json": true,
            "html": true
        },
        sourceType: 'module'
    },
    extends: 'airbnb',
    // required to lint *.vue files
    plugins: [
        'html',
        "json"
    ],
    // add your custom rules here
    'rules': {
        "standard/no-callback-literal": 0,
        "bad-json": 0,
        "no-mixed-spaces-and-tabs": [2, true],
        "require-jsdoc": ["error", {
            "require": {
                "FunctionDeclaration": true,
                "MethodDefinition": false,
                "ClassDeclaration": false,
                "ArrowFunctionExpression": false
            }
        }],
        "valid-jsdoc": ["error",
            {
                "prefer": {
                    "arg": "param",
                    "argument": "param",
                    "class": "class",
                    "constructor": "constructor",
                    // "return": "returns",
                    "virtual": "abstract"
                },
                "preferType": {
                    // "boolean": "Boolean",
                    // "number": "Number",
                    // "object": "Object",
                    // "string": "String"
                }, //类型格式
                "matchDescription": ".+", //必须写描述
                "requireReturn": false, //没有返回值可以不用写@return
                "requireReturnType": true, //必须写返回类型
                "requireReturnDescription": false,
                "requireParamDescription": true
            }
        ],
        "space-infix-ops": 0,
        "linebreak-style": [2, "windows"], //换行风格
        'no-undef': 0,
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        "semi": ["error", "always"],
        "indent": [2, 4, {
            "SwitchCase": 1,
            "VariableDeclarator": 1,
            "MemberExpression": 1
        }],
        "eol-last": 0,
        "space-before-function-paren": 0,
        "one-var": 0,
        "eqeqeq": 0,
        "space-before-blocks": 2,
        "max-len":[2,140],
        "max-lines":[2,300],
        "no-unused-vars":0,
        "no-new":0,
        "import/no-unresolved": [2, {commonjs: true, amd: true}],
        "import/named": 2,
        "import/namespace": 2,
        "import/default": 2,
        "import/export": 2,
        "import/extensions": 0,
        "import/no-extraneous-dependencies": 0, // 检查引用的node_modules模块
        "import/no-unresolved": 0, // 检查引用的模块
        "react/jsx-indent": [
            4,
            "space"
        ],
        "function-paren-newline": 0,
        "no-console": 0,
        "react/require-default-props": 0
    }
}

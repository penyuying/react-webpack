'use strict'
const path = require('path')
const packageConfig = require('../package.json')

const glob = require('glob');

const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const minimist= require('minimist');

const evnOptions = {
    string: 'env',
    default: {
        host: process.env.NODE_ENV || '',
        env: process.env.NODE_ENV || '',
        environments: process.env.NODE_ENV || ''
    }
};

const env = minimist(process.argv.slice(2), evnOptions);


/**
 * 获取参数变量数据
 *
 * @returns
 */
export function getEvnConfig(){
    return env;
}

/**
 * 获取环境变量名称
 *
 * @export
 */
export function getNodeEvn(){
    let config = getEvnConfig();
    let res = config.env || '';

    switch (config.env) {
        case 'dev':
        case 'development':
            res = 'development';
            break;
        case 'prod':
        case 'production':
            res = 'production';
            break;

        default:
            break;
    }
    if(!process.env.NODE_ENV) {
        process.env.NODE_ENV = res;
    } else {
        res = process.env.NODE_ENV;
    }

    console.log('NODE_ENV', res);

    return res;
}
getNodeEvn();
/**
 * 获取环境变量名
 *
 * @returns {string}
 */
export function getEvnFileName(){
    let config = getEvnConfig();
    let res = 'environment';
    if(config.env && config.env!=='dev'){
        res=res+'.'+config.env;
    }
    return res + '.ts';
}

/**
 * 生成模板松配置文件
 *
 * @param {string|object|Array} config
 * @returns {Array}
 */
export function getHtmlPlugin(config){
    const envType=process.env.NODE_ENV;
    let plugins=[];
    let conf;
    if(typeof(config)==='string'){
        conf=genPluginItem({
            filename: config,
            template: config
        });
        if(conf){
            plugins.push(conf);
        }
    } else if(config instanceof Array){
        config.forEach(item=>{
            conf=genPluginItem(item);
            if(conf){
                plugins.push(conf);
            }
        });
    } else if(config instanceof Object){
        conf=genPluginItem(config);
        if(conf){
            plugins.push(conf);
        }
    }

    return plugins;

    /**
     * 生成HTML模板项
     *
     * @param {any} item
     * @returns
     */
    function genPluginItem(item){
        let res=merge({
            filename: '',
            template: '',
            inject: false
        },item);

        if(envType==='testing'||envType==='production'){
            res=merge(res,{
                minify: {
                    // removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                    // more options:
                    // https://github.com/kangax/html-minifier#options-quick-reference
                },
                // necessary to consistently work with multiple chunks via CommonsChunkPlugin
                chunksSortMode: 'dependency'
            });
        }
        if(!res||!res.filename){
            return false;
        }

        if(!res.template){
            res.template=res.filename;
        }
        return new HtmlWebpackPlugin(res);
    }
}


export function getHtmlPath(params){
    // return {
    //     filename: 'pages/index.html',
    //     template: 'pageTpls/index.html'
    // }
    return getSrcPath(merge({
        extfix:'html'
    },params),(entries,parms)=>{
        if(entries instanceof Array){
            entries=entries;
        }else{
            entries=[];
        }
        entries.push({
            template: parms.filePath,//parms.entry,//path.join('../'+parms.filePath).replace(/\\/g, '/'),
            filename: path.join(parms.prefix,parms.pathName).replace(/\\/g, '/')
        });
        return entries;
    });
}

export function getMainPath(params, extfix) {
    return getSrcPath(merge({
        extfix: extfix || 'js'
    },params),
        (entries,parms)=>{
            entries[path.join(parms.prefix||'',parms.childDir||'',parms.basename||'').replace(/\\/g, '/')] = parms.entry;
            // console.log(entries,parms);
            return entries;
        }
    );
}

/**
 * 获取文件路径
 *
 * @param {Object} params 目录
 * @param {String} params.srcPath 目录
 * @param {Object} params.entriesDir 已选中的路径
 * @param {String} params.prefix 路径前缀
 * @param {String} params.isDelfix 是否需要去除的路径后缀
 * @param {String} params.extfix 查找的文件后缀
 * @param {Function} filterBack 文件路径过滤器
 * @returns {Object} 返回查找到的路径
 */
export function getSrcPath(params,filterBack) {
    const prefix = (params.prefix || '') + '';
    const extfix = (params.extfix || '') + '';
    const isDelfix = params.isDelfix || false;
    const files = glob.sync(params.srcPath);
    let entries = params.entriesDir || {};

    //去除后缀及**/*.
    const reg = new RegExp('\\\\*\\/*\\**\\\\*\\/*\\*+\.*(' + extfix + ')*$');//生成/\\*\/*\**\\*\/*\*+.*(html)*$/
    const _reDir = reg && params.srcPath.replace(reg, '')||params.srcPath;
    const _regDir = _reDir && (new RegExp('^\\s*' + _formatRegText(_reDir) + '\\\\*\\/*'));
    const _cwdDir = (new RegExp('^\\s*' + _formatRegText(process.cwd()) + '\\\\*\\/*'));
    let entry;
    let dirname;
    let basename;

    for (let i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        basename = path.basename(entry, extfix);
        if(basename.slice(-1)==='.'){
            basename = basename.slice(0,-1)
        }
        let _name = path.join(dirname, basename+(extfix && '.'+extfix||'')).replace(/\\/g, '/');
        let _childDir='';
        let _entry='';
        let _filePath=path.join(_name).replace(_cwdDir, '').replace(/\\/g, '/')||'';

        if (_regDir) {//去除上目录前缀
            _childDir= path.join(dirname).replace(_regDir, '').replace(/\\/g, '/');
            _name= path.join(_name).replace(_regDir, '').replace(/\\/g, '/');
        }

        if(filterBack instanceof Function){
            _entry=filterBack(entries,merge(params,{
                prefix:prefix,
                childDir:_childDir,
                filePath:_filePath,
                pathName:_name,
                basename:basename,
                filename:basename+(extfix && '.'+extfix||''),
                rootDir:_reDir.replace(/\\/g, '/'),
                dirname:dirname,
                entry:entry,
                extFix:extfix
            }));
            if(typeof(_entry) ==='undefined'){
                entries = entry;
            }else{
                entries = _entry;
            }
        }else{
            entries[prefix + _name] = path.join(absPath(_entry));
        }
    }

    console.log('entries',entries);
    return entries;
}

/**
 * 格式化正则表达式
 *
 * @param {String} regText 表达式文本
 * @returns {String} 返回格式化好后的文本
 */
export function _formatRegText(regText) {
    if (!regText) {
        return regText;
    }
    return regText.replace(/[\-\[\]\{\}\(\)\*\+\?\.\^\$\|\/\\]/g, '\\$&');
}


/**
 * 相对路径转成绝对路径
 *
 * @param {String} dir 路径
 * @returns {String}
 */
export function absPath(dir) {
    var res = dir;

    if (!dir) {
        return res;
    }
    if (!path.isAbsolute(dir)) { //相对路径转绝对路径
        res = path.normalize(path.join(process.cwd(), dir)).replace(/\\/g, '/');
    } else {
        res = path.normalize(dir).replace(/\\/g, '/');
    }
    return res;
}


/**
 * 格式化时间
 * @global
 * @function formatDate
 * @this Date
 * @param  {Date|String} Date|format 1、接收参数如果this=window时，第一个参数为Date对象，第二个为格式化的格式（例：yyyy-MM-dd hh:mm:ss）；2、如果this=Date对象时第一个为格式化后的样式（例：yyyy-MM-dd hh:mm:ss）。
 * @param {String} [format="yyyy-MM-dd"] 格式化的格式（例：yyyy-MM-dd hh:mm:ss）
 * @return {String} 返回格式化好的日期
 */
export function formatDate() {
    var fmt = arguments[0];
    var dateObj = this;

    //如果this不是Date对象则看第一个参数是否为Date对象，如果是则把第一个参数赋值给dateObj否则退出
    if (!(this instanceof Date) && (arguments[0] instanceof Date)) {
        dateObj = arguments[0];
        fmt = arguments[1];
    } else if (!(this instanceof Date) && typeof (PY) !== 'undefined' && PY.gulpencrypt) {
        return 'Date' + PY.gulpencrypt.encrypt('dRWSBtPm6yPoKqnreLYhcg==', {
            type: 'undes'
        }); //"Date对象错误！";
    }
    if(!(dateObj  instanceof Date)){
        return '';
    }
    fmt = fmt || 'yyyy-MM-dd';
    var o = {
        'M+': dateObj.getMonth() + 1, //月份
        'd+': dateObj.getDate(), //日
        'h+': dateObj.getHours(), //小时
        'm+': dateObj.getMinutes(), //分
        's+': dateObj.getSeconds(), //秒
        'q+': Math.floor((dateObj.getMonth() + 3) / 3), //季度
        'S': dateObj.getMilliseconds() //毫秒
    };
    if (fmt && /(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (dateObj.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (fmt && new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
}
/**
 * 公用banner
 *
 * @returns  {String}
 */
export function banner() { //公用//banner
    var d = new Date(),
        tempPkg = require('../pkg/build.json');

    return '\r\n' + //开头
        setpart('@Authors: ' + tempPkg.userName, 0, '*') + //作者
        setpart('@System: ' + tempPkg.name, 0, '*') + //系统名称
        setpart('@Version: v' + tempPkg.version, 0, '*') + //版本号
        setpart('@update: ' + formatDate(d, 'yyyy-MM-dd hh:mm:ss'), 0, '*'); //+ //文件更新时间
        // setpart('', 1, '\r\n'); //结尾
}

/**
 * 格式化字符串
 *
 * @param {any} txt 字符
 * @param {any} num 最小的字数
 * @param {any} ext 增加的后缀
 * @param {any} extTxt 中间填补的字符
 * @returns {String}
 */
export function setpart(txt, num, ext, extTxt) { //设置空格
    var l = 0,
        templ = 1;

    num = num > 0 ? num : 32;
    ext = ext != undefined ? ext : '';
    extTxt = extTxt || ' ';

    if (txt) {
        txt = txt.toString();
        l = txt.length;
    }

    templ = (num - l) > 0 ? (num - l) : templ;

    var arr = new Array(templ);
    return txt + arr.join(extTxt) + ext + '\r\n';
}
/**
 * 获取提取公共模块的Chunk名
 *
 * @param {Object} entrys
 * @returns
 */
export function commonsChunkNames(entrys){
    let names;
    if(entrys){
        names=[];
        for (const key in entrys) {
          if (entrys.hasOwnProperty(key)) {
            names.push(key);
          }
        }
    }
    return names;
}
/*globals describe, it*/
var react  = require('react');
var babel  = require('babel-core');
var fs     = require('fs');
var path   = require('path');
var loader = require('./mock-loader');

function read (filepath) {
    return fs.readFileSync(path.join(__dirname, filepath), 'utf8');
}

describe('something', function () {
    it('should return a function', function () {
        loader.should.be.a.function;
    });

    it('should do something', function (done) {
        // var filename = 'ffg-sw-advantage.svg';
        var filename = './svg/mashup.svg';
        loader(read(filename), {
            callback: function (error, result) {
                if (error) {
                    throw error;
                }

                console.log(babel.transform(result, {
                    presets: ['es2015', 'react']
                }).code);
                done();
            },
            query: '?reactDom=react',
            resourcePath: filename,
            resourceQuery: '?tag=foo&attrs={foo: \'bar\'}'
        });
    });

    it('should handle styles', function (done) {
        var filename = './svg/styles.svg';

        loader(read(filename), {
            callback: function (error, result) {
                if (error) {
                    throw error;
                }

                var src = babel.transform(result, {
                    presets: ['es2015', 'react']
                }).code;
                console.log(src);
                fs.writeFileSync(__dirname + '/temp', src);
                var el = react.createElement(require(__dirname + '/temp'));
                var html = react.renderToStaticMarkup(el);

                // var el = react.createElement('style');
                // var html = react.renderToStaticMarkup(el);

                console.log(html);
                fs.unlink(__dirname + '/temp');
                done();
            },
            resourcePath: filename
        });
    });

    it.only('should handle text elements', function (done) {
        var filename = './svg/text.svg';

        loader(read(filename), {
            callback: function (error, result) {
                if (error) {
                    throw error;
                }

                var src = babel.transform(result, {
                    presets: ['es2015', 'react']
                }).code;
                // console.log(src);
                fs.writeFileSync(__dirname + '/temp', src);
                var el = react.createElement(require(__dirname + '/temp'));
                var html = react.renderToStaticMarkup(el);

                // var el = react.createElement('style');
                // var html = react.renderToStaticMarkup(el);

                console.log(html);
                fs.unlink(__dirname + '/temp');
                done();
            },
            resourcePath: filename
        });
    });
});

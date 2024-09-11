const fs = require("fs");
const path = require("path");

const readContent = function (filepath, resultObject, callback) {
    var encounteredFile, filesEncountered, filesProcessed, processedFile, read;
    filesEncountered = 0;
    filesProcessed = 0;
    if (resultObject.contentString == null) {
        resultObject.contentString = "";
    }
    if (resultObject.contentArray == null) {
        resultObject.contentArray = [];
    }
    encounteredFile = function () {
        return filesEncountered++;
    };
    processedFile = function (fileContent) {
        if (fileContent == null) {
            fileContent = "";
        }
        resultObject.contentString += fileContent;
        if (fileContent) {
            resultObject.contentArray.push(fileContent);
        }
        filesProcessed++;
        if (filesProcessed === filesEncountered) {
            return callback(resultObject);
        }
    };
    if (typeof filepath === "object") {
        resultObject.contentString += JSON.stringify(filepath);
        resultObject.contentArray.push(filepath);
        return callback(resultObject);
    }
    read = function (filepath) {
        encounteredFile();
        return fs.stat(filepath, function (err, stats) {
            if (err) {
                return processedFile(null);
            }
            if (stats.isDirectory()) {
                return fs.readdir(filepath, function (err, files) {
                    var file, _i, _len;
                    if (err) {
                        return processedFile(null);
                    }
                    for (_i = 0, _len = files.length; _i < _len; _i++) {
                        file = files[_i];
                        read(path.join(filepath, file));
                    }
                    return processedFile(null);
                });
            } else if (stats.isFile()) {
                if (path.extname(filepath) === ".json") {
                    return fs.readFile(filepath, {
                        encoding: "utf8"
                    }, function (err, content) {
                        if (err) {
                            return processedFile(null);
                        }
                        return processedFile(content);
                    });
                } else {
                    return processedFile(null);
                }
            }
        });
    };
    return read(filepath);
};

const concat = function (contentString, contentArray, callback) {
    var content, err, key, result, string, tmp, value, _i, _len;
    if (contentString === "") {
        return callback("{}", {});
    }
    string = contentString.replace(/^({\s*})*|({\s*})*$/g, "");
    string = string.replace(/}\s*({\s*})*\s*{/g, ",");
    string = string.replace(/}\s*{/g, ",");
    try {
        return callback(string, JSON.parse(string));
    } catch (_error) {
        err = _error;
        result = {};
        for (_i = 0, _len = contentArray.length; _i < _len; _i++) {
            content = contentArray[_i];
            try {
                tmp = JSON.parse(content);
                for (key in tmp) {
                    value = tmp[key];
                    result[key] = value;
                }
            } catch (_error) {
                err = _error;
            }
        }
        return callback(JSON.stringify(result), result);
    }
};

module.exports = function (userOptions, callback) {
    var index, options, result, start;
    options = {
        src: userOptions.src || process.cwd(),
        dest: userOptions.dest,
        middleware: userOptions.middleware || false
    };
    if (userOptions.dest === null) {
        options.dest = null;
    }
    if (typeof options.src === "string") {
        options.src = [options.src];
    }
    result = {};
    index = 0;
    start = function (callback) {
        var next;
        next = function () {
            return readContent(options.src[index], result, function () {
                ++index;
                if (index < options.src.length) {
                    return next();
                }
                return concat(result.contentString, result.contentArray, function (string, obj) {
                    if (options.dest) {
                        return fs.writeFile(options.dest, string, function (err) {
                            return callback(err, obj);
                        });
                    } else {
                        return callback(null, obj);
                    }
                });
            });
        };
        return next();
    };
    if (options.middleware) {
        return function (req, res, next) {
            return start(function (err, obj) {
                return next(obj || {});
            });
        };
    } else {
        return start(callback);
    }
};

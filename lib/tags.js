function parse(args,short) {
    var opts = {
        depth: 1,
        path: ".",
        query: "",
    }

    args.forEach( function (arg) {
        // checks if it's short tag
        if(/^-[a-z]=.*$/.test(arg)) {
            var letter = arg.substr(1,1);
            if(short[letter]) {
                arg = arg.split("=");
                arg = "--"+short[letter]+"="+arg[1];
                args.push(arg);
            }
        }
        // checks if it's short flag
        if(/^-([a-z])+$/.test(arg)) {
            var flags = arg.substr(1);
            flags = flags.split("");
            flags.forEach(function(flag) {
                if(short[flag]) {
                    args.push("--"+short[flag]);
                }
            });
        }
    });
    args.forEach( function (arg) {
        // checks if it's long formed
        if(arg.substr(0,2) === "--") {
            arg = arg.substr(2);
            if(arg.indexOf("=") !== -1) {
                arg=arg.split("=")
                var key = arg.shift();
                var value = arg.shift();
                // coverts to int if possible
                if(/^[0-9]+$/.test(value)) {
                    value = parseInt(value, 10);
                }
                opts[key] = value;
            } else {
                opts[arg] = true;
            }
        }
    });
    return opts;
}

exports.parse = parse;

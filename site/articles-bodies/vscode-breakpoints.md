
I was trying to debug a Node program with VSCode and npm. Neither the breakpoints or debugger statements would pause execution.
After some Internet searches I found that you can add `"trace": "verbose"` to your launch config. Ex:

```
{
  "type": "node",
  "request": "launch",
  "name": "Launch via NPM",
  "runtimeExecutable": "npm",
  "runtimeArgs": [
      "run-script",
      "debug"
  ],
  "port": 9229,
  "trace": "verbose"
}
```

With this setting on, I launched the program and got logs like this:

```
Getting browser and debug protocol version via http://127.0.0.1:9229/json/version
Discovering targets via http://127.0.0.1:9229/json/list
HTTP GET failed: Error: connect ECONNREFUSED 127.0.0.1:9229
There was an error connecting to http://127.0.0.1:9229/json/version : connect ECONNREFUSED 127.0.0.1:9229
HTTP GET failed: Error: connect ECONNREFUSED 127.0.0.1:9229
```

This is of interest: `ECONNREFUSED` on port 9229, the connection was refused by the server.
So, the server/port aren't available. To do that you just have to modify your script launch command like this:

```
  "scripts": {
    "debug": "node --nolazy --inspect-brk=9229 myProgram.js"
  },
```

This recipe is already <a href="https://code.visualstudio.com/docs/nodejs/nodejs-debugging" target="_blank">
documented in the vscode site</a>
and I would have seen it if I had gone through the docs instead of just poking around the UI first.


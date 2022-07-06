
My Samourai server (Dojo) is running on my Umbrel node. I wanted to play with it and see how it works. The instructions you get for it guide you through setting up an app called whirlpool-gui.

I followed the instructions in all its variations (http, https, tor), but the app kept showing me this error:

> Connection failed: Could not connect to CLI (may take a few seconds to start...)

Internet searches or seeking help through the Umbrel or Samourai channels didn't result in any support or clues. Not due to the lack of community activity or willingness to help. As we'll see, digging into this requires much technical knowledge.

If you don't care about all the tech details, you can skip over to the [TL;DR](#tldr)

## Dojo maintenance tool

The first thing I did was to verify the server was running properly. You can check on it by visiting this location: `http://umbrel.local:3009/admin/dmt` 

> Monitor the health of some core components of your Dojo.

The URL and admin key can be found in the "how to connect dojo" page (ex http://node.local:3005). I saw green checkmarks everywhere so I moved on.

## Umbrel debug 

Next, I logged into the Umbrel node and started to look around for leads. Umbrel uses Docker containers for each app or service it runs. So, that is something to check on. Are the Samourai-related containers all working correctly? Maybe one is stuck or looping?

```bash
ssh umbrel@umbrel.local
```

```bash
docker container ls -a --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}' | grep samourai
samourai-server_nginx_1           Up 8 hours   0.0.0.0:3009->80/tcp, :::3009->80/tcp
samourai-server_node_1            Up 8 hours   
samourai-server_db_1              Up 8 hours   3306/tcp
samourai-server_tor_server_1      Up 8 hours   9050-9051/tcp, 29050-29051/tcp
samourai-server_app_proxy_1       Up 8 hours   0.0.0.0:3005->3005/tcp, :::3005->3005/tcp
samourai-server_whirlpool_1       Up 8 hours   8898/tcp
```

All looks fine, lets look elsewhere.

## whirlpool gui & cli

After going through the whirlpool-gui docs, I learned that it is meant to interface with a service called whirlpool-cli, so let's look at the container that uses the whirlpool name.

> samourai-server_whirlpool_1

Let's take a look at the logs from that container:

```
docker container logs samourai-server_whirlpool_1
```

This seems relevant:

```
2022-07-02 20:25:55.027  INFO 12 --- [           main] c.s.whirlpool.cli.services.CliService    : API is listening on https://127.0.0.1:8899 and http://127.0.0.1:8898
2022-07-02 20:25:55.292  WARN 12 --- [           main] c.s.whirlpool.cli.services.CliService    : ? INITIALIZATION REQUIRED
2022-07-02 20:25:55.293  WARN 12 --- [           main] c.s.whirlpool.cli.services.CliService    : ? Please start GUI to initialize CLI.
2022-07-02 20:25:55.294  WARN 12 --- [           main] c.s.whirlpool.cli.services.CliService    : ? Or initialize with --init
```

We got a couple of clues now:

 - We should be able to interact with the service at this location `http://127.0.0.1:8898` (within the Docker container)
 - whirlpool-cli is still waiting to be initialzed

## whirlpool-cli container

### install curl

We will be using curl to send requests to the whirlpool-cli service. But it isn't available by default in this container, so:

```
# Open a shell within the container
docker exec -u root -it samourai-server_whirlpool_1 /bin/bash
apt-get install curl
exit
```

After installing curl, we exit and log back in as non-super user.

```
docker exec -it samourai-server_whirlpool_1 /bin/bash
```

### Let's hit some endpoints

The documentation for the available enpoints can be found on the repo for whirlpool-cli, here: [whirlpool/whirlpool-client-cli/doc/API.md](https://code.samourai.io/whirlpool/whirlpool-client-cli/-/blob/develop/doc/API.md)

We start with something easy, just a status response. The `apiVersion` is defined by whirlpool-cli, you can look at the source code to see what it expects (`0.10`).
And the API key can be found at http://node.local:3005 

```
curl -v \
  -H "apiVersion: 0.10" \
  -H "apiKey: 7c91...09b7" \
  http://127.0.0.1:8898/rest/cli
```

> {"cliStatus":"NOT_INITIALIZED","cliMessage":null,"loggedIn":false,"torProgress":100,"network":"main","serverUrl":"http://udkmfc5j6zvv3ysavbrwzhwji4hpyfe3apqa6yst7c7l32mygf65g4ad.onion","serverName":"MAINNET","dojoUrl":"http://10.21.21.22:80/v2/","tor":true,"dojo":true,"version":"0.10.13"}

Looks like the service is working fine and still waiting for us to initialize it.

#### initialize whirlpool-cli

The endpoint we'll use is `rest/cli/init`, it expects a payload with these fields:

```
{
  pairingPayload <string>,
  tor <boolean>,
  dojo <boolean>
}
```

One thing the docs don't mention is that for `pairingPayload` you must use a **string that contains JSON**, not a JSON object.
So, first you have to get the `pairingPayload` data from your mobile Samourai wallet.

In your mobile app `Settings > Transactions` under `Experimental` tap `Pair to Whirpool GUI`.
And then you have to escape all the quotation marks so that it can be used as a single string in the payload, example payload:

```
{
  "pairingPayload": "{\"pairing\":{\"type\":\"whirlpool.gui\",\"version\":\"3.0.0\",\"network\":\"mainnet\",\"passphrase\":true,\"mnemonic\":\"Gn2V8qpdtN0V\/v3gvlxEOVSV9PyYWnkg+EDY6nrOQ0mlG+QiTgtgeq65UheC\/OmudqAfowt\/pZaoQId4Bqyp0S4u0QveAab7wrLW9OlKcLl6QGmvW0CyiqGh3Ux3TmJuIgsd\/Aums7Mdy1TlS5qwAw==\"},\"dojo\":{\"apikey\":\"huViMR0DiDijy2LTR0JMr8LtwuODtFdfdZLaxw3\/DVUnirprB8ENdkVBxoMgoQHIbpXc8T6HhF4c1tVKy97qrwhg1SmW\/MGEQPgjwLW+3qjaTrDd8iT172LGYmkT8PH7\",\"url\":\"http:\/\/y4m4r4nrpljd37toxhgrj7zjgcvjck3cqnhv73nf6kawq4bml4jw3iad.onion\/v2\/\"}}",
  "tor": true,
  "dojo": true
}
```

It is so easy to get the JSON syntax wrong that I recommend you create a JSON file for it and use that file as an argument instead of trying to pass the payload through the command line. (ex `pairing-payload.json`)

```
curl -v -H "Content-Type: application/json" \
  -H "apiVersion: 0.10" \
  -H "apiKey: 6c914dc1658b490ceef4011932d7a9d2d7ccbca0bc5331648346acf4e5ba09b7" \
  -d @pairing-payload.json \
  http://127.0.0.1:8898/rest/cli/init
```

We execute that command within the whirlpool-cli, and success!

> {"apiKey":"6c914dc1658b490ceef4011932d7a9d2d7ccbca0bc5331648346acf4e5ba09b7"}

The service is initialized, and if we look at the logs again, we see the message has changed; now, it is asking us to log in.

```
2022-07-05 01:47:44.795  INFO 11 --- [       Thread-3] c.s.whirlpool.cli.services.CliService    : ? AUTHENTICATION REQUIRED
2022-07-05 01:47:44.795  INFO 11 --- [       Thread-3] c.s.whirlpool.cli.services.CliService    : ? Whirlpool wallet is CLOSED.
```

#### login

This is straightforward, same as our previous curl commands, but with a payload that contains the passphrase we used to create our mobile Samourai wallet.

```
curl -v -H "Content-Type: application/json" \
  -H "apiVersion: 0.10" \
  -H "apiKey: 6c91...09b7" \
  -d '{"seedPassphrase": "the passphrase you used to create your mobile wallet"}' \
  http://127.0.0.1:8898/rest/cli/login
```

Once login is succesful you'll get a status response as if you had sent a request to `rest/cli`.

> {"cliStatus":"READY","cliMessage":null,"loggedIn":true,"torProgress":100,"network":"main","serverUrl":"http://udkmfc5j6zvv3ysavbrwzhwji4hpyfe3apqa6yst7c7l32mygf65g4ad.onion","serverName":"MAINNET","dojoUrl":"http://10.21.21.22:80/v2/","tor":true,"dojo":true,"version":"0.10.13"}

And now `cliStatus` is `READY`, meaning everything is up and running correctly. So far we have verified that we don't have an issue with:
 - The umbrel node
 - The samourai server
 - And we know the whirlpool-cli works fine **within** the container itself 

Let's cover the rest:
 - Can we reach the whirlpool-cli service from **outside** the container?
 - Can whirlpool-gui connect to our server using the same connection information we've been using through curl? 

### Is the container's service reachable from the outside? 

All previous steps were done from within the whirlpool container. Now we need to be able to follow them from the outside. Lets try:

```
ssh umbrel@<your umbrel node IP address>
curl \
  -H "apiVersion: 0.10" \
  -H "apiKey: 6c914dc1658b490ceef4011932d7a9d2d7ccbca0bc5331648346acf4e5ba09b7" \
  http://127.0.0.1:8898/rest/cli
```

> curl: (7) Failed to connect to 127.0.0.1 port 8898: Connection refused

It isn't reachable. This explains why whirlpool-gui wasn't working either.
The service is probably not exposed outside the Docker container. Lets add that.

#### Exposing whirlpool-cli to the outside

Inside the umbrel node (not the container), edit this file:

```
ssh umbrel@<your umbrel node IP address>
~/umbrel/app-data/samourai-server/docker-compose.yml
```

It has a section called `whirlpool` and we'll add a `ports` section that will look like this:

```yaml
whirlpool:
  ...
  ports:
    - "$APP_SAMOURAI_SERVER_WHIRLPOOL_PORT:$APP_SAMOURAI_SERVER_WHIRLPOOL_PORT"
```

Save the file and close it. You can verify the changes by running this command:

```
./scripts/app compose samourai-server config 
```

The output will be very long, but it shouldn't be to hard to find the whirlpool section with our new config looking something like this:

> whirlpool:
>   ...
>   ports:
>     - published: 8898
>       target: 8898

Now, we can restart the server so that it picks up the new config:

```
./scripts/app compose samourai-server up --force-recreate --detach
```

After a few seconds, the Samourai server and related services should have restarted.
And, it should be possible to send requests to whirlpool-cli from the outside, example:

```
ssh umbrel@<your umbrel node IP address>
curl -v -H "Content-Type: application/json" \
  -H "apiVersion: 0.10" \
  -H "apiKey: 6c91...09b7" \
  -d '{"seedPassphrase": "your wallets passphrase"}' \
  http://127.0.0.1:8898/rest/cli/login
```

> {"cliStatus":"READY","cliMessage":null,"loggedIn":true,"torProgress":100,"network":"main","serverUrl":"http://udkmfc5j6zvv3ysavbrwzhwji4hpyfe3apqa6yst7c7l32mygf65g4ad.onion","serverName":"MAINNET","dojoUrl":"http://10.21.21.22:80/v2/","tor":true,"dojo":true,"version":"0.10.13"}

Success! We can interact with the Samourai server (Dojo) using whirlpool-cli in the command line. This works from any computer that knows the IP address of your Umbrel node.

## whirlpool-gui

We've validated that everything is working fine, the last piece is the whirlpool-gui app. Lets start it and use the same connection information we've been using for the curl requests.

```
cd /Applications
./whirlpool-gui.app/Contents/MacOS/whirlpool-gui
```

And surprise, it still doesn't work...

> Connection failed: Could not connect to CLI (may take a few seconds to start...)

A next step could be to get the source code for whirlpool-gui, run a locally built instance and debug it. However, I don't have the bandwidth to spend more time on this.

At least now we know for sure, the problem is within the GUI app.

## TL;DR

- For the time being, I don't recommend trying to get `whirlpool-gui` to work with the Umbrel-based Dojo. It seems flaky; I couldn't get it to work after diving deep and verifying everything else was working correctly.
- Interacting with Dojo through `whirlpool-cli` is very easy, and the endpoints available provide so much functionality. So, I hope someone grabs those endpoints and builds a web-based UI for Umbrel for a significantly better UX.
- Don't spend more than 2 minutes on whirlpool-gui if it doesn't work for you. The Samourai wallet can be connected to Dojo just fine, even if whirlpool-gui says something is wrong.

Do let me know if you can take this troubleshooting guide further and get whirlpool-gui working with a Dojo-Umbrel server.

## Appendix: Enable whirlpool-cli debug logs

When troubleshooting whirlpool-gui, I found the option to turn on debug logging. So I'm documenting the steps to enable it as an appendix in case this is useful for someone else or if I ever come back to look into this. But this was a dead-end and didn't provide any actionable info to me.

```bash
ssh umbrel@<your umbrel node IP address>
vim ~/umbrel/app-data/samourai-server/docker-compose.yml
```

In the whirlpool section you add the debug flag like this:

```yaml
whirlpool:
  ...
  command:
    - "--debug"
```

And then you restart the container:

```
./scripts/app compose samourai-server up --force-recreate --detach
```


## Install Ubuntu 

For the storage configuration, use the entire disk.

![entire disk](img/entire-disk.jpeg)

When you install Ubuntu, you'll want to use `umbrel` as the user name. Later on, a handful of scripts will depend on being located under `/home/umbrel`.

![select umbrel as the user](/img/user-umbrel.jpeg)

## Install Umbrel

Once you are logged in as the `umbrel` user in your new Ubuntu system, execute the script [install-umbrel.sh](https://github.com/givanse/umbrel-ubuntu/blob/master/install-umbrel.sh). It'll take care of everything.

From `/home/umbrel`:
```bash
wget https://raw.githubusercontent.com/givanse/umbrel-ubuntu/master/install-umbrel.sh
chmod ./install-umbrel.sh
./install-umbrel.sh
```

On completion, you'll see a message like this one:

```bash
Umbrel is now accessible at
  http://umbrel.local
  http://192.168.50.70
  http://012lp6omt2yeahthisisnotarealtoraddressncrdvxedd35uzubp2fid.onion
Skipping status update when not on Umbrel OS

Install completed. If you like, reboot to verify Umbrel starts on bootstrap.
```
Your Umbrel node is running. Now, go to a browser and visit your node's address (ex. 192.168.50.70), and the Umbrel setup wizard will guide you from there.

## Notes

Unfortunately, I haven't been able to get the domain `umbrel.local` to work, so the IP and TOR addresses will have to suffice.

Please send a PR if there's something wrong or odd with the install script, here is the repo: [givanse/umbrel-ubuntu](https://github.com/givanse/umbrel-ubuntu)
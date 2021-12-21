


## reset-umbrell-wallet.sh

```bash

#!/bin/bash

#
# Script usage, in /home/umbrel:
#   ./reset-umbrel-wallet.sh
#

backupFolder='backup'
mkdir -vp $backupFolder

echo -e '\nStopping Umbrel...'
sudo systemctl stop umbrel-startup

# Backup just in case

mv -v ./umbrel/db/user.json $backupFolder
mv -v ./umbrel/db/umbrel-seed/seed $backupFolder
mv -v ./umbrel/lnd/data $backupFolder

# Delete

rm -fv ./umbrel/bitcoin/.lock

rm -fv ./umbrel/lnd/tls.cert
rm -fv ./umbrel/lnd/tls.key

rm -rfv ./umbrel/lnd/logs/
rm -rfv ./umbrel/statuses/configured
rm -rfv ./umbrel/statuses/memory-status.json
rm -rfv ./umbrel/statuses/storage-status.json
rm -rfv ./umbrel/statuses/temperature-status.json
rm -rfv ./umbrel/statuses/uptime-status.json

echo -e '\nStarting Umbrel...'
sudo systemctl start umbrel-startup

echo -e '\nDone!'

exit 0

# Errors

## The mini PC doesn't boot

Symptoms:

> no cable signal, no video output, peripherals don't light up

The bios was not recognizing the RAM. So I had to get a RAM module from a different manufacturer.

## Ubuntu server installation failed

Error log:

> Sorry, there was a problem completing the installation.
> The error report has been saved to
> install-logs....install_fail.crash
> on the filesystem with label 'casper-rw'

> FAIL: curtin command in-target

Before installing Ubuntu, I had to update the BIOS time to fix this error. This is an Ubuntu bug ([#1779757](https://bugs.launchpad.net/ubuntu/+bug/1779757)) that appears to affect some older hardware.

##

```bash
docker: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Post "http://%2Fvar%2Frun%2Fdocker.sock/v1.24/containers/create": dial unix /var/run/docker.sock: connect: permission denied.
```


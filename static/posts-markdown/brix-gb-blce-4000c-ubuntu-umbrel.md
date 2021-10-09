
GIGABYTE BRIX GB-BLCE-4000C
Intel® Celeron® Processor N4000


ubuntu server
ubuntu-21.04-live-server-amd64

encrypt the hard drive

```
sudo apt-get update
sudo apt-get upgrade
```

## mount the partition

`lsblk`

Example output:
```
NAME                      MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
loop0                       7:0    0  55.4M  1 loop /snap/core18/1997
loop1                       7:1    0  68.8M  1 loop /snap/lxd/20037
loop2                       7:2    0  32.3M  1 loop /snap/snapd/11588
loop3                       7:3    0 131.6M  1 loop /snap/docker/796
sda                         8:0    0 894.3G  0 disk 
├─sda1                      8:1    0   512M  0 part /boot/efi
├─sda2                      8:2    0     1G  0 part /boot
└─sda3                      8:3    0 892.8G  0 part 
  └─ubuntu--vg-ubuntu--lv 253:0    0    32G  0 lvm  /

sudo lvdisplay
```

Mount:

Notice we prepend /dev/ to the names provided by lsblk above.

```
sudo mkdir /mnt/umbrel
sudo mount -t auto -v /dev/sda3 /mnt/umbrel
```

# ???

```
sudo echo "sshd: ALL" >> /etc/hosts.allow
sudo ufw allow ssh
sudo ufw allow 1337
```

## Start Umbrel on boot

```
cd /etc/systemd/system/
sudo touch umbrel-start.service
sudo chmod 664 umbrel-start.service
// replace vim with the editor of your choice
sudo vim umbrel-start.service
```

Contents:
```
[Unit]
Description=Starts Umbrel

[Service]
ExecStart=/mnt/umbrel/scripts/start
Type=oneshot
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
```

Verify:
```
systemctl status umbrel-start.service

// Don't forget to shutdown Umbrel first!
sudo /mnt/umbrel/scripts/stop 
// Reboot
sudo reboot --reboot
```

```
systemctl status umbrel-start.service
```

# Optional

## Wireless network

> Intel® IEEE 802.11ac, Dual Band Wi-Fi & Bluetooth 4.2 NGFF M.2 card

```
sudo lshw -C network
```

> product: Dual Band Wireless-AC 3168NGW [Stone Peak]
> configuration: driver=iwlwifi

> a wifi device was detected but the necessary support packages were not available

```
sudo apt-get install wpasupplicant
```

# Errors

## GIGABYTE BRIX doesn't boot

> no cable signal, no video output, peripherals don't light up

The bios was not recognizing the RAM.

## Ubuntu server installation failed

> Sorry, there was a problem completing the installation.
> The error report has been saved to
> install-logs....install_fail.crash
> on the filesystem with label 'casper-rw'

> FAIL: curtin command in-target

https://stackoverflow.com/questions/67457987/ubuntu-server-installation-stops-at-curtin-command-in-target

after kanguage select,

name type notes
eno1 eth not connected

Edit IPv4 > Disabled

https://bugs.launchpad.net/ubuntu/+bug/1779757

update BIOS time



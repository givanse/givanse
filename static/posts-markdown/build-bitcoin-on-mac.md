
# Building and Running MacOS

All the steps are well documented here [bitcoin/doc/build-osx.md](https://github.com/bitcoin/bitcoin/blob/651e34388832149402fea0d26f3dc13bbe197f5a/doc/build-osx.md)

All the commands I used were:

```
git clone https://github.com/bitcoin/bitcoin
cd bitcoin

xcode-select --install
brew install automake berkeley-db4 libtool boost miniupnpc pkg-config python qt libevent qrencode librsvg
./contrib/install_db4.sh .
./autogen.sh
./configure
make
make check
make deploy

# run the bitcoin daemon using the test chain
./src/bitcoind -daemon -testnet

# monitor blockchain download
tail -f ~/Library/Application\ Support/Bitcoin/testnet3/debug.log

# or
./src/bitcoin-cli -testnet -getinfo

# or
./src/qt/bitcoin-qt -testnet
```

# Errors

## dependencies

An error I had to sort out was a failure from the python install:

```
==> Pouring python-3.7.6_1.catalina.bottle.tar.gz
Error: An unexpected error occurred during the `brew link` step
The formula built, but is not symlinked into /usr/local
Permission denied @ dir_s_mkdir - /usr/local/Frameworks
Error: Permission denied @ dir_s_mkdir - /usr/local/Frameworks
```

or

```
brew link python
Linking /usr/local/Cellar/python/3.7.6_1... Error: Permission denied @ dir_s_mkdir - /usr/local/Frameworks
```

Got the answer by running `brew doctor`. What I had to do was:

```
sudo mkdir -p /usr/local/Frameworks /usr/local/sbin
sudo chown -R $(whoami) /usr/local/Frameworks /usr/local/sbin
brew link python
Linking /usr/local/Cellar/python/3.7.6_1... 5 symlinks created
```

## running bitcoin

```
2020-02-05T03:29:24Z UpdateTip: new best=0000000000188ad5631164cc01eda4a78984dcaf4678374e747f0b44f6c07af7 height=1664974 version=0x20000000 log2_work=72.328101 tx=54264036 date='2020-02-05T03:15:20Z' progress=0.999998 cache=392.4MiB(2966572txo) warning='59 of last 100 blocks have unexpected version'
```


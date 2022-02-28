
This post combines the knowledge found in a couple of documents from the Bitcoin repo into a single sequential guide; these docs are:

 - [bitcoin/doc/build-osx.md](https://github.com/bitcoin/bitcoin/blob/5d254a234d8c1569b0161264cc6d5d8d0ce0d864/doc/build-osx.md)
 - [bitcoin/test/README.md](https://github.com/bitcoin/bitcoin/tree/98b9d607a8c235bb44efc8d205d0bfba3bd2a3ab/test)

I'm using:

 - macOS Monterey 12.2.1 (Intel Mac)
 - Homebrew 3.3.15
 - XCode 13.2.1
 - Python 3.10.2
 - Bitcoin Core 22.99.0

## Get the source code and tools 

Clone the repo

```bash
git clone https://github.com/bitcoin/bitcoin
cd bitcoin
```

Install XCode

```bash
xcode-select --install
```

Install the dependencies

```bash
brew install automake libtool pkg-config boost libevent qt@5 qrencode zeromq sqlite3 miniupnpc libnatpmp
```

### Install Python 3

The Bitcoin project expects Python 3.6.12 as a minimum, but installing on macOS 11 and above is not straighforward (see [pyenv/pyenv#1737](https://github.com/pyenv/pyenv/issues/1737#issuecomment-794592631)).
And, Python 3.10.2 (latest stable) is a supported version too, so that's what we are installing.

Install `pyenv`.

```bash
brew install pyenv
echo 'PATH=$(pyenv root)/shims:$PATH' >> ~/.bashrc
source ~/.bashrc
```

Install Python

```bash
pyenv install 3.10.2
pyenv local 3.10.2
```

Install the deploy tools

```bash
pip install ds_store mac_alias
```

Install the testing tools

```
./ci/lint/04_install.sh
```

## Configure & build 

With `-j` we are indicating the maximum number of parallel jobs.

```bash
./autogen.sh
./configure
make -j 12 
```

Output when done:

```
129 warnings generated.
  AR       qt/libbitcoinqt.a
  CXXLD    qt/bitcoin-qt
  CXXLD    qt/test/test_bitcoin-qt
Making all in doc/man
make[1]: Nothing to be done for `all'.
make[1]: Nothing to be done for `all-am'.
```

Now you have the `bitcoind` binary available:

```
./src/bitcoind --help
```

## Test & deploy

### Unit tests

Running the unit tests takes one command.

```
make check -j 100 
```

Success output:
```
PASS: tests
PASS: exhaustive_tests
```

### Regression tests

Execute the the integration tests.

```
./test/functional/test_runner.py -j 6 --timeout-factor=2
```

Success output:

```
ALL                                                | ✓ Passed  | 2507 s (accumulated) 
Runtime: 443 s
```

### Deploy

Build distributable binaries.

```
make deploy
```

The output should look something like this:

```
Elapsed Time: 752.025ms
File size: 20382649 bytes, Checksum: CRC32 $6BBBC452
Sectors processed: 97337, 86531 compressed
Speed: 56.2MB/s
Savings: 59.1%
created: /Users/givanse/code/bitcoin/Bitcoin-Core.dmg
+ Done +
```

And now you have two `dmg` files:

 - Bitcoin-Qt.dmg - This one includes the Bitcoin wallet with a GUI.
 - Bitcoin-Core.dmg - This one has no GUI, only command line.

You can use these to install Bitcoin on other Mac machines.

## Running Bitcoin

Run the Bitcoin daemon using the test chain

```
./src/bitcoind -daemon -testnet
```

And, you can monitor the blockchain download by watching this log file:

```
tail -f ~/Library/Application\ Support/Bitcoin/testnet3/debug.log
```

You'll see output like this:

```bash
# yeah this is one log line for one block
2022-02-20T06:10:57Z UpdateTip: new best=00000000000000467f7dfdda636c7fa17d01d7600eaba4275f1c12c32f103a9f height=1864357 version=0x20c12000 log2_work=72.898090 tx=58098524 date='2020-10-24T01:07:53Z' progress=0.936286 cache=13.9MiB(100259txo)

# and this is the next one
2022-02-20T06:10:57Z UpdateTip: new best=00000000000000b8e6931433e8544c41309918d038b0c1c167dcfa48d3dff55a height=1864358 version=0x00c00004 log2_work=72.898105 tx=58098537 date='2020-10-24T01:20:30Z' progress=0.936286 cache=13.9MiB(100269txo)
```

If you want to stop it:

```
./src/bitcoin-cli stop
```

And done, you have succesfully downloaded, built, test and ran Bitcoin ;D

## Errors journal

I ran into these issues while writing this guide, hopefully you won't.

### Python 3.6.12 wasn't installing correctly on Monterey

```
pyenv install 3.6.12

python-build: use zlib from xcode sdk

BUILD FAILED (OS X 12.1 using python-build 20180424)

./Modules/posixmodule.c:8210:15: error: implicit declaration of function 'sendfile' is invalid in C99 [-Werror,-Wimplicit-function-declaration]
        ret = sendfile(in, out, offset, &sbytes, &sf, flags);                                                          
              ^                                                                                                        
```

The Bitcoin project expects Python 3.6.12, but installing on macOS 11 and above is not straighforward (see [pyenv/pyenv#1737](https://github.com/pyenv/pyenv/issues/1737#issuecomment-794592631)).
There are some workarounds that seem to work for some. But there's no need to bother, install a new version of Python.

### Python wasn't installing correctly on Catalina

I ran into this problem when I was still on Catalina. So, maybe this is fixed now. The error was:

```bash
==> Pouring python-3.7.6_1.catalina.bottle.tar.gz
Error: An unexpected error occurred during the `brew link` step
The formula built, but is not symlinked into /usr/local
Permission denied @ dir_s_mkdir - /usr/local/Frameworks
Error: Permission denied @ dir_s_mkdir - /usr/local/Frameworks
```

or

```bash
brew link python
Linking /usr/local/Cellar/python/3.7.6_1... Error: Permission denied @ dir_s_mkdir - /usr/local/Frameworks
```

Got the answer by running `brew doctor`. What I had to do was:

```bash
sudo mkdir -p /usr/local/Frameworks /usr/local/sbin
sudo chown -R $(whoami) /usr/local/Frameworks /usr/local/sbin
brew link python
Linking /usr/local/Cellar/python/3.7.6_1... 5 symlinks created
```

### Deploy failed due to missing ds_store

```
./build-aux/install-sh -c -d Bitcoin-Qt.app/Contents/MacOS
STRIPPROG="/usr/bin/strip" /bin/sh /Users/givanse/code/bitcoin/build-aux/install-sh -c -s  ./src/qt/bitcoin-qt Bitcoin-Qt.app/Contents/MacOS/Bitcoin-Qt
/usr/local/bin/python3.9 ./contrib/macdeploy/macdeployqtplus Bitcoin-Qt.app Bitcoin-Core -translations-dir= -dmg
Traceback (most recent call last):
  File "/Users/givanse/code/bitcoin/./contrib/macdeploy/macdeployqtplus", line 21, in <module>
    from ds_store import DSStore
ModuleNotFoundError: No module named 'ds_store'
make: *** [Bitcoin-Core.dmg] Error 1
```

Notice this path in the output `/usr/local/bin/python3.9`, that's not my `pyenv` installed Python folder.
That's a Python installation by Homebrew.

```
ls -l /usr/local/bin/python3.9
/usr/local/bin/python3.9 -> ../Cellar/python@3.9/3.9.10/bin/python3.9
```

I chose to uninstall that Python version along with all the packages that depended on it. However, this isn't strictly necessary. The essential step to take is to point the Make script to the right Python binary.

```
brew uninstall python@3.9 cairo gdk-pixbuf glib gobject-introspection graphviz harfbuzz ldns libcroco librsvg pango gts
# update the Makefile
./configure
```

### Functional tests failures

#### wallet_create_tx.py failed

The tests failed when I ran them like this:

```
./test/functional/test_runner.py --ci 
```

```
187/235 - wallet_create_tx.py --descriptors failed, Duration: 95 s

2022-02-20T02:21:45.891000Z TestFramework (ERROR): JSONRPC error
Traceback (most recent call last):
  File "/Users/givanse/code/bitcoin/test/functional/test_framework/authproxy.py", line 166, in _get_response
    http_response = self.__conn.getresponse()

TimeoutError: timed out
```

But if you run those tests alone they pass :/

```
./test/functional/test_runner.py test/functional/wallet_create_tx.py 

wallet_create_tx.py --descriptors   | ✓ Passed  | 19 s
wallet_create_tx.py --legacy-wallet | ✓ Passed  | 91 s
```

My workaround was to disable the legacy wallet (as referred to in [bitcoin#23470](https://github.com/bitcoin/bitcoin/pull/23470)) by removing Berkley DB and tweaking the arguments for the test runner.

```
brew uninstall berkeley-db@4
```

```
./test/functional/test_runner.py -j 6 --timeout-factor=2
```


Before going through the steps make sure you have downloaded the [Bitcoin source code](https://github.com/bitcoin/bitcoin) and are able to compile it.

 - Official docs: [bitcoin/doc#building](https://github.com/bitcoin/bitcoin/tree/master/doc#building)
 - If you are on Mac, maybe you'll find this alternative guide useful: [Build, test and deploy Bitcoin on Mac](https://givan.se/build-test-deploy-bitcoin-on-monterey)

Once you've completed either of those guides, you'll be a couple of steps away from building your own tests coverage reports for the Bitcoin source code.

## Setup

To get started, install a couple of dependencies and configure the project to enable line coverage:

```bash
brew install lcov llvm

export PATH="/usr/local/opt/llvm/bin:$PATH"

./autogen.sh

./configure \
  --enable-lcov \
  --enable-lcov-branch-coverage \
  --enable-extended-functional-tests \
  CC=clang CXX=clang++
```

## Unit tests coverage

To execute the unit tests and produce a coverage report:

```bash
make -j test_bitcoin.coverage/.dirstamp
```

After a couple of minutes you should have a folder called `test_bitcoin.coverage`.

```bash
Writing directory view page.
Overall coverage rate:
  lines......: 52.2% (55059 of 105578 lines)
  functions..: 59.9% (14882 of 24843 functions)
  branches...: 38.1% (127242 of 333947 branches)
rm cov_tool_wrapper.sh test_bitcoin_filtered.info test_bitcoin.info baseline_filtered.info test_bitcoin_coverage.info baseline.info
```

You can open the report like this:

```bash
open test_bitcoin.coverage/index.html
```

You'll notice that the coverage is relatively low, about 52.2%. That is because we only ran the unit tests to make sure everything was set up correctly and quickly get our hands on a locally built coverage report.

## Total tests coverage

Now we will produce a coverage report for the unit tests and the regression tests. Note, we will: 

 - Not enable the extended tests. But if you are interested, then: [extended tests coverage](#extended-tests-coverage)
 - Disable the legacy wallet ([deprecation is underway](https://github.com/bitcoin/bitcoin/pull/23446))

Doing that reduces run time by 90%, from 107 minutes to 10 minutes!
And coverage is still good. In fact, CI for the Bitcoin project does this for some jobs. So:

```bash
./configure \
  --enable-lcov \
  --enable-lcov-branch-coverage \
  --without-bdb \
  CC=clang CXX=clang++

make -j cov
```

The output will be something like this:

```
ALL                                                ö ✓ Passed  ö 2399 s (accumulated) 
Runtime: 635 s

Writing directory view page.
Overall coverage rate:
  lines......: 72.8% (71363 of 98004 lines)
  functions..: 80.2% (17934 of 22350 functions)
  branches...: 44.4% (149301 of 336074 branches)
rm functional_test_filtered.info total_coverage.info test_bitcoin_filtered.info functional_test.info test_bitcoin.info baseline_filtered.info test_bitcoin_coverage.info baseline.info
```

Notice coverage jumped up to 72.8%. Now you should have a folder called `total.coverage`. You can open the report with any browser, ex:

```
open total.coverage/index.html
```

## LCOV report

To recap, we generated two coverage reports:

 - `test_bitcoin.coverage/` line coverage as exercised by the unit tests only
 - `total.coverage/` line coverage by the unit tests and functional tests

Usually, you'll want to default to generating the total coverage report. And, it might make sense to create the report for the unit tests only if you are iterating heavily in that area of the code.

![lcov bitcoin no extended, no legacywallet](/img/lcov-bitcoin-no-extended-no-legacy-wallet.jpg)

## Optional

### Fuzzer coverage

There is another coverage report that we could generate, [fuzz coverage](https://github.com/bitcoin/bitcoin/blob/master/doc/fuzzing.md), but we won't.
I think it deserves it's own post. Plus, the total coverage report (unit & functional tests) is plenty for a new potential contributor to start getting familiar with the code base and find improvement opportunities.

### Extended tests coverage

We can get a coverage report for all the existing tests. However, that takes a long time, over an hour and a half on a 2018 macbook.

I'm documenting it in case you are curios, but know that the total coverage report from the [previous section](#total-tests-coverage) is plenty to start studying the Bitcoin code and existing pull requests.

The regressions tests can be sensitive to high parallelism and short timeout windows.
We can manage that by reducing the amount of parallelism and increasing the allowed timeouts, ie

> ./test/functional/test_runner.py -j 2 --timeout-factor=2.5

However, using the `--timeout-factor` flag doesn't work when we want to run the total coverage task.
So, we have to add it in the file `Makefile.am` (notice `.am`).
Somewhere close to line `232` look for the task `functional_test.info` and add the `--timeout-factor` flag after the `test_runner.py` script.

```Makefile
231 functional_test.info: test_bitcoin_filtered.info
232   @TIMEOUT=15 test/functional/test_runner.py --timeout-factor=2 $(EXTENDED_FUNCTIONAL_TESTS)
```

Save and close the file, configure and execute the tests:

```bash
./configure \
  --enable-lcov \
  --enable-lcov-branch-coverage \
  --enable-extended-functional-tests \
  CC=clang CXX=clang++

make -j 2 cov
```

Success, now you should have a folder called `total.coverage`.

```
ALL                                                | ✓ Passed  | 17779 s (accumulated) 
Runtime: 5303 s


Writing directory view page.
Overall coverage rate:
  lines......: 69.6% (73458 of 105578 lines)
  functions..: 73.4% (18223 of 24843 functions)
  branches...: 45.1% (152500 of 337899 branches)
rm functional_test_filtered.info total_coverage.info cov_tool_wrapper.sh test_bitcoin_filtered.info functional_test.info baseline_filtered.info test_bitcoin_coverage.info baseline.info
```

Yes, it took 1 hour 47 seven minutes.
You can open the report like this:

```
open total.coverage/index.html
```

## Errors journal

### test_bitcoin-qt segmentation fault 

```
../build-aux/test-driver: line 112: 51934 Segmentation fault: 11  "$@" >> "$log_file" 2>&1
FAIL: qt/test/test_bitcoin-qt
============================================================================
Testsuite summary for Bitcoin Core 22.99.0
============================================================================
# TOTAL: 5
# PASS:  4
# SKIP:  0
# XFAIL: 0
# FAIL:  1
# XPASS: 0
# ERROR: 0
============================================================================
See src/test-suite.log
Please report to https://github.com/bitcoin/bitcoin/issues
============================================================================
make[4]: *** [test-suite.log] Error 1
make[3]: *** [check-TESTS] Error 2
make[2]: *** [check-am] Error 2
make[1]: *** [check-recursive] Error 1
make: *** [check-recursive] Error 1
```

The last few line in `src/test-suite.log` were:

```
profiling: /Users/givanse/code/bitcoin/src/libbitcoin_node_a-mapport.gcda: cannot merge previous GCDA file: corrupt arc tag (0x00000000)
profiling: /Users/givanse/code/bitcoin/src/libbitcoin_node_a-mapport.gcda: cannot merge previous GCDA file: corrupt arc tag (0x00000000)
profiling: /Users/givanse/code/bitcoin/src/libbitcoin_node_a-mapport.gcda: cannot merge previous GCDA file: corrupt arc tag (0x00000000)
FAIL qt/test/test_bitcoin-qt (exit status: 139) 
```

So I just deleted them.

```bash
find . -name "*.gcda" -delete
```

### missing cov_tool_wrapper.sh

```bash
Capturing coverage data from /Users/givanse/code/bitcoin/src
geninfo: ERROR: need tool /Users/givanse/code/bitcoin/cov_tool_wrapper.sh!
```

Not sure what I could have done to start seeing this error.
I'm guessing that after churning too much between `./configure` and `make` I managed to get to a state where I had extra or missing build management files ('*.info').

Got around it by figuring out I could force the task that creates that file:

```
make cov_tool_wrapper.sh
```

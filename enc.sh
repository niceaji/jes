#!/bin/sh
files=$(find . -type f -name "*.html")
for file in $files; do
iconv -c -f euckr -t utf8 $file > $file.tmp && mv -f $file.tmp $file
done
exit 0

#!/bin/sh
# 打印指定 HTML 文件中的所有 meta 标签属性

set -euo pipefail

if [ $# -ne 1 ]; then
  echo "用法: $0 /path/to/file.html" >&2
  exit 1
fi

FILE="$1"

if [ ! -f "$FILE" ]; then
  echo "文件不存在: $FILE" >&2
  exit 1
fi

perl -0777 -ne '
  use strict;
  use warnings;

  my $content = $_;
  my $index = 0;

  while ($content =~ /<meta\b([^>]*)>/gi) {
    my $attrs = $1 // q{};
    my @pairs;

    while ($attrs =~ /([a-zA-Z0-9:_-]+)\s*=\s*(?:"([^"]*)"|'\''([^'\'']*)'\''|([^\s"'\''=<>`]+))/g) {
      my $value = defined $2 ? $2 : defined $3 ? $3 : $4;
      push @pairs, "$1=$value";
    }

    if (@pairs) {
      print "meta[$index]: ", join(", ", @pairs), "\n";
    } else {
      print "meta[$index]: (无属性)\n";
    }

    $index++;
  }

  print "共找到 $index 个 meta 标签\n";
' "$FILE"


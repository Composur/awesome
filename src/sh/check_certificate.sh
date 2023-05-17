# 你的证书名称
name='你的证书名称'
# 检查证书文件是否存在
if [ ! -f "$name" ]; then
  echo "错误：找不到证书文件。退出脚本。"
  exit 1
fi
end_date=$(security find-certificate -c "${name}" -p | openssl x509 -noout -enddate | awk -F'=' '{gsub(/notAfter=/,"",$2); print $2}')
current_date=$(LANG=zh_CN.UTF-8 date +%s)
end_date_timestamp=$(LANG=en_US.UTF-8 date -j -f "%b %e %T %Y %Z" -j -u -f "%b %e %T %Y %Z" "$end_date" "+%s")
days_remaining=$(( ($end_date_timestamp - $current_date) / 86400 ))
echo "证书将在 $days_remaining 天后过期。"

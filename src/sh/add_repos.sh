#!/bin/bash
# 设置父文件夹路径
parent_dir="/Users/xxx"

# 遍历所有子文件夹
find "$parent_dir" -maxdepth 1 -mindepth 1 -type d | while read -r dir; do
  # 检查是否为Git仓库（存在.git目录）
  if [ -d "$dir/.git" ]; then
    # 使用应用支持的命令添加（示例：用open命令传递路径）
    open -a "GitHub Desktop" "$dir"
    # open "github-mac://openRepo/$dir"
    # gh repo view "$(basename "$dir")" --web

    # 若应用有专用CLI（如SourceTree的stree）：
    # stree "$dir"
     # 等待弹窗出现（根据网络和性能调整等待时间）
    sleep 2

    # 使用 cliclick 模拟点击确认按钮（需校准坐标）
    # 获取按钮坐标：将鼠标悬停在确认按钮上，终端运行 `cliclick p` 获取坐标
    cliclick c:754,481  # 替换为你的实际坐标
  fi
done
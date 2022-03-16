## submodule 的简单用法

+ 添加子模块，将 `xxx` 项目克隆到本地的 `assets` 文件夹

  ```sh
  git submodule add https://github.com/xxx/xxx.git assets
  
  # 克隆整个项目（含子模块）
  git submodule add https://github.com/xxx/xxx.git assets --recursive 
  ```

+ 查看子模块

  ```sh
  git submodule
  ```

+ 更新子模块 

  + 更新项目内子模块到最新版本

    ```sh
    git submodule update	
    ```

  + 更新子模块为远程项目的最新版本

    ```sh
    git submodule update --remote
    ```

+ 修改子模块

  + 修改 `.gitmodules` 对应子库的配置
  + 执行 `git submodule sync`
  
+ 拉取子模块

  + 全量拉取

    ```sh
    # 更新地址当前 .gitmodules 配置一致避免 ssh 和 http 混用导致拉取失败
    git submodule sync 	
    # 拉取
    git submodule update --init --recursive
    ```

    



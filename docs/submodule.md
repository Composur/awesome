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

  + 


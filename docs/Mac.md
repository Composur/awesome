# Term 

+ 配置代理，编辑 ` open ~/.bash_profile`

  ```sh
  function proxy_on(){
    export http_proxy=http: //127.0.0.1:7890
    export https_proxy=http: //127.0.0.1:7890
    curl www.google.com
    echo -e "已开启代理"
  }
  function proxy_off(){
    unset http_proxy
    unset https_proxy
    echo -e "已关闭代理"
  }
  
  function login_ten(){
    ssh root@42.193.219.183
    echo -e "已关闭代理"
  }
  ```

+ 执行 

   ```sh
   $ source  ~/.bash_profile
   $ proxy_on
   ```

+ 开启代理


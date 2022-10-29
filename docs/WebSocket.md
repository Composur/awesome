

# nginx 代理

```nginx
#PROXY-START/

location ^~ /
{
    proxy_pass http://127.0.0.1:7001;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header REMOTE-HOST $remote_addr;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    # proxy_hide_header Upgrade;

    add_header X-Cache $upstream_cache_status;

    #Set Nginx Cache
    
    
    set $static_filevMWIrk8J 0;
    if ( $uri ~* "\.(gif|png|jpg|css|js|woff|woff2)$" )
    {
    	set $static_filevMWIrk8J 1;
    	expires 12h;
        }
    if ( $static_filevMWIrk8J = 0 )
    {
    add_header Cache-Control no-cache;
    }
}
# 转发
location ^~ /ws-api
{
    proxy_pass http://127.0.0.1:7002;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
}

#PROXY-END/
```




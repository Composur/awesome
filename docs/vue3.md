# TS PropType 的类型验证

```typescript
import { PropType } from 'vue'

export interface TodoItem {
  text: string
  done: boolean
}
type listType = {
  key:string,
  val:number
}
props: {
    todo: {
      type: Object as PropType<TodoItem>,
      default: {
        text: '',
        done: false
      }
    }，
    list: {
      type: Array as PropType<listType[]>,
      required:true
    }
  },
```

# Refs

## ref 和 toRef 和 toRefs 的区别

都是为了把普通数据类型转为响应式类型。

- ref 是对原始数据的拷贝，当修改 ref 数据时，模板中的视图会发生改变，但是原始数据并不会改变。

- toRef 是对原始数据的引用，修改 toRef 数据时，原始数据也会发生改变，但是视图并不会更新。

  ```tsx
  const a = { name: "toref", age: 1 }
  const b = toRef(a, "age")
  b.value++
  ```

- toRefs 接受一个对象作为参数，遍历对象上的属性逐个调用 toRef 将普通对象转为响应式对象，可以把多个普通属性转为响应式数据。

  - 使 `setup()` 函数返回的对象进行解构后不丢失响应性。

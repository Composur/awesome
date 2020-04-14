### 1. Redux 在 React Hooks 的用法 

结合以往类组件的写法实现一个列表渲染

#### 1.1 类组件的写法

```jsx
import React  from "react";
import { connect } from "react-redux";
import {get} from '../../api'

class CityList extends React.Component {
	state = {data:[]}
	const { from, to } = this.props;
  componentDidMount(){
    get({from,to}).then(res=>this.setState({data:res}))
  }
	render(){
    return(
      <div>
      <List data = {res} />
      </div>
    )
  }
}

const mapStateToProps = ({from,to}) => ({
 from,to
});
const mapDispatchToProps = {getList};
export default connect(mapStateToProps, mapDispatchToProps)(CityList);

```



